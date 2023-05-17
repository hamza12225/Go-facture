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
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  dateDebut: {
    type: Date,
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
  UserId :{
    type:  String,
    required: true
  },
  sendtoDir :{
    type:  Boolean,
    default: false
  },
  sendtoSe :{
    type:  Boolean,
    default: false
  },
  certifiee :{
    type:  Date,
  },
  envoyeeDALe :{
    type:  Date,
  },
},
{ timestamps: true }
);

const Facteur = mongoose.model("Facteur", FacteurSchema);
export default Facteur;
