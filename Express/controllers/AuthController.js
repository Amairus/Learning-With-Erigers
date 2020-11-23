const mongoose = require('mongoose');
const UsersDB = mongoose.model("UsersDB");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const argon2 = require('argon2');
const AuthController = class{
  
  constructor(req, res, next){
    this.req = req;
    this.res = res;
    this.next = next;
  }
  
  async signup(){
  const {name , email, password} = this.req.body;
  try{
       //Add User to DB
       UsersDB.findOne({Email:email},(err,data) =>{
        if(err)throw new Error(`An error happened finding the email configuration.`);
        if(data) this.res.status(409).json({message:`This email is already taken!`});
       });

        const hash = await argon2.hash(password);
          UsersDB.create({
            Name:name,
            Email:email,
            Password: hash
          }, (err)=>{
            if(err) throw err;
            else this.res.status(201).json({message: `User registered successfully`});
          });
        
  }catch(err){
      this.res.send(`An error happend: ${err}`);
    }
  };

  async login(){
    const{email, password} = this.req.body;
    try{
      async function find(callback){  
      //Find User with the current Name
      if(!email || !password){return this.res.status(401).send(); }
       UsersDB.findOne({Email: email}, (err, user)=>{
        if(err) throw new Error(err);
        if(!user) return callback('User not found!');
        else callback(user);
      });
    }

    find(async (response) =>{ 
      if(response === 'User not found!') this.res.status(404).json({message:response});
      else{
        const correctPass = await argon2.verify(response.Password,password);
        if(!correctPass) this.res.send(`Password incorrect!`);
          else {
            const token = jwt.sign(
          { userId: response._id,
          userName: response.Name },
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h' });
          this.res.status(200).json({
          userId: response._id,
          userName: response.Name,
          token: token
          });
       }
      }
    });
  }
  catch(err){
      this.res.send(`An error happend: ${err}`);
    }
  }
}
module.exports = AuthController;