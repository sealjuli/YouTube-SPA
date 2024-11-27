const express = require("express");

const VideosControllers = require("../controllers/videosControllers");
const authenticateToken = require("../middleware/authentificateToken");
const validationMiddleware = require("../middleware/validationYouTubeSpa");

const router = express.Router();

/**
 * @swagger
 * /api/youtube:
 *   get:
 *     summary: Получить список видео по поисковой строке
 *     description: Получение списка видео из YouTube API
 *     tags:
 *       - YouTube
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *           example: cats
 *         description: Строка для поиска видео
 *       - in: query
 *         name: count
 *         required: false
 *         schema:
 *           type: integer
 *           example: 12
 *         description: Количество выводимых объектов видео
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *           example: description
 *         description: Поле для сортировки выводимых данных (publishedAt / title / description)
 *     responses:
 *       200:
 *         description: Массив видео
 */
router.get(
  "/",
  authenticateToken,
  validationMiddleware.validateQuerySearch,
  VideosControllers.getVideos
);

/**
 * @swagger
 * /api/youtube/{id}:
 *   get:
 *     summary: Получить список видео по id сохраненного запроса
 *     description: Получение списка видео из YouTube API по id сохраненного запроса
 *     tags:
 *       - YouTube
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Идентификатор сохраненного запроса для поиска видео
 *     responses:
 *       200:
 *         description: Массив видео
 */
router.get(
  "/:id",
  authenticateToken,
  VideosControllers.getVideosBySearch
);

module.exports = router;
