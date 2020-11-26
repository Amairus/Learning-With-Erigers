let todos = require("../public/todos.json");
const { validationResult } = require("express-validator");
const { response } = require("express");
const mongoose = require('mongoose');
const TodosDB = mongoose.model("TodosDB");

module.exports = function (req, res) {
  this.getTodos = (req, res) => {
  TodosDB.find({} , (err , data) =>{
    res.send(data);
  });
  };

  
  this.createTodo = async (req, res, next) => {
    try {
      // validate if the parameters don't exist throw a meaningful error , else perform the request
      const {id, title, completed } = req.body;
      TodosDB.create({
        UserId:2,
        id,
        title,
        completed 
      });
      res.send(`Todo added succesfully`);
    } catch (err) {
      res.send(`An error happened: ${err}`);
    }
  };

  this.updateTodo = async (req, res, next) => {
    try {
      const id = req.params.id;
      const { title, completed } = req.body;
      TodosDB.updateOne({id} , {$set: {title, completed}}, (err, data) =>{
        if(err) throw new Error(`Error updating the data.`);
        else { res.send({message:`Todo updated succesfully`})}
      });
    } catch (err) {
      res.send(`${err}`);
    }
  };

  this.deleteTodo = (req, res) => {
    try{
      const { id } = req.params;
      TodosDB.deleteOne({id}, (err , status)=>{
      if(err) throw new Error(`Error deleting todo`);
      res.send(`Todo deleted succesfully`);
      });
    }catch(err) { res.send(err);}
  };
};
