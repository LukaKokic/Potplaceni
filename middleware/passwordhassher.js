const md5 = require('md5');

//user's password is their PIN, which is hashed here using MD5
function passwordHasher(pass){
    return md5(pass).substring(0,8);
}

module.exports = passwordHasher;