// const bcrypt = require('bcrypt'),
// authHandler = require('../handlers/AuthHandler'),
//     generateToken = require('../auth/generateToken'),
//     { extractToken } = require('../auth/authorize'),
var models = require('../db/models');
var commonComponent = require('../db/components/common_component');
module.exports = {
    name: 'users',
    post: {
        login : function(req, res, next){
            var username = req.body.username;
            var password = req.body.password;
            password = commonComponent.hashPassword(password);
            models.user.findOne({
                where: {
                    username:username,
                    password:password
                },
                include:{
                    model: models.crm_prospect, as: 'CrmProspect' 
                }
            }).then(function(data){
                if(data != ''){
                    res.rest.success({
                        'data':data,
                        'message':'User login successfuly'
                    });
                } else {
                    res.rest.serverError({
                        'data':{},
                        'message':'Invalid username or password'
                    });
                }
            });
        },
        forgotpassword : function(req, res, next){
            var result = req.body;
            var username = result.username;
            models.user.findAll({
            where: {
                username : username
            },
            include:{
                model: models.crm_prospect, as: 'CrmProspect' 
            }
            }).then(function(data) {
        
            if(data != "") { 
                // create unique token
                var dt = data[0];
                var password = commonComponent.hashPassword('education');
                dt.updateAttributes({
                password: password
                })
                .then(function (responseData) {          
                    res.rest.success({
                        'data':{},
                        'message':'Password sent to your registerd email address'
                    });
                }); 
            } else {
                res.rest.serverError({
                    'data':{},
                    'message':'Invalid username'
                });
            }
            });
        },
        
        findUser : function(req, res, next){
            var username = req.body.username;
            models.user.findOne({
                where: {
                   username : username,
                },
                include:{
                    model: models.crm_prospect, as: 'CrmProspect' 
                }
              }).then(function(data){
                res.rest.success(data);
              })
        }
    },  
    get: {
        test : function (req, res, next){
            res.rest.success('Logged out successfully!');
        },
        
    }
}