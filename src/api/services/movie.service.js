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

export default {
  addMovie,
};
