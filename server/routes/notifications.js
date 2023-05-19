import express from 'express';
import { verifyToken, checkRole } from "../middleware/auth.js";
import { CreateNotification, GetNotification ,ReadNotification ,MakeNotificationsRead  } from '../controllers/notifications.js';

// create router instance
const router = express.Router();


router.put('/makeRead',verifyToken,MakeNotificationsRead); 
// define routes
router.post('/', verifyToken, CreateNotification); 
router.get('/read', verifyToken, GetNotification); 
// utilisateur', 'admin', 'directeur', 'secrétaire'

// export the router
export default router;
