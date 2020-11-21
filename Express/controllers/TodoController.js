let todos = require("../public/todos.json");
const { validationResult } = require("express-validator");
const { response } = require("express");
const mongoose = require('mongoose');
const TodosDB = mongoose.model("TodosDB");

module.exports = function (req, res) {
  this.getTodos = (req, res) => {
  TodosDB.find({} , (err , data) =>{
    res.send(data);
  })
  };

  this.createTodo = async (req, res, next) => {
    try {
      // validate if the parameters don't exist throw a meaningful error , else perform the request

      const { name, title } = req.body;
      todos.push({ name, title });
      res.send(todos);
    } catch (err) {
      res.send(`An error happened: ${err}`);
    }
  };

  this.updateTodo = async (req, res, next) => {
    try {
      const id = req.params.id;
      const { name, title } = req.body;
      const el = { id, name, title };
      todos[el.id - 1] = el;
      res.send(todos);
    } catch (err) {
      res.send(`${err}`);
    }
  };

  let deleted = 0;
  this.deleteTodo = (request, response) => {
    const { id } = request.params;
    try {
      if (id > todos.length || id < 0) {
        throw new Error("Id was not valid");
      } else {
        todos = todos.filter((item) => {
          return item.id !== id;
        });
        deleted++;
        delete todos[id - deleted];
        todos = todos.filter(function (el) {
          return el != null;
        });
        response.send(todos);
      }
    } catch (err) {
      response.send(`Upss something went wrong deleting your element: ${err}`);
    }
  };
};
