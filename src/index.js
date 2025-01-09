const express = require('express');
const express_fileupload = require('express-fileupload');
require('express-async-errors');
const dotenv = require('dotenv');
const auth_router = require('./routes/auth.route.js');
const ticket_router = require('./routes/ticket.route.js');
const user_router = require('./routes/user.route.js');
const privilege_router = require('./routes/privilege.route.js');
const devisi_router = require('./routes/devisi.route.js');
const status_user = require('./routes/status_user.route.js');
const status_note = require('./routes/status_note.route.js');
const status_ticket = require('./routes/status_ticket.route.js');
const type_ticket = require('./routes/type_ticket.route.js');
const note_ticket = require('./routes/note_ticket.route.js');
const penempatan = require('./routes/penempatan.route.js');
const attachment_ticket = require('./routes/attachment_ticket.route.js');
const attachment_note_ticket = require('./routes/attachment_note_ticket.route.js');
const slider = require('./routes/slider.route.js');
const project_type = require('./routes/project_type.route.js');
const project_status = require('./routes/project_status.route.js');
const project_note_status = require('./routes/project_note_status.route.js');
const project_attachment = require('./routes/project_attachment.route.js');
const project_note_attachment = require('./routes/project_note_attachment.route.js');
const project_note = require('./routes/project_note.route.js');
const project = require('./routes/project.route.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');
const not_found = require('./middleware/not_found.js');
const cors = require('cors');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize');
const db = require('./models/index.js');

const app = express();
dotenv.config();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db:db.sequelize
});

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store:store,
    cookie: {
        secure: 'auto',
        expires: 1000 * 60 * 60
    }
}))

app.use(cors({
    credentials: true,
    origin: [process.env.LINK_FRONTEND]
}));

app.use(express.json());
app.use(express_fileupload());
app.use(express.static("public"));
//route
app.use('/auth',auth_router);
app.use('/user',user_router);
app.use('/privilege',privilege_router);
app.use('/devisi',devisi_router);
app.use('/ticket',ticket_router);
app.use('/status_user',status_user);
app.use('/status_ticket',status_ticket);
app.use('/status_note',status_note);
app.use('/type_ticket',type_ticket);
app.use('/penempatan',penempatan);
app.use('/note_ticket',note_ticket);
app.use('/attachment_ticket',attachment_ticket);
app.use('/project_attachment',project_attachment);
app.use('/attachment_note_ticket',attachment_note_ticket);
app.use('/slider',slider);
app.use('/project_type',project_type);
app.use('/project_status',project_status);
app.use('/project_note_status',project_note_status);
app.use('/project_attachment',project_attachment);
app.use('/project_note_attachment',project_note_attachment);
app.use('/project_note',project_note);
app.use('/project',project);
app.use(errorHandlerMiddleware);
app.use(not_found);

app.listen(process.env.BACKEND_PORT, ()=>{
    console.log(`server running at port ${process.env.BACKEND_PORT}`);
})