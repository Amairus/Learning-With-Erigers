const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Todo_List' , { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true},
 (err) =>{
 if (err) console.log(`Error in DB connection :${err}`);
});

 require('./models');

 module.exports = mongoose;