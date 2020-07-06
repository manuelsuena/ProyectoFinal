require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const jwt = require("jsonwebtoken")

const app = express();
const port = process.env.PORT;

// Serve static
app.use(express.static(path.join(__dirname, 'static')));

//controllers de User
const { validateUser } = require('./controllers/controllersuser/validateUser');
const { getUser } = require('./controllers/controllersuser/userId');
const { newUser } = require('./controllers/controllersuser/newUser');
const { loginUser } = require('./controllers/controllersuser/loginUser');
const { editUser } = require('./controllers/controllersuser/editUser');
const { editPassword } = require('./controllers/controllersuser/editpassword');
const { deleteUser} = require('./controllers/controllersuser/deleteUser');


//controllers de Ideas
const { deleteIdea } = require('./controllers/controllersidea/deleteidea');
const { editIdea } = require('./controllers/controllersidea/editidea');
const { getIdea} = require('./controllers/controllersidea/getidea');
const { listIdea } = require('./controllers/controllersidea/listidea');
const { comentarIdea, getIdeaMensajes, DeleteIdeaMensaje, userMensaje} = require('./controllers/controllersidea/mensajeidea');
const { newIdea} = require('./controllers/controllersidea/newidea');
const { visitNew} = require('./controllers/controllersidea/newvisit');
const { voteIdea, getIdeaVotes } = require('./controllers/controllersidea/votoidea');
const {getMyIdea, userIdea} = require('./controllers/controllersidea/myidea');

// Auth middlewares
const { userIsAuthenticated, userIsAdmin } = require('./middleware/auth');


//  middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());



//Routes user
app.get('/user/validate',validateUser);
app.post('/user', newUser);
app.get('/user/:id', userIsAuthenticated, getUser);
app.get('/useridea/:id',userIsAuthenticated, userIdea);
app.post('/user/login', loginUser);
app.put('/user/:id', userIsAuthenticated, editUser);
app.put('/user/password/:id', userIsAuthenticated, editPassword);
app.delete('/user/:id',userIsAuthenticated, userIsAdmin, deleteUser);


//Routes ideas
app.get('/ideas', listIdea);
app.post('/ideas', userIsAuthenticated, newIdea);
app.delete('/ideas/del/:id', userIsAuthenticated, userIsAdmin, deleteIdea);
app.put('/ideas/:id', userIsAuthenticated, editIdea);
app.get('/ideas/:id',userIsAuthenticated, getIdea);
app.get('/informacion/:id', getMyIdea, userIsAuthenticated);
app.post('/ideas/visit/:id',userIsAuthenticated, visitNew)

////Routes votos
app.post('/ideas/vote/:id', userIsAuthenticated, voteIdea);
app.get('/user/:id/vote', userIsAuthenticated, getIdeaVotes);

////Routes message

app.post('/user/message/:id', userIsAuthenticated, comentarIdea);
app.get('/user/messages/:id',userIsAuthenticated, getIdeaMensajes);
app.get('/user/message/:id', userIsAuthenticated, userMensaje)
app.delete('/user/message/:id', userIsAuthenticated, userIsAdmin, DeleteIdeaMensaje);

//Error middleware
app.use((error, req, res, next) =>{
    console.log(error);
    res.status(error.httpCode || 500).send(error.message);
});

app.use((req, res) => {
    res.status(404).send('not found');
});

//Servidor
app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`);
});