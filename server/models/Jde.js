import mongoose from "mongoose";

const JdeSchema = new mongoose.Schema({
  numeroCommandeJDE:{
    type: String,
    required: true
  },
  typeCommande: {
    type: String,
    required: true
  },
  fournisseur: {
    type: String,
    required: true
  },
  typeFournisseur: {
    type: String,
    required: true
  },
  codeFournisseurJDE: {
    type: String,
    required: true
  },
  numeroManuelSNRT: {
    type: String,
    required: true
  },
  montantTTCGlobal: {
    type: Number,
    required: true
  },
  operatorName:{
    type: String,
    required: true
  },

  
});

const Jde = mongoose.model("Jde", JdeSchema);
export default Jde;
