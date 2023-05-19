import express from "express";
// import {getUsers} from "../controllers/admin.js";
import { verifyToken ,checkRole} from "../middleware/auth.js";


const router = express.Router();

router.get('/', verifyToken,checkRole('admin') ,(req, res) => {
    res.send('Welcome, admin!');
  });

// router.get("/users", verifyToken, checkRole('admin'), getUsers);

export default router;
