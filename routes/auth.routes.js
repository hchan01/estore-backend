module.exports = app => {
    const AuthController = require('../controllers/auth.controller.js');

    app.post('/auth/login', (req, res) => {
        console.log(req.body);
        res.send('log in');
    });
}