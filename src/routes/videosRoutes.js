const express = require("express");
const router = express.Router();

const VideosControllers = require("../controllers/videosControllers");
const authenticateToken = require("../middleware/authentificateToken");
const validationMiddleware = require("../middleware/validationSearchBar");

/**
 * @swagger
 * /api/videos/{search}:
 *   get:
 *     summary: Получить список видео по поисковой строке
 *     description: Получение списка видео из YouTube API
 *     tags:
 *       - Videos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *           example: cats
 *         description: Строка для поиска видео
 *     responses:
 *       200:
 *         description: Массив видео
 */
router.get("/:search", authenticateToken, VideosControllers.getVideos);

/**
 * @swagger
 * /api/videos:
 *   get:
 *     summary: Просмотр списка сохранненых запросов
 *     description: Просмотр списка сохранненых запросов из базы данных
 *     tags:
 *       - Videos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Массив запросов
 * components:
 *   schemas:
 *     SearchBar:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 3f1f954a-b756-4c6e-84fe-7d428a6ccaff
 *           description: Идентификатор запроса
 *         search:
 *           type: string
 *           example: cats
 *           description: Строка запроса
 *         name:
 *           type: string
 *           example: Котики
 *           description: Название запроса
 *         sortBy:
 *           type: string
 *           example: description
 *           description: Сортировать по
 *         count:
 *           type: integer
 *           example: 50
 *           description: Максимальное количество
 */
router.get("/", authenticateToken, VideosControllers.getSearchBar);

/**
 * @swagger
 * /api/videos:
 *    post:
 *      summary: Сохранить запрос
 *      description: Сохранить запрос
 *      tags:
 *        - Videos
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        $ref: "#/components/requestBodies/Videos"
 *      responses:
 *        200:
 *          description: Запрос успешно сохранен
 * components:
 *   requestBodies:
 *     Videos:
 *       description: Свойства запроса для сохранения
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               search:
 *                 type: string
 *                 example: cats
 *                 description: Строка поиска
 *               name:
 *                 type: string
 *                 example: Котики
 *                 description: Название запроса
 *               sortBy:
 *                 type: string
 *                 example: description
 *                 description: Сортировка
 *               count:
 *                 type: number
 *                 example: 50
 *                 description: Максимальное количество
 */

router.post(
  "/",
  authenticateToken,
  validationMiddleware.validateBody,
  VideosControllers.saveSearchBar
);

/**
 * @swagger
 * /api/videos/{id}:
 *   patch:
 *     summary: Редактирование запроса
 *     description: Редактирует запрос по его id
 *     tags:
 *       - Videos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Идентификатор запроса
 *     requestBody:
 *        $ref: "#/components/requestBodies/Videos"
 *     responses:
 *       200:
 *         description: Запрос успешно обновлен
 */
router.patch(
  "/:id",
  authenticateToken,
  validationMiddleware.validateBodyUpdate,
  validationMiddleware.validateParamId,
  VideosControllers.updateSearchBar
);

module.exports = router;
