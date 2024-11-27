const { validationResult } = require("express-validator");
const Sentry = require("@sentry/node");
const { default: axios } = require("axios");

const VideosServices = require("../services/videosServices");

class VideosControllers {
  async getVideos(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: process.env.API_KEY,
            q: req.query.search,
            part: "snippet",
            maxResults: req.query.count,
            type: "video",
          },
        }
      );

      if (req.query.sortBy) {
        res.send(
          result.data.items.sort((a, b) => {
            if (a.snippet[req.query.sortBy] > b.snippet[req.query.sortBy]) {
              return 1;
            } else if (
              a.snippet[req.query.sortBy] < b.snippet[req.query.sortBy]
            ) {
              return -1;
            } else return 0;
          })
        );
      } else {
        res.send(result.data.items);
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      res.status(500).json({ message: "Ошибка получения видео по запросу" });
    }
  }

  async getVideosBySearch(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const data = await VideosServices.findSearchById(
        req.userId,
        req.params.id
      );

      if (!data) {
        throw new Error(
          "Не найден сохраненный запрос с указазнным идентификатором."
        );
      }

      const result = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: process.env.API_KEY,
            q: data.search,
            part: "snippet",
            maxResults: data.count,
            type: "video",
          },
        }
      );

      if (data.sortBy) {
        res.send(
          result.data.items.sort((a, b) => {
            if (a.snippet[data.sortBy] > b.snippet[data.sortBy]) {
              return 1;
            } else if (a.snippet[data.sortBy] < b.snippet[data.sortBy]) {
              return -1;
            } else return 0;
          })
        );
      } else {
        res.send(result.data.items);
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      res.status(500).json({
        message: `Ошибка получения видео по запросу: ${error.message}`,
      });
    }
  }

  async getSearchBar(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const data = await VideosServices.getSearchBar(req.userId);
      if (data.length > 0) {
        res.send(data);
      } else {
        res.send("Не найдено.");
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      res.status(500).json({ message: "Ошибка получения списка запросов" });
    }
  }

  async getSearchBarById(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const data = await VideosServices.findSearchById(
        req.userId,
        req.params.id
      );
      if (data) {
        res.send(data);
      } else {
        res.send("Не найдено.");
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      res.status(500).json({ message: "Ошибка получения запроса по id" });
    }
  }

  async saveSearchBar(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await VideosServices.saveSearchBar({ ...req.body, userId: req.userId });

      res.send("OK");
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      res
        .status(500)
        .json({ message: "Ошибка сохранения запроса в базу данных" });
    }
  }

  async updateSearchBar(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const search = await VideosServices.findSearchById(
        req.userId,
        req.params.id
      );

      if (!search) {
        res.send("Запрос с указанным id не найден");
      } else {
        await VideosServices.updateSearchBar(req.params.id, req.body);
        res.send("OK");
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      res.status(500).json({ message: "Ошибка редактирования запроса" });
    }
  }

  async deleteSearchBar(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const search = await VideosServices.findSearchById(
        req.userId,
        req.params.id
      );

      if (!search) {
        res.send("Запрос с указанным id не найден");
      } else {
        await VideosServices.deleteSearch({
          id: req.params.id,
          userId: req.userId,
        });

        res.send("OK");
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      res
        .status(500)
        .json({ message: "Ошибка удаления запроса из базы данных" });
    }
  }
}

module.exports = new VideosControllers();
