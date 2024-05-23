const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            res.redirect('/auth/login');
        }
    } else {
        res.redirect('/auth/login');
    }
};

const ensureAdmin = (req, res, next) => {
    ensureAuthenticated(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            res.redirect('/');
        }
    });
};

const ensureManager = (req, res, next) => {
    ensureAuthenticated(req, res, () => {
        if (req.user.role === 'manager') {
            next();
        } else {
            res.redirect('/');
        }
    });
};

module.exports = { ensureAuthenticated, ensureAdmin, ensureManager };
