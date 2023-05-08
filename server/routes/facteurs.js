import express from "express";
import {
  readFacteurs,//readFacteurs
  readFacteurById,//readFacteurById
  createFacteur,//createFacteur
  deleteFacteur,//deleteFacteur
  modifyFacteur//modifyFacteur
} from "../controllers/facteurs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET all facteurs
router.get("/", verifyToken, readFacteurs);

// GET a facteur by ID and display it on a separate page
router.get("/:id", verifyToken, readFacteurById);

// POST a new facteur
router.post("/add",verifyToken, createFacteur);

// DELETE an existing facteur by ID
router.delete("/:id", verifyToken, deleteFacteur);

// PATCH (update) an existing facteur by ID
router.patch("/:id", verifyToken, modifyFacteur);
// utilisateur', 'admin', 'directeur', 'secrétaire'
export default router;
