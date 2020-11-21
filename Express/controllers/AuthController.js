const mongoose = require('mongoose');
const UsersDB = mongoose.model("UsersDB");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const AuthController = class{
  
  constructor(req, res, next){
    this.req = req;
    this.res = res;
    this.next = next;
    console.log(`Auth started`);
  }
  
  signup(){
  const {name , email, password} = this.req.body;
  try{
       //Add User to DB
        bcrypt.hash(password, 10, (err, hash) => {
          UsersDB.create({
            Name:name,
            Email:email,
            Password: hash
          }, (err)=>{
            if(err) throw err;
            else this.res.send(`User registered successfully`);
          });
        });
  }catch(err){
      this.res.send(`An error happend: ${err}`);
    }
  };

  login(){
    const{email, password} = this.req.body;
    try{
      function find(callback){
      bcrypt.hash(password, 10, function(err, hash) { // Salt + Hash
      //Find User with the current Name
      if(!email || !password){return this.res.status(401).send(); }
      UsersDB.findOne({Email: email}, function(err, user) {
        if(err) throw err;
        if(!user) { console.log('User not found');return callback('User not found!');}
        else{ 
        bcrypt.compare(user.Password, hash, function(err, result) {  // Compare
          if(err) throw err;
          if (result) {
           return callback(`It matches`); 
          }
          else {
            return callback('Password incorrect');
          }
        });
      }
      });
    });
    }

    find((response) =>{ 
      this.res.send(response);
      /*const token = jwt.sign(
        { userId: response._id,
          userName: response.Name },
        'RANDOM_TOKEN_SECRET',
        { expiresIn: '24h' });
      this.res.status(200).json({
        userId: response._id,
        userName: response.Name,
        token: token
      });*/
    });
  }
  catch(err){
      this.res.send(`An error happend: ${err}`);
    }
  
  }
  
  getTodos(){
    UsersDB.find({} ,(err , data) =>{
      if(err) res.send(err);
      else
      this.res.send(data);
    });
  }
}
module.exports = AuthController;