import express from "express";
import { login ,getUsers,register } from "../controllers/auth.js";
import { verifyToken ,checkRole} from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);

router.get("/users", getUsers);

export default router;
