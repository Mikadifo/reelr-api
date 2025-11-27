import { Router } from "express";
import { addList } from "../controllers/list.controller.js";
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

export default router;
