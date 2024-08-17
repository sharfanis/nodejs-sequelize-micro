const models = require('../models');

const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

const validator = require('fastest-validator');


function signUp(req , res) {

    //Inbuilt function inside sequelize to not have multiple same email id's
    models.User.findOne({where: {email: req.body.email}}).then(result => {
       if(result) {
        res.status(409).json({
            message: "Email already exists!",
           });
       } else {
        bcryptjs.genSalt(10, function(err, salt) {
            bcryptjs.hash(req.body.password, salt, function(err, hash) {
    
                const user = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                  }
    
                  const schema = {
                    name : {type:"string", optional : false, max:"100"},
                    email: {type:"string", optional: false, max: "500"},
                    password: {type: "string", optional: false}
                  }
                
                  const valiatorObj = new validator();
                // If validation passes then it return TRUE else array of errors.
                  const userValidatedResponse = valiatorObj.validate(user, schema);  
    
                
                    if( userValidatedResponse !== true) {
                        return res.status(400).json({
                        message: "Validation failed",
                        error: userValidatedResponse
                        })
                    }
                
                  models.User.create(user).then(result => {
                       res.status(200).json({
                        message: 'User Created Successfully!!'
                       })
                  }).catch(error => {
                    res.status(500).json({
                        message: "Failed to create user! Try again!",
                        post:error
                       });
                  });
            });
        });
    }

    }).catch(error => {
        res.status(500).json({
            message: "Failed to check email id exists or not!",
            post:error
           });
    });
 
}

function login(req,res) {
  // Login Functionality
    models.User.findOne({where: {email: req.body.email}}).then(user => {
        if(user == null) {
            res.status(401).json({
                message: "Invalid Email!",
               });
        } else {
            // If we found the user
            bcryptjs.compare(req.body.password, user.password, function(err1, result) {
               if(result) {
                // if result is true password match and email id exists and then generate token
                const token = jwt.sign({
                    email: user.email,
                    userId: user.id
                }, 'secret' , function(err2, token) {
                    if(token) {
                    res.status(200).json({
                        message: "Authentication Successful!",
                        token: token
                       });
                    }else {
                        res.status(500).json({
                            message: "Token generation failed!",
                            post: err2
                        });
                    }
                });
               } else {
                res.status(400).json({
                    message: "Password Mismatch!",
                });

               }
            });
        }
}).catch(error => {
    res.status(500).json({
        message: "Internal Server Error",
        post: error
       });
});
}

module.exports={
    signUp:signUp,
    login:login
}
