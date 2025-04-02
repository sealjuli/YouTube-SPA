require("dotenv").config(); // Пакет dotenv имортируется для того, чтобы можно было использовать переменные окружения
const express = require("express");

const swaggerUi = require("swagger-ui-express"); // Подключение Swagger UI к Node.js
const swaggerSpec = require("../swaggerSpec.js");

const app = express();

// Инициализация Sentry
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.DSN,
  // Другие опции настройки
  integrations: [
    // Здесь исключаем OpenTelemetry интеграцию
  ],
});

// Обработчики Sentry
Sentry.setupExpressErrorHandler(app);

app.use(express.json()); //  Этот middleware парсит JSON-запросы, предоставляя доступ к данным в формате JSON в req.body

// Определяем маршрут для Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// функция логирования
function loggerMiddleware(req, res, next) {
  console.log(`Запрос по адресу: ${req.url}`);
  next(); // Передать управление следующему middleware
}

app.use(loggerMiddleware); // будет выполняться для каждого запроса (если без указания маршрута)

const router = require("./routes"); // загружаем из папки routes файл index по умолчанию
app.use("/api", router); // будет выполняться для всех запросов, начинающихся с "/api" (get/post/put/...)

const PORT = process.env.PORT; // загрузка переменных окружения

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
