import Facteur from "../models/Facture.js";

/* CREATE */
export const createFacteur = async (req, res) => {
  try {
    const { offre, noFacture, compteFacturation, dateFacturation, dateFin, montantAbonnementHT, montantCommunicationsHT, montantTTC, totalTTCPayer, operatorName,certifiee, envoyeeDALe } = req.body;
    const newFacteur = new Facteur({
      offre,
      noFacture,
      compteFacturation,
      dateFacturation,
      dateFin,
      montantAbonnementHT,
      montantCommunicationsHT,
      montantTTC,
      totalTTCPayer,
      operatorName,
    });
    await newFacteur.save();
    res.status(201).json(newFacteur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

  

/* READ */
export const readFacteurs = async (req, res) => {
  try {
    const facteurs = await Facteur.find();
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
