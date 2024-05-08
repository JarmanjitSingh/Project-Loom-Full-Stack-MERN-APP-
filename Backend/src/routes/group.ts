import express from 'express';
import { createGroup } from '../controllers/group.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.route("/create").post(isAuthenticated, createGroup);


export default router;