import express from "express";
import { verifyToken ,checkRole} from "../middleware/auth.js";

const router = express.Router();

router.get('/', verifyToken,checkRole('admin') ,(req, res) => {
    res.send('Welcome, admin!');
  });
  
export default router;
