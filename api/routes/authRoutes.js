const express = require('express');
const { signup,login,refreshToken } = require('../controller/userController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication operations
 */

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - fullname
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Login successfully
 *       400:
 *         description: Invalid username or password
 */
router.post('/login', login);

/** 
*  @swagger
* /api/refresh:
*   post:
*     summary: Refresh the access token
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               token:
*                 type: string
*             required:
*               - token
*     responses:
*       200:
*         description: Access token refreshed successfully
*       401:
*         description: Token missing or invalid
*/
router.post('/refresh', refreshToken);



// app.post('/api/logout',verify,(req,res)=>{
//     const refreshToken=req.body.token;
//     refreshTokens=refreshTokens.filter((token)=>token !==refreshToken)
//     res.status(200).json("you are logout sussfully!");
// })

module.exports = router;
