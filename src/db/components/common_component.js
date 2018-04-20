var express = require('express');
var hash = require("mhash");
module.exports = {
    response: function(data, msg, error) {
        return {"data":data, "message":msg,"error":error};
    },
    hashPassword : function(password){
        var salt = "DYhG93b0qyJfIxfs2guVoUubWwvniR2G0FgaC9miAbcd";
        var pass = salt+password;
        var sh256Val = hash("sha1", pass);
       // var binX = bintoHax(sh256Val);
        return sh256Val;
    }
};