const { query } = require("express-validator");

const validateQuerySearch = [
  query("search")
    .isString()
    .optional()
    .withMessage("Строка поиска должна быть символьной."),
  query("count")
    .isInt()
    .optional()
    .withMessage("Количество выводимых видео должно быть числовым."),
  query("description")
    .isString()
    .optional()
    .isIn("publishedAt", "title", "description")
    .withMessage(
      "Строка сортировки должна содержать одно из следующих значений: 'publishedAt', 'title', 'description'."
    ),
];

module.exports = {
  validateQuerySearch,
};
