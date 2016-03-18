var utils = require('./../Utils/utils');

var authenticate = function (req, res) {
    var userName = req.user.userName
    var password = req.user.password
    if (userName == 'admin' && password == 'admin') {
        var token = utils.CreateJWT(req.user);
        res.send({ token: token });
    } else {
         res.status(500).end('Invalid credentials.');
    }
}
module.exports = function (app) {
    app.post('/auth/authenticate', authenticate);
}