import { PrismaClient } from "./../../../generated/prisma/client.js";
import errorCodes from "./../../constants/errorCodes.enum.js";

const { PRISMA_DUPLICATE } = errorCodes;

const prisma = new PrismaClient();

const getLists = async ({ userId }) => {
  try {
    const lists = await prisma.list.findMany({
      where: { userId },
      include: {
        movies: {
          omit: { userId: true },
        },
      },
      omit: { userId: true },
    });

    return lists;
  } catch (err) {
    throw err;
  }
};

const addList = async (list) => {
  try {
    return await prisma.list.create({
      data: list,
      include: {
        movies: {
          omit: { userId: true },
        },
      },
      omit: { userId: true },
    });
  } catch (err) {
    if (err.code === PRISMA_DUPLICATE) {
      const error = new Error("List with that name already exists");
      error.status = 409;

      throw error;
    }

    throw err;
  }
};

const removeMovieFromList = async (listId, movieId, userId) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: movieId, userId },
    });

    if (!movie) {
      const error = new Error("Movie not found");
      error.status = 404;

      throw error;
    }

    const updatedList = await prisma.list.update({
      where: {
        id: listId,
        userId,
      },
      data: {
        movies: {
          disconnect: { id: movieId },
        },
      },
      include: {
        movies: {
          omit: { userId: true },
        },
      },
      omit: { userId: true },
    });

    return updatedList;
  } catch (err) {
    if (err.code === PRISMA_DUPLICATE) {
      const error = new Error("List with that name already exists");
      error.status = 409;

      throw error;
    }

    throw err;
  }
};

export default {
  getLists,
  addList,
  removeMovieFromList,
};
