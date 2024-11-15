const { body } = require("express-validator");

// Middleware для валидации данных
const validateBodyUser = [
  body("login")
    .isLength({ min: 4 })
    .withMessage("Login пользователя должен содержать больше 3 символов."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Пароль должен содержать больше 5 символов"),
];

module.exports = { validateBodyUser };
