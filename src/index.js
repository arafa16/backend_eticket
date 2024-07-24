const express = require('express');
require('express-async-errors');
const dotenv = require('dotenv');
const auth_router = require('./routes/auth.route.js');
const ticket_router = require('./routes/ticket.route.js');
const user_router = require('./routes/user.route.js');
const privilege_router = require('./routes/privilege.route.js');
const devisi_router = require('./routes/devisi.route.js');
const status_user = require('./routes/status_user.route.js');
const status_ticket = require('./routes/status_ticket.route.js');
const penempatan = require('./routes/penempatan.route.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');
const not_found = require('./middleware/not_found.js');

const app = express();
dotenv.config();

app.use(express.json());
//route
app.use('/auth',auth_router);
app.use('/user',user_router);
app.use('/privilege',privilege_router);
app.use('/devisi',devisi_router);
app.use('/ticket',ticket_router);
app.use('/status_user',status_user);
app.use('/status_ticket',status_ticket);
app.use('/penempatan',penempatan);
app.use(errorHandlerMiddleware);
app.use(not_found);

app.listen(process.env.BACKEND_PORT, ()=>{
    console.log(`server running at port ${process.env.BACKEND_PORT}`);
})