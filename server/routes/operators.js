import express from 'express';
import { verifyToken ,checkRole} from "../middleware/auth.js";
import {addoperator ,readOperators} from '../controllers/operators.js'

// create router instance
const router = express.Router();

// define routes
router.post('/add',verifyToken , checkRole('utilisateur'),addoperator); // Create a new operator
router.get('/' ,verifyToken , checkRole('utilisateur'), readOperators); // Retrieve all operators
// utilisateur', 'admin', 'directeur', 'secrétaire'

// export the router
export default router;
