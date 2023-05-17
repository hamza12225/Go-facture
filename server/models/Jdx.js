import mongoose from "mongoose";

const receptionSchema = new mongoose.Schema({
  numéroFacture: {
    type: String,
    required: true,
  },
  numéroDocumentRéception: {
    type: String,
    required: true,
  },
  montantTTC: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

});

const JdxSchema = new mongoose.Schema({
  numeroCommandeJDE: {
    type: String,
    required: true,
  },
  typeCommande: {
    type: String,
    required: true,
  },
  fournisseur: {
    type: String,
    required: true,
  },
  typeFournisseur: {
    type: String,
    required: true,
  },
  codeFournisseurJDE: {
    type: String,
    required: true,
  },
  numeroManuelSNRT: {
    type: String,
    required: true,
  },
  montantTTCGlobal: {
    type: Number,
    required: true,
  },
  operatorName: {
    type: String,
    required: true,
  },
  receptions: {
    type: [receptionSchema], // Use the defined receptionSchema
    default: [], // Initialize the array to be empty
  },
});

const Jdx = mongoose.model("Jdx", JdxSchema);

export default Jdx;
