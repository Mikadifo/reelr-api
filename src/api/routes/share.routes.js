import { Router } from "express";
import { getShareLink } from "../controllers/share.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

/**
 * @swagger
 * tags:
 *   name: Share
 *   description: Share endpoints
 */
const router = Router();

/**
 * @swagger
 * /api/share/{id}:
 *   get:
 *     tags: [Share]
 *     summary: Get share link for given movie id
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
 *         description: Link fetched successfully
 *       404:
 *         description: User or Movie not found
 *       500:
 *         description: Unexpected error
 */
router.get("/:id", authMiddleware, getShareLink);

export default router;
