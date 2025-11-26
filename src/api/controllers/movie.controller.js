import movieService from "../services/movie.service.js";

export const addMovie = async (req, res, next) => {
  try {
    const movie = await movieService.addMovie({
      ...req.body,
      userId: req.user.userId,
    });

    res.status(201).json(movie);
  } catch (err) {
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

export const getMovie = async (req, res, next) => {
  try {
    const movieId = Number(req.params.id);

    const movie = await movieService.getMovie({
      userId: req.user.userId,
      movieId,
    });

    res.json(movie);
  } catch (err) {
    next(err);
  }
};
