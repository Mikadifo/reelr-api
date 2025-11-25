import movieService from "../services/movie.service.js";

export const addMovie = async (req, res, next) => {
  try {
    const movie = await movieService.addMovie({
      ...req.body,
      userId: req.user.userId,
    });

    res.status(201).json(movie);
  } catch (err) {
    if (err.status === 409) {
      return res.status(409).json({ error: err.message });
    }

    next(err);
  }
};
