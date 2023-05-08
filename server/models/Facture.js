import mongoose from "mongoose";


const FacteurSchema = new mongoose.Schema({
  offre:{
    type: String,
    required: true
  },
  noFacture: {
    type: String,
    required: true
  },
  compteFacturation: {
    type: String,
    required: true
  },
  dateFacturation: {
    type: String,
    required: true
  },
  dateFin: {
    type: String,
    required: true
  },
  montantAbonnementHT: {
    type: Number,
    required: true
  },
  montantCommunicationsHT: {
    type: Number,
    required: true
  },
  montantTTC: {
    type: Number,
    required: true
  },
  totalTTCPayer: {
    type: Number,
    required: true
  },
  operatorName:{
    type: String,
    required: true
  },
  certifiee :{
    type:  String,
  },
  envoyeeDALe :{
    type:  String,
  },
});

const Facteur = mongoose.model("Facteur", FacteurSchema);
export default Facteur;
