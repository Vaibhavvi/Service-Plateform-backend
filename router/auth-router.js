const express = require("express");
const router = express.Router();
const authcontrollers = require('../controllers/auth-controller');
const signUpSchema = require("../validators/auth-validators");
const validate = require("../middleware/validate-middleware");
const authMiddleware = require("../middleware/auth-middleware");

router.route("/").get(authcontrollers.home);

router.route("/register").post(validate(signUpSchema),authcontrollers.register);

router.route("/login").post(authcontrollers.login);

router.route('/user').get(authMiddleware, authcontrollers.getuser);

module.exports = router;