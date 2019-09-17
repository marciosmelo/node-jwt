var http = require('http');
const express = require('express')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');

var jwt = require('./jwt');

var iss  = 'https://www.YourBrand.com';          
var sub  = '4255551212';
var aud  = 'Europ FSM Chat'; 

const payload = {
    preferred_username: "JohnDoe",
    given_name: "John Donnald",
    email: "johndoe@liveperson.com",
    phone_number: "+1-10-344-3765333"
};

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var server = http.createServer(app);
server.listen(3000);

app.post('/login', (req, res, next) => {
    sOptions = {
        issuer: iss,
        subject: sub, 
        audience: aud 
    }
        
    var token = jwt.sign(payload,sOptions);
    res.status(200).send({ auth: true, token: token });
   
});

app.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

app.get('/verify', verifyJWT, function(req, res, next) {
    res.status(200).send({auth: true, result: res});
});


function verifyJWT(req, res, next){
  var token = req.headers['x-access-token'];
  console.log(token);
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    sOptions = {
        issuer: iss,
        subject: sub, 
        audience: aud 
    }
  
    var verify = jwt.verify(token, sOptions);  
    if (!verify) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    return res.status(200).send(verify);
    //req.userId = decoded.id;
    next();
  
}
