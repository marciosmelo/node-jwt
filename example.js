'use strict';

const fs  = require('fs');
const jwt = require('jsonwebtoken');

var payload = {
    preferred_username: "JohnDoe",
    given_name: "John Donnald",
    email: "johndoe@liveperson.com",
    phone_number: "+1-10-344-3765333"
};
   
var privateKEY  = fs.readFileSync('./keys/private_key.pem', 'utf8');
var publicKEY  = fs.readFileSync('./keys/public_key.pem', 'utf8');
var i  = 'https://www.YourBrand.com';          
var s  = '4255551212';
var a  = 'Europ FSM Chat'; 


var signOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "12h",
    algorithm:  "RS256"
};

var token = jwt.sign(payload, privateKEY, signOptions);
console.log("Token - " + token);

var verifyOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "12h",
    algorithm:  ["RS256"]
};

var legit = jwt.verify(token, publicKEY, verifyOptions);
console.log("\nJWT verification result: " + JSON.stringify(legit));



