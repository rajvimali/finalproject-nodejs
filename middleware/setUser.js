const jwt = require('jsonwebtoken');

const setUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            res.locals.user = req.user; // Add user to res.locals
        } catch (err) {
            console.error(err);
            res.clearCookie('token');
        }
    } else {
        res.locals.user = null;
    }
    next();
};

module.exports = setUser;
