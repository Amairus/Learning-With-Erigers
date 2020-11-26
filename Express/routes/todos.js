const TodoController = require("../controllers/TodoController");
var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  new TodoController().getTodos(req, res);
});

router.post("/create", (req, res) => {
  new TodoController().createTodo(req, res);
});

router.put("/:id", (req, res) => {
  new TodoController().updateTodo(req, res);
});

router.delete("/:id", (req, res) => {
  new TodoController().deleteTodo(req, res);
});
module.exports = router;
