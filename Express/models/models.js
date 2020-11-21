const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);
const bcrypt = require('bcrypt');

  const todoSchema = new mongoose.Schema({
   UserId : Number,
   id: Number,
   title: String,
   completed: Boolean
  });   

  const UsersSchema = new mongoose.Schema({
    Name : String,
    Email: String,
    Password: String
  });
  // hash the password
  UsersSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  // checking if password is valid
  UsersSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
  };

  mongoose.model("UsersDB" , UsersSchema, "Users");
  mongoose.model("TodosDB" , todoSchema, "Todos");

  module.exports = mongoose;