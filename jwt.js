const fs 		= require('fs');
const jwt 		= require('jsonwebtoken');

var privateKEY  = fs.readFileSync('./keys/private_key.pem', 'utf8');
var publicKEY  = fs.readFileSync('./keys/public_key.pem', 'utf8');

module.exports = {
	sign: (payload, $Options) => {
    
        var signOptions = {
			issuer: 	$Options.issuer,
			subject: 	$Options.subject,
			audience: 	$Options.audience,
			expiresIn: 	"30d",				// 30 days validity
			algorithm: 	"RS256" 			// RSASSA options[ "RS256", "RS384", "RS512" ]
		};
		return jwt.sign(payload, privateKEY, signOptions);
	},

	verify: (token, $Option) => {
		var verifyOptions = {
			issuer: 	$Option.issuer,
			subject: 	$Option.subject,
			audience: 	$Option.audience,
			expiresIn: 	"30d",
			algorithm: 	["RS256"]
		};
		try {
			return jwt.verify(token, publicKEY, verifyOptions);
		}catch(err){
			return false;
		}
	}, 

	decode: (token) => {
		return jwt.decode(token, {complete: true});
	}
}