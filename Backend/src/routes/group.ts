import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { createGroup } from '../controllers/group.js';

const router = express.Router();

router.route("/create").post(isAuthenticated, createGroup)

export default router;