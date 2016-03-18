var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {
    CreateJWT: function (user) {
        var payload = {
            sub: user,
            iat: moment().unix(),
            exp: moment().add(1, 'days').unix()
        };
        return jwt.encode(payload, 'Status Report Token Secret');
    },
    EnsureAuthenticated: function (req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
        }
        var token = req.headers.authorization.split(' ')[1];
        var payload = null;
        try {
            payload = jwt.decode(token, 'Status Report Token Secret');
        }
        catch (err) {
            return res.status(401).send({ message: err.message });
        }
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'Token has expired' });
        }
        req.user = payload.sub;
        next();
    }
};
