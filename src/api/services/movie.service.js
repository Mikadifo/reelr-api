import { PrismaClient } from "./../../../generated/prisma/client.js";
import errorCodes from "./../../constants/errorCodes.enum.js";

const { PRISMA_DUPLICATE } = errorCodes;

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

export default {
  addMovie,
  getMovies,
  getMovie,
  getPublicMovie,
};
