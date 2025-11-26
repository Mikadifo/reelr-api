import { PrismaClient } from "./../../../generated/prisma/client.js";

const prisma = new PrismaClient();

const getShareLink = async ({ movieId, userId }) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { username: true },
    });

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;

      throw error;
    }

    const movie = await prisma.movie.findUnique({
      where: { id: movieId, userId },
      select: { id: true },
    });

    if (!movie) {
      const error = new Error("Movie not found");
      error.status = 404;

      throw error;
    }

    return `/movies/${user.username}/${movie.id}`;
  } catch (err) {
    throw err;
  }
};

export default {
  getShareLink,
};
