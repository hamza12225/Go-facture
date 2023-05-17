import express from "express";
import { verifyToken ,checkRole} from "../middleware/auth.js";

const router = express.Router();

router.get('/', verifyToken,checkRole('secrétaire') ,(req, res) => {
    res.send('Welcome, secrétaire!');
  });
  
export default router;
