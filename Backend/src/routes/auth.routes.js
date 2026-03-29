const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require("../controllers/auth.controller").authMiddleware; // only one

const authRouter = Router();


/**
 * @route POST /api/auth/register
 * @description Register new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description login user with email
 * @access public
 */
authRouter.post("/login", authController.loginUserController);

/**
 * @route GET /api/auth/logout
 * @description Clear token from user cookie and add token to blacklist
 * @access public
 */
authRouter.get("/logout", authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description Get the current logged in user details
 * @access private
 */
authRouter.get("/get-me", authMiddleware, authController.getMeController);

module.exports = authRouter;