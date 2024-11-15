const express = require("express");

const UsersControllers = require("../controllers/usersControllers");
const validationMiddleware = require("../middleware/validationUser");
const videosRoutes = require("./videosRoutes");

const router = express.Router();

router.use("/videos", videosRoutes);

/**
 * @swagger
 * /api/register:
 *    post:
 *      summary: Регистрация
 *      description: Зарегестрировать нового пользователя
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/Users"
 *      responses:
 *        200:
 *          description: Пользователь успешно зарегестрирован
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 3f1f954a-b756-4c6e-84fe-7d428a6ccaff
 *         login:
 *           type: string
 *           example: Login
 *         password:
 *           type: string
 *           example: 111111
 *   requestBodies:
 *     Users:
 *       description: Свойства пользователя, который был зарегестрирован
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 example: example
 *                 description: Логин пользователя
 *               password:
 *                 type: string
 *                 example: 111111
 *                 description: Пароль пользователя
 */
router.post(
  "/register",
  validationMiddleware.validateBodyUser,
  UsersControllers.userRegister
);

/**
 * @swagger
 * /api/login:
 *    post:
 *      summary: Аутентификация
 *      description: Идентификация пользователя в приложении
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/Users"
 *      responses:
 *        200:
 *          description: Пользователь успешно аутентифицирован
 * components:
 *   requestBodies:
 *     Users:
 *       description: Свойства пользователя для аутентификации
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 example: example
 *                 description: Логин пользователя
 *               password:
 *                 type: string
 *                 example: 111111
 *                 description: Пароль пользователя
 */
router.post(
  "/login",
  validationMiddleware.validateBodyUser,
  UsersControllers.loginUser
);

module.exports = router;
