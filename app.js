const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/users');
const imageRoute = require('./routes/images');



// use act as a middleware
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use("/posts", postsRoute);
app.use("/user",userRoute);
app.use("/image", imageRoute);


//app.get('/', (req, res) => {
//    res.send("Hello World Shabih!!");
//});
//
//app.get('/blog', (req, res) => {
//    res.send("Hello blog!!");
//});

module.exports = app;

// Sequelize command to create a migration and the models
//sequelize model:generate --name Post --attributes title:string,content:text,imageUrl:string,categoryId:integer,userId:integer