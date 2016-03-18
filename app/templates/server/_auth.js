var utils = require('./../utils/utils');

var authenticate = function (req, res) {
    var userName = req.body.userName
    var password = req.body.password
    if (userName === 'admin' && password === 'admin') {
        var token = utils.CreateJWT(req.user);
        res.send({ token: token });
    } else {
         res.status(500).end('Invalid credentials.');
    }
}
module.exports = function (app) {
    app.post('/api/auth/authenticate', authenticate);
}