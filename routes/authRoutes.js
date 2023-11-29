const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/',(req, res, next) => {
    try {
        const addedUser = AuthService.login(req.body)
        next({
            status: 200,
            json: addedUser
        })
    } catch (err) {
        next({
            status: 400,
            json: { error: true, message: 'Error with creating user.' }
        })
    }
}, responseMiddleware)

module.exports = router;