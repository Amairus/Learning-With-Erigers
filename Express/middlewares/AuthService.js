const mongoose = require('mongoose');
const UsersDB = mongoose.model("UsersDB");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { token } = require('morgan');

class AuthService{

    constructor(){}

    generateJWT(user) {

        return jwt.sign({
          data: {
            _id: user._id,
            name: user.name,
            email: user.email
          }
        }, 'MySuP3R_z3kr3t.', { expiresIn: '6h' }); // @TODO move this to an env var
      }

     login(email, password){
         let pass = null;
        
        console.log(userRecord.Password);
        if(!userRecord) throw new Error('User not found');
        else{
          const correctPassword =  argon2.verify(userRecord.Password, password);
          if(!correctPassword) throw new Error('Incorrect password');
        }
        return {
            user: {
              email: userRecord.email,
              name: userRecord.name,
            },
            token: this.generateJWT(userRecord),
          }
        }
    
    
}
module.exports = AuthService;