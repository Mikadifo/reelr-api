import { Router } from "express";
import {
  addMovie,
  getMovies,
  getMovie,
  getPublicMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controller.js";
import { newMovieSchema } from "../schemas/movie.schema.js";
import validate from "../../middlewares/validate.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

/**
 * @swagger
 * tags:
 *   name: Movie
 *   description: Movie endpoints
 */
const router = Router();

/**
 * @swagger
 * /api/movies:
 *   post:
 *     tags: [Movie]
 *     summary: Add new movie
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
 *               - genre
 *               - img
 *               - year
 *             properties:
 *               name:
 *                 type: string
 *               genre:
 *                 type: string
 *               img:
 *                 type: string
 *               year:
 *                 type: number
 *               public:
 *                 type: boolean
 *                 default: false
 *               rating:
 *                 type: number
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Movie with that name already exists
 *       500:
 *         description: Unexpected error
 */
router.post("/", authMiddleware, validate(newMovieSchema), addMovie);

/**
 * @swagger
 * /api/movies:
 *   get:
 *     tags: [Movie]
 *     summary: Get user movies
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Movies fetched successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Unexpected error
 */
router.get("/", authMiddleware, getMovies);

/**
 * @swagger
 * /api/movies/{username}/{id}:
 *   get:
 *     tags: [Movie]
 *     summary: Get public user movie by id
 *     parameters:
 *       - in: path
 *         required: true
 *         name: username
 *         schema:
 *           type: string
 *       - in: path
 *         required: true
 *         name: id
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Movie fetched successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Unexpected error
 */
router.get("/:username/:id", getPublicMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     tags: [Movie]
 *     summary: Get user movie by id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         required: true
 *         name: id
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Movie fetched successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Unexpected error
 */
router.get("/:id", authMiddleware, getMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     tags: [Movie]
 *     summary: Update movie
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         required: true
 *         name: id
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - genre
 *               - img
 *               - year
 *               - public
 *             properties:
 *               name:
 *                 type: string
 *               genre:
 *                 type: string
 *               img:
 *                 type: string
 *               year:
 *                 type: number
 *               public:
 *                 type: boolean
 *                 default: false
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Movie not found
 *       409:
 *         description: Movie with that name already exists
 *       500:
 *         description: Unexpected error
 */
router.put("/:id", authMiddleware, validate(newMovieSchema), updateMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     tags: [Movie]
 *     summary: Delete user movie by id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         required: true
 *         name: id
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Unexpected error
 */
router.delete("/:id", authMiddleware, deleteMovie);

export default router;
