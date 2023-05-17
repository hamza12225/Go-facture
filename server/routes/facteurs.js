import express from "express";
import {
  readFacteursByOperator,//readFacteurs
  createFacteur,//createFacteur
  deleteFacteur,//deleteFacteur
  modifyFacteur,//modifyFacteur
  createJde,
  readJdes,
  createJdx,
  readJdex,
  sendtoDir,
  sendtoSe,
  modifyJdex,
  getAllReceptions,
  setSendToDirTrue,
  setSendToSETrue,
  setSendToDA
} from "../controllers/facteurs.js";
import { verifyToken, checkRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/sendtoDir", verifyToken, sendtoDir);
router.get("/sendtoSe", verifyToken, sendtoSe);
// setSendToDA

router.patch("/:id", verifyToken, checkRole('utilisateur'), setSendToDirTrue);
router.patch("/:id/se", verifyToken, checkRole('directeur'), setSendToSETrue);
router.patch("/:id/da", verifyToken, checkRole('secrétaire'), setSendToDA);


router.get("/:jdexId/receptions", verifyToken, getAllReceptions);

// GET all facteurs
router.get("/jdx", verifyToken, checkRole('utilisateur'), readJdex);

router.get('/:operatorName', verifyToken, checkRole('utilisateur'), readFacteursByOperator);
router.get("/Jdes", verifyToken, checkRole('utilisateur'), readJdes);
router.put("/:id/addreception", verifyToken, modifyJdex);

// GET a facteur by ID and display it on a separate page
// router.get("/:id", verifyToken , checkRole('utilisateur'), readFacteurById);

// POST a new facteur
router.post("/add", verifyToken, checkRole('utilisateur'), createFacteur);
// POST a new facteur jde
router.post("/Jdes/add", verifyToken, checkRole('utilisateur'), createJde);
// GET all factures jdes
// router.get("/Jdes", verifyToken, readJdes);
// DELETE an existing facteur by ID
// router.delete("/:id", verifyToken , checkRole('utilisateur'), deleteFacteur);
router.post("/Jdx/add", verifyToken, checkRole('utilisateur'), createJdx);
// PATCH (update) an existing facteur by ID
// utilisateur', 'admin', 'directeur', 'secrétaire'
export default router;
