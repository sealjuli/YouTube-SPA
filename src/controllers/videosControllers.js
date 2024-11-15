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
      const API_KEY = process.env.API_KEY;
      const maxResults = 5;

      const result = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: API_KEY,
            q: req.params.search,
            part: "snippet",
            maxResults: maxResults,
            type: "video",
          },
        }
      );

      res.send(result.data.items);
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async getSearchBar(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const data = await VideosServices.getSearchBar();

      res.send(data);
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async saveSearchBar(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await VideosServices.saveSearchBar(req.body);

      res.send("OK");
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async updateSearchBar(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await VideosServices.updateSearchBar(req.params.id, req.body);

      res.send("OK");
    } catch (error) {
      Sentry.captureException(error);
    }
  }
}

module.exports = new VideosControllers();
