const { body, param } = require("express-validator");

// Middleware для валидации данных
const validateBody = [
  body("search")
    .isLength({ min: 3 })
    .withMessage("Запрос должен содержать больше двух символов."),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Название запроса должно быть длиннее двух сиволов"),
  body("sortBy")
    .isString()
    .optional()
    .withMessage("Элемент сортировки должен быть символьным"),
  body("count")
    .isInt()
    .optional()
    .withMessage("Максимальное количество должно быть числовым"),
];

const validateParamId = [
  param("id").isLength({ min: 1 }).withMessage("Id задания слишком короткий."),
];

const validateBodyUpdate = [
  body("search")
    .isLength({ min: 3 })
    .optional()
    .withMessage("Запрос должен содержать больше двух символов."),
  body("name")
    .isLength({ min: 3 })
    .optional()
    .withMessage("Название запроса должно быть длиннее двух сиволов"),
  body("sortBy")
    .isString()
    .optional()
    .withMessage("Элемент сортировки должен быть символьным"),
  body("count")
    .isInt()
    .optional()
    .withMessage("Максимальное количество должно быть числовым"),
];

module.exports = {
  validateBody,
  validateParamId,
  validateBodyUpdate,
};
