import express from 'express';
import { verifyToken, checkRole } from "../middleware/auth.js";
import { CreateNotification, GetNotification ,ReadNotification  } from '../controllers/notifications.js';

// create router instance
const router = express.Router();

// define routes
router.post('/', verifyToken, CreateNotification); 
router.get('/read', verifyToken, GetNotification); 

router.put('/:notificationId',ReadNotification); 
// utilisateur', 'admin', 'directeur', 'secrétaire'

// export the router
export default router;
