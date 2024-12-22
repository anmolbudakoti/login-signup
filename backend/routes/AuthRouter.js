const router = require('express').Router();
const { registerValidation, loginValidation } = require('../middlewares/Validation');
const { register, login } = require('../controllers/AuthController');


router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);


module.exports = router;