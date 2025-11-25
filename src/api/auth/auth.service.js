import { PrismaClient } from "./../../../generated/prisma/client.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import errorCodes from "./../../constants/errorCodes.enum.js";

dotenv.config();

const { PRISMA_DUPLICATE } = errorCodes;

const secret = process.env.JWT_SECRET;
const prisma = new PrismaClient();

const register = async ({ username, email, password }) => {
  try {
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email, password: hashed },
      omit: { password: true },
    });

    return user;
  } catch (err) {
    if (err.code === PRISMA_DUPLICATE) {
      const error = new Error("Username or email already exists");
      error.status = 409;

      throw error;
    }

    throw err;
  }
};

const login = async ({ username, password }) => {
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    const error = new Error("Invalid username or password");
    error.status = 401;

    throw error;
  }

  const validCredentials = await bcrypt.compare(password, user.password);

  if (!validCredentials) {
    const error = new Error("Invalid username or password");
    error.status = 401;

    throw error;
  }

  const token = jwt.sign({ userId: user.id }, secret, {
    expiresIn: "1h",
  });

  return { token };
};

export default {
  login,
  register,
};
