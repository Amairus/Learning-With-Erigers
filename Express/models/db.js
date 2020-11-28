const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin123localhost:27017/Todo_List' ,
 { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true, useMongoClient: true},
 (err) =>{
 if (err) console.log(`Error in DB connection :${err}`);
});

 require('./models');

 module.exports = mongoose;