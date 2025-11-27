import { Router } from "express";
import {
  addList,
  addMovieToList,
  getLists,
  removeMovieFromList,
  getAvailableLists,
} from "../controllers/list.controller.js";
import { newListSchema } from "../schemas/list.schema.js";
import validate from "../../middlewares/validate.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

/**
 * @swagger
 * tags:
 *   name: List
 *   description: List endpoints
 */
const router = Router();

/**
 * @swagger
 * /api/lists:
 *   post:
 *     tags: [List]
 *     summary: Add new list
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: List created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: List with that name already exists
 *       500:
 *         description: Unexpected error
 */
router.post("/", authMiddleware, validate(newListSchema), addList);

/**
 * @swagger
 * /api/lists:
 *   get:
 *     tags: [List]
 *     summary: Get user lists
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lists fetched successfully
 *       500:
 *         description: Unexpected error
 */
router.get("/", authMiddleware, getLists);

/**
 * @swagger
 * /api/lists/{movieId}:
 *   get:
 *     tags: [List]
 *     summary: Get availabe lists for given movie id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         required: true
 *         name: movieId
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Lists fetched successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Unexpected error
 */
router.get("/:movieId", authMiddleware, getAvailableLists);

/**
 * @swagger
 * /api/lists/{listId}/{movieId}:
 *   delete:
 *     tags: [List]
 *     summary: Remove movie from list
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         required: true
 *         name: listId
 *         schema:
 *           type: number
 *       - in: path
 *         required: true
 *         name: movieId
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Movie removed from list
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Unexpected error
 */
router.delete("/:listId/:movieId", authMiddleware, removeMovieFromList);

/**
 * @swagger
 * /api/lists/{listId}/{movieId}:
 *   post:
 *     tags: [List]
 *     summary: Add movie to list
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         required: true
 *         name: listId
 *         schema:
 *           type: number
 *       - in: path
 *         required: true
 *         name: movieId
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Movie add to list
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Unexpected error
 */
router.post("/:listId/:movieId", authMiddleware, addMovieToList);

export default router;
