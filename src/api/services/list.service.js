import { PrismaClient } from "./../../../generated/prisma/client.js";
import errorCodes from "./../../constants/errorCodes.enum.js";

const { PRISMA_DUPLICATE } = errorCodes;

const prisma = new PrismaClient();

const addList = async (list) => {
  try {
    return await prisma.list.create({
      data: list,
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

export default {
  addList,
};
