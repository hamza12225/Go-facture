import Facteur from "../models/Facture.js";
import Jde from "../models/Jde.js";
import Jdx from "../models/Jdx.js";
/* CREATE */
export const createFacteur = async (req, res) => {
  try {
    const { offre, noFacture, compteFacturation, dateFacturation, dateFin,dateDebut, montantAbonnementHT, montantCommunicationsHT, montantTTC, totalTTCPayer, operatorName, certifiee, envoyeeDALe,UserId } = req.body;
    const newFacteur = new Facteur({
      offre,
      noFacture,
      compteFacturation,
      dateFacturation,
      dateFin,
      dateDebut,
      montantAbonnementHT,
      montantCommunicationsHT,
      montantTTC,
      totalTTCPayer,
      operatorName,
      UserId,
    });
    await newFacteur.save();
    res.status(201).json(newFacteur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



/* READ */
export const readFacteursByOperator = async (req, res) => {
  try {
    const operatorName = req.params.operatorName; // Retrieve the operator name from the URL parameter
    const facteurs = await Facteur.find({ operatorName: operatorName, sendtoDir: false }); // Filter by operatorName and sendtoDir: false
    res.status(200).json(facteurs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


/* READ BY ID*/
export const readFacteurById = async (req, res) => {
  try {
    const { id } = req.params;
    const facteur = await Facteur.findById(id);
    if (!facteur) throw Error('Facteur not found');
    res.status(200).json(facteur);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const modifyFacteur = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFacteur = await Facteur.findByIdAndUpdate(id,
      req.body,
      { new: true }
    );
    if (!updatedFacteur) throw Error('Facteur not found');
    res.status(200).json(updatedFacteur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// send to dircteur 

export const setSendToDirTrue = async (req, res) => {
  try {
    const { id } = req.params;

    const facture = await Facteur.findByIdAndUpdate(
      id,
      { sendtoDir: true },
      { new: true }
    );

    if (!facture) {
      return res.status(404).json({ message: 'Facture not found' });
    }

    res.status(200).json({ message: 'sendtoDir updated successfully', facture });
  } catch (error) {
    res.status(500).json({ message: 'Error updating sendtoDir', error });
  }
};

export const setSendToSETrue = async (req, res) => {
  try {
    const { id } = req.params;

    const facture = await Facteur.findByIdAndUpdate(
      id,
      { sendtoSe: true , certifiee: new Date() },
      { new: true }
    );

    if (!facture) {
      return res.status(404).json({ message: 'Facture not found' });
    }

    res.status(200).json({ message: 'sendtoDir updated successfully', facture });
  } catch (error) {
    res.status(500).json({ message: 'Error updating sendtoDir', error });
  }
};


export const setSendToDA = async (req, res) => {
  try {
    const { id } = req.params;

    const facture = await Facteur.findByIdAndUpdate(
      id,
      { envoyeeDALe: new Date() },
      { new: true }
    );

    if (!facture) {
      return res.status(404).json({ message: 'Facture not found' });
    }

    res.status(200).json({ message: 'sendtoDir updated successfully', facture });
  } catch (error) {
    res.status(500).json({ message: 'Error updating sendtoDir', error });
  }
};



/* DELETE */
export const deleteFacteur = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFacteur = await Facteur.findByIdAndDelete(id);
    if (!deletedFacteur) throw Error('Facteur not found');
    res.status(200).json(deletedFacteur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// create JDE

export const createJde = async (req, res) => {
  try {
    // numeroCommandeJDE,
    // typeCommande,
    // fournisseur,
    // typeFournisseur,
    // codeFournisseurJDE,
    // numeroManuelSNRT,
    // montantTTCGlobal,
    // operatorName

    const {
      numeroCommandeJDE,
      typeCommande,
      fournisseur,
      typeFournisseur,
      codeFournisseurJDE,
      numeroManuelSNRT,
      montantTTCGlobal,
      operatorName
    } = req.body;
    const newJde = new Jde({
      numeroCommandeJDE,
      typeCommande,
      fournisseur,
      typeFournisseur,
      codeFournisseurJDE,
      numeroManuelSNRT,
      montantTTCGlobal,
      operatorName
    });
    await newJde.save();
    res.status(201).json(newJde);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const readJdes = async (req, res) => {
  try {
    const jdes = await Jde.find();
    res.status(200).json(jdes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const createJdx = async (req, res) => {
  try {
    const {
      numeroCommandeJDE,
      typeCommande,
      fournisseur,
      typeFournisseur,
      codeFournisseurJDE,
      numeroManuelSNRT,
      montantTTCGlobal,
      operatorName
    } = req.body;
    const newJdx = new Jdx({
      numeroCommandeJDE,
      typeCommande,
      fournisseur,
      typeFournisseur,
      codeFournisseurJDE,
      numeroManuelSNRT,
      montantTTCGlobal,
      operatorName
    });
    await newJdx.save();
    res.status(201).json(newJdx);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const readJdex = async (req, res) => {
  try {
    const jdex = await Jdx.find();
    res.status(200).json(jdex);
    // res.json({ message: "hello world" })

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const sendtoDir = async(req,res) =>{
  try {
    const factures = await Facteur.find({ sendtoDir: true ,sendtoSe:false }); // Find factures with sendtoDir: true
    res.status(200).json(factures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const sendtoSe = async(req,res) =>{
  try {
    const factures = await Facteur.find({ sendtoSe: true ,sendtoDir:true }); // Find factures with sendtoDir: true
    res.status(200).json(factures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const modifyJdex = async (req, res) => {
  try {
    const { id } = req.params;
    const { receptions } = req.body;

    if (!receptions || !Array.isArray(receptions)) {
      return res.status(400).json({ error: 'Invalid receptions data' });
    }

    // Find the Jdex by ID
    const jdex = await Jdx.findById(id);

    if (!jdex) {
      return res.status(404).json({ error: 'Jdex not found' });
    }

    // Make sure receptions is defined and an array
    if (!Array.isArray(jdex.receptions)) {
      jdex.receptions = []; // Initialize receptions as an empty array
    }

    // Add the receptions to the Jdex
    jdex.receptions.push(...receptions);

    // Save the modified Jdex
    const updatedJdex = await jdex.save();

    res.status(200).json(updatedJdex);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllReceptions = async (req, res) => {
  try {
    const { jdexId } = req.params;

    // Find the Jdex by ID
    const jdex = await Jdx.findById(jdexId).populate('receptions');

    if (!jdex) {
      return res.status(404).json({ error: 'Jdex not found' });
    }

    const receptions = jdex.receptions;

    res.status(200).json(receptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFreshFactures = async(req,res) =>{
  try {
    const factures = await Facteur.find({ sendtoDir: false }); 
    res.status(200).json(factures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
