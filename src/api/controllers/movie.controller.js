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

export const getMovies = async (req, res, next) => {
  try {
    const movies = await movieService.getMovies({ userId: req.user.userId });

    res.json(movies);
  } catch (err) {
    next(err);
  }
};
