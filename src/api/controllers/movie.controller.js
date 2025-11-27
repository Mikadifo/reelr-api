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

export const addMovieWithListId = async (req, res, next) => {
  try {
    const listId = Number(req.params.listId);

    const movie = await movieService.addMovieWithListId(
      {
        ...req.body,
        userId: req.user.userId,
      },
      listId,
    );

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

export const getUnlistedMovies = async (req, res, next) => {
  try {
    const movies = await movieService.getUnlistedMovies({
      userId: req.user.userId,
    });

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

export const getPublicMovie = async (req, res, next) => {
  try {
    const username = String(req.params.username);
    const movieId = Number(req.params.id);

    const movie = await movieService.getPublicMovie({
      username,
      movieId,
    });

    res.json(movie);
  } catch (err) {
    next(err);
  }
};

export const updateMovie = async (req, res, next) => {
  try {
    const movieId = Number(req.params.id);

    const movie = await movieService.updateMovie({
      movieId,
      userId: req.user.userId,
      movie: req.body,
    });

    res.json(movie);
  } catch (err) {
    next(err);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const movieId = Number(req.params.id);

    await movieService.deleteMovie({
      movieId,
      userId: req.user.userId,
    });

    res.json("Movie deleted successfully");
  } catch (err) {
    next(err);
  }
};
