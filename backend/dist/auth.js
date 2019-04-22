"use strict";
exports.__esModule = true;
var users_1 = require("./users");
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config");
exports.handleAuthentication = function (req, resp) {
    //vamos receber um objeto no body com email e senha
    var user = req.body;
    if (isValid(user)) { //se usuario e senha forem validos faz login
        var dbUser = users_1.users[user.email];
        var token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, api_config_1.apiConfig.secret);
        resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token }); //dados do usuário
    }
    else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
    function isValid(user) {
        if (!user) {
            return false;
        }
        var dbUser = users_1.users[user.email];
        return dbUser !== undefined && dbUser.matches(user);
    }
};
