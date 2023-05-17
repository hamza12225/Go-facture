import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { orange } from "@mui/material/colors";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";


const FactureContainer = styled(Container)({
    paddingTop: "30px",
    paddingBottom: "50px",
  });
  
  const FactureTitle = styled(Typography)({
    fontWeight: "bold",
    marginBottom: "30px",
  });
  
  const FactureForm = styled(Paper)({
    padding: "20px",
  });
  
  const OperatorName = styled(Typography)({
    fontWeight: "bold",
    marginBottom: "20px",
  });
  
  const FactureField = styled(TextField)({
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

function AjouterFacture() {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  const [operators, setOperators] = useState([]);
  const [operatorName, setOperatorName] = useState('');
  const { operator } = useParams();

  const [offre, setOffre] = useState("");
  const [noFacture, setNoFacture] = useState("");
  const [compteFacturation, setCompteFacturation] = useState("");
  const [dateFacturation, setDateFacturation] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [montantAbonnementHT, setMontantAbonnementHT] = useState("");
  const [montantCommunicationsHT, setMontantCommunicationsHT] = useState("");
  const [montantTTC, setMontantTTC] = useState("");
  const [totalTTCPayer, setTotalTTCPayer] = useState("");
  const navigate = useNavigate();

  const [montantTTCx, setMontantTTCx] = useState("");

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };




  const handleSubmitFacture = (event) => {
    event.preventDefault();
  
    const formData = {
      offre,
      noFacture,
      compteFacturation,
      dateFacturation,
      dateFin,
      dateDebut,
      montantAbonnementHT,
      montantCommunicationsHT,
      montantTTC: (Number(montantCommunicationsHT) + Number(montantAbonnementHT) * 1.2).toFixed(2),
      totalTTCPayer,
      operatorName:operator,
      UserId: user._id,
    };
  
    // Check if any input field is null

    axios.post('http://localhost:3001/facteurs/add', formData , {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data);
        alert(`La Facture est ajouter!`);
        navigate(`/${operator}/factures`);

      })
      .catch(error => {
        console.error(error);
      });
  };



  return (
    <Box>
        <Navbar/>
        <FactureContainer maxWidth="md">
      <FactureTitle variant="h4">Ajouter une Facture</FactureTitle>
      <FactureForm>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FactureField fullWidth label="Offre" 
            variant="outlined"
            value={offre}
            onChange={(event) => setOffre(event.target.value)}
             />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FactureField fullWidth label="No FACTURE" variant="outlined" 
            value={noFacture}
            onChange={(event) => setNoFacture(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
          <FactureField fullWidth label="Operateur" variant="outlined" 
            value={operator}
            InputProps={{
              readOnly: true,
            }}
            />

          </Grid>
          <Grid item xs={12} sm={6}>
            <FactureField
              fullWidth
              label="Compte de facturation"
              value={compteFacturation}
              onChange={(event) => setCompteFacturation(event.target.value)}

            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FactureField
              fullWidth
              label="Date facturation"
              type='date'
              variant="outlined"
              value={dateFacturation}
              onChange={(event) => setDateFacturation(event.target.value)}

            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FactureField fullWidth label="Date Fin" variant="outlined"
            type='date'
              value={dateFin}
              onChange={(event) => setDateFin(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FactureField fullWidth label="Date dèbut" variant="outlined"
            type='date'
              value={dateDebut}
              onChange={(event) => setDateDebut(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FactureField
              fullWidth
              label="Montant Abonnement HT"
              variant="outlined"
              value={montantAbonnementHT}
              onChange={(event) => setMontantAbonnementHT(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FactureField
              fullWidth
              label="Montant Communications HT"
              variant="outlined"              
              value={montantCommunicationsHT}
              onChange={(event) => setMontantCommunicationsHT(event.target.value)}

            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <FactureField
          fullWidth
          label="montantTTC"
          variant="outlined"
          value={(Number(montantCommunicationsHT) + Number(montantAbonnementHT) * 1.2).toFixed(2)}
          InputProps={{
            readOnly: true,
          }}
        />

          </Grid>
          <Grid item xs={12} sm={6}>
            <FactureField
              fullWidth
              label="totalTTCPayer"
              variant="outlined"
              value={totalTTCPayer}
              onChange={(event) => setTotalTTCPayer(event.target.value)}
            />
          </Grid>          
        </Grid>
        <Button variant="contained"  style={{marginRight: '10px'}} onClick={handleSubmitFacture}>Ajouter</Button>

      </FactureForm>
    </FactureContainer>

    </Box>
    
  );
}


export default AjouterFacture;

