const { json } = require("body-parser");
var express = require("express");
const AuthController = require("../controllers/AuthController");
var router = express.Router();
const Auth = AuthController;

/* GET users listing. */
router.get("/", function (req, res, next) {
  next();
  // res.send({message: 'respond with a resource'});
});

router.post("/signup" , (req, res, next)=>{
  new Auth(req,res,next).signup();
});

router.post("/login", (req,res,next)=>{
  new Auth(req,res,next).login();
});

module.exports = router;
