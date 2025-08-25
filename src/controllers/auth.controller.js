const {
  user: userModel,
  status_user: statusUserModel,
  privilege: privilegeModel,
} = require("../models");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const register = async (req, res) => {
  const { name, email, password, nomor_hp, devisi_id, penempatan_id } =
    req.body;

  if (
    !name ||
    !email ||
    !password ||
    !nomor_hp ||
    !devisi_id ||
    !penempatan_id
  ) {
    return res.status(404).json({
      message: "value cannot be null",
    });
  }

  const findName = await userModel.findOne({
    where: {
      name,
    },
  });

  if (findName !== null) {
    return res.status(403).json({
      message: "user registered",
    });
  }

  const hasPassword = await argon.hash(password);

  const privilege = await privilegeModel.create({
    dashboard: true,
    ticket_requestor: true,
    ticket_executor: false,
    entity: false,
    admin: false,
  });

  const response = await userModel.create({
    name,
    email,
    password: hasPassword,
    nomor_hp,
    devisi_id,
    penempatan_id,
    status_user_id: 2,
    privilege_id: privilege.id,
    is_delete: 0,
  });

  const user = await userModel.findOne({
    where: {
      uuid: response.uuid,
    },
    attributes: {
      exclude: ["id", "password"],
    },
  });

  return res.status(201).json({
    message: "success",
    data: user,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      message: "email or password can't be null",
    });
  }

  const findUser = await userModel.findOne({
    where: {
      email,
    },
    include: [
      {
        model: statusUserModel,
        attributes: ["name"],
      },
    ],
  });

  if (!findUser) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  if (findUser.status_user.name !== "active" || findUser.is_delete) {
    return res.status(401).json({
      message: `you don't have access, status account is ${findUser.status_user.name}, not active`,
    });
  }

  const match = await argon.verify(findUser.password, password);

  if (!match) {
    return res.status(403).json({
      message: "wrong password",
    });
  }

  const token = jwt.sign(
    {
      uuid: findUser.uuid,
      name: findUser.name,
      email: findUser.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  req.session.token = token;
  // req.headers.token = token;

  console.log(req.headers, "session");

  return res.status(200).json({
    success: true,
    message: "login success",
    data: {
      token,
    },
  });
};

const getMe = async (req, res) => {
  const user = req.user;

  const result = await userModel.findOne({
    where: {
      uuid: user.uuid,
    },
    attributes: {
      exclude: ["id", "password"],
    },
    include: [
      {
        model: privilegeModel,
      },
    ],
  });

  return res.status(200).json({
    message: "success",
    data: result,
  });
};

const sendEmailReset = async (req, res) => {
  const { email } = req.body;

  const result = await userModel.findOne({
    where: {
      email,
    },
    include: [
      {
        model: statusUserModel,
        attributes: ["name"],
      },
    ],
  });

  if (!result) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  if (result.is_delete) {
    return res.status(401).json({
      message: `you don't have access, account is deleted`,
    });
  }

  const token = jwt.sign({ uuid: result.uuid }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

  const link = `${process.env.LINK_FRONTEND}/reset/${token}`;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const emailMessage = {
    from: '"E-ticket" <no-replay@kopkarla.co.id>',
    to: email,
    subject: "Reset Password",
    text: `click this link for reset your password ${link}`,
  };

  await transporter.sendMail(emailMessage);

  return res.status(200).json({
    message: "success, check your email for reset password",
  });
};

const getTokenReset = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(404).json({
      message: "token not found",
    });
  }

  //validation token
  const verify = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findOne({
    where: {
      uuid: verify.uuid,
    },
    attributes: {
      exclude: ["id", "password"],
    },
  });

  return res.status(200).json({
    message: "success",
    data: user,
  });
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confPassword } = req.body;

  console.log(token, "token");

  if (!token || token === null) {
    return res.status(404).json({
      message: "token not found",
    });
  }

  if (password !== confPassword) {
    return res.status(401).json({
      message: "password not match, please check again",
    });
  }

  const verify = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findOne({
    where: {
      uuid: verify.uuid,
    },
  });

  const hasPassword = await argon.hash(password);

  await user.update({
    password: hasPassword,
  });

  return res.status(201).json({
    message: "reset password successed",
  });
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: err.message });

    return res.status(200).json({
      message: "logout success",
    });
  });
};

module.exports = {
  register,
  login,
  getMe,
  sendEmailReset,
  getTokenReset,
  resetPassword,
  logout,
};
