import React from 'react';
import { useState,useEffect } from "react";
import Navbar from "scenes/navbar";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { orange } from "@mui/material/colors";
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const FactureContainer = styled(Container)({
  paddingTop: "50px",
  paddingBottom: "50px",
});

const FactureTitle = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "30px",
});

const FactureForm = styled(Paper)({
  padding: "40px",
});

const ReceptionField = styled(TextField)({
  marginBottom: "20px",
});

const SubmitButton = styled(Button)({
  marginTop: "20px",
  backgroundColor: orange[500],
  color: "#fff",
  "&:hover": {
    backgroundColor: orange[700],
  },
});

const OperatorSelect = styled(FormControl)({
  marginBottom: "20px",
  minWidth: 200,
});

function Receptions() {
  const [showPopup, setShowPopup] = useState(false);
  const [numeroFacture, setNumeroFacture] = useState("");
  const [numeroDocumentReception, setNumeroDocumentReception] = useState("");
  const [montantTTC, setMontantTTC] = useState("");
  const [date, setDate] = useState("");
  const [receptions, setReceptions] = useState([]);
  const token = useSelector((state) => state.token);
  const { id } = useParams();

  const handleAddReception = async () => {
    try {
      const newReception = {
        numéroFacture: numeroFacture,
        numéroDocumentRéception: numeroDocumentReception,
        montantTTC: parseFloat(montantTTC),
        date: date,
      };
  
      const requestData = {
        receptions: [newReception],
      };
  
      const response = await axios.put(
        `http://localhost:3001/facteurs/${id}/addreception`,
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

    
      if (response.data.error) {
        throw new Error(response.data.error);
      }

      fetchReceptions();
      
      setShowPopup(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  
  

  
  const fetchReceptions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/facteurs/${id}/receptions`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const formattedReceptions = response.data.map(reception => ({
        ...reception,
        date: new Date(reception.date).toLocaleDateString('en-GB')
      }));
      setReceptions(formattedReceptions);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  useEffect(() => {
    
    fetchReceptions();
  }, [id, token]);
  




  return (
    <Box>
      <Navbar />
      <FactureContainer maxWidth="md">
        <FactureTitle variant="h4">Réceptions</FactureTitle>
        <Button variant="contained" onClick={() => setShowPopup(true)} style={{ marginRight: '10px', marginBottom: '10px' }}>Ajouter Réception</Button>
        <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
          <FactureForm>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <ReceptionField fullWidth label="Numéro de facture"
                  variant="outlined"
                  value={numeroFacture}
                  onChange={(event) => setNumeroFacture(event.target.value)}

                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ReceptionField fullWidth label="Numéro de document de réception"
                  variant="outlined"
                  value={numeroDocumentReception}
                  onChange={(event) => setNumeroDocumentReception(event.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ReceptionField fullWidth label="Montant TTC"
                  variant="outlined"
                  type='number'
                  value={montantTTC}
                  onChange={(event) => setMontantTTC(event.target.value)}
      
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ReceptionField fullWidth label="La date"
                  variant="outlined"
                  value={date}
                  type='date'
                  onChange={(event) => setDate(event.target.value)}

                />
              </Grid>
              <Grid item xs={12}>
                <SubmitButton variant="contained" onClick={handleAddReception}>Ajouter</SubmitButton>
              </Grid>
            </Grid>
          </FactureForm>
        </Dialog>


        {receptions.map((reception) => (
        <Paper
          key={reception.id}
          sx={{
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          {/* Display reception details */}
          <Typography variant="subtitle1">
            Numéro de facture: {reception.numéroFacture}
          </Typography>
          <Typography variant="subtitle1">
            Numéro de document de réception: {reception.numéroDocumentRéception}
          </Typography>
          <Typography variant="subtitle1">
            Montant TTC: {reception.montantTTC}
          </Typography>
          <Typography variant="subtitle1">
            La date: {reception.date}
          </Typography>
          {/* Add more fields as necessary */}
        </Paper>
      ))}


      </FactureContainer>
    </Box>
  );
}

export default Receptions;
