import express from "express";
import { verifyToken ,checkRole} from "../middleware/auth.js";

const router = express.Router();

router.get('/', verifyToken,checkRole('directeur') ,(req, res) => {
    res.send('Welcome, directeur!');
  });
  
export default router;
