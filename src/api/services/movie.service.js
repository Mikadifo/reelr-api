import { PrismaClient } from "./../../../generated/prisma/client.js";
import errorCodes from "./../../constants/errorCodes.enum.js";

const { PRISMA_DUPLICATE, PRISMA_NOT_FOUND } = errorCodes;

const prisma = new PrismaClient();

const addMovie = async (movie) => {
  try {
    const newMovie = await prisma.movie.create({
      data: movie,
    });

    return newMovie;
  } catch (err) {
    if (err.code === PRISMA_DUPLICATE) {
      const error = new Error("Movie with that name already exists");
      error.status = 409;

      throw error;
    }

    throw err;
  }
};

const getMovies = async ({ userId }) => {
  try {
    const movies = await prisma.movie.findMany({
      where: { userId },
    });

    return movies;
  } catch (err) {
    throw err;
  }
};

const getUnlistedMovies = async ({ userId }) => {
  try {
    const movies = await prisma.movie.findMany({
      where: { userId, lists: { none: {} } },
    });

    return movies;
  } catch (err) {
    throw err;
  }
};

const getMovie = async ({ userId, movieId }) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: movieId, userId },
      include: {
        lists: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (movie) {
      return movie;
    }

    const error = new Error("Movie not found");
    error.status = 404;
    throw error;
  } catch (err) {
    throw err;
  }
};

const getPublicMovie = async ({ username, movieId }) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!user) {
      const error = new Error("Movie not found");
      error.status = 404;
      throw error;
    }

    const movie = await prisma.movie.findUnique({
      where: { id: movieId, public: true, userId: user.id },
      select: { img: true, name: true, genre: true, year: true, rating: true },
    });

    if (movie) {
      return movie;
    }

    const error = new Error("Movie not found");
    error.status = 404;
    throw error;
  } catch (err) {
    throw err;
  }
};

const updateMovie = async ({ movieId, userId, movie }) => {
  try {
    const updatedMovie = await prisma.movie.update({
      where: { id: movieId, userId },
      data: {
        ...movie,
        rating: movie.hasOwnProperty("rating") ? movie.rating : null,
      },
      include: {
        lists: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: { userId },
    });

    return updatedMovie;
  } catch (err) {
    if (err.code === PRISMA_NOT_FOUND) {
      const error = new Error("Movie not found");
      error.status = 404;

      throw error;
    }

    if (err.code === PRISMA_DUPLICATE) {
      const error = new Error("Movie with that name already exists");
      error.status = 409;

      throw error;
    }

    throw err;
  }
};

const deleteMovie = async ({ movieId, userId }) => {
  try {
    await prisma.movie.delete({
      where: { id: movieId, userId },
    });
  } catch (err) {
    if (err.code === PRISMA_NOT_FOUND) {
      const error = new Error("Movie not found");
      error.status = 404;

      throw error;
    }

    throw err;
  }
};

export default {
  addMovie,
  getMovies,
  getUnlistedMovies,
  getMovie,
  getPublicMovie,
  updateMovie,
  deleteMovie,
};
