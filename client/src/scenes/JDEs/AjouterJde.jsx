

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

function AjouterJde() {
  const [operators, setOperators] = useState([]);
//   const [operatorNamex, setOperatorNamex] = useState('');
  const { operator } = useParams();



  const navigate = useNavigate();
  const [numeroCommandeJDE, setNumeroCommandeJDE] = useState("");
  const [typeCommande, setTypeCommande] = useState("");
  const [fournisseur, setFournisseur] = useState("");
  const [typeFournisseur, setTypeFournisseur] = useState("");
  const [codeFournisseurJDE, setCodeFournisseurJDE] = useState("");
  const [numeroManuelSNRT, setNumeroManuelSNRT] = useState("");
  const [montantTTCGlobal, setMontantTTCGlobal] = useState("");
  const [operatorName, setoperatorName] = useState('');
  const token = useSelector((state) => state.token);



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

  const handleSubmitFacture = async(event) => {
    event.preventDefault();
  
    const formData = {
      numeroCommandeJDE,
      typeCommande,
      fournisseur,
      typeFournisseur,
      codeFournisseurJDE,
      numeroManuelSNRT,
      montantTTCGlobal,
      operatorName: operator
    };
  
        await axios.post('http://localhost:3001/facteurs/Jdx/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    
      .then(response => {
        alert(`Le Jde est ajouté!`);
        navigate(`/home`);
      })
      .catch(error => {
        console.error(error);
        alert(`Une erreur s'est produite lors de l'ajout du Jde: ${error.message}`);
      });
  };
  
  const handleOperatorChange = (event) => {
    setoperatorName(event.target.value);
 };
 function FactureSelect(props) {
    const { label, value, onChange, children } = props;
  
    return (
      <FormControl fullWidth variant="outlined">
        <InputLabel>{label}</InputLabel>
        <Select value={value} onChange={onChange} label={label}>
          {children}
        </Select>
      </FormControl>
    );
  }


 
  return (
    <Box>
        <Navbar/>
        <FactureContainer maxWidth="md">
      <FactureTitle variant="h4">Ajouter une commande</FactureTitle>
      <FactureForm>
      <Grid item xs={12} sm={6}>
            <FactureField
            fullWidth
            label="Numéro de commande (JDE)"
            variant="outlined"
            value={numeroCommandeJDE}
            onChange={(event) => setNumeroCommandeJDE(event.target.value)}
        />
        
        </Grid>
        <Grid item xs={12} sm={6}>
        <FactureSelect
            fullWidth
            label="Type de la commande"
            variant="outlined"
            value={typeCommande}
            onChange={(event) => setTypeCommande(event.target.value)}
            
        >
            <MenuItem value="CT">CT</MenuItem>
            <MenuItem value="CL">CL</MenuItem>
            <MenuItem value="CI">CI</MenuItem>
            <MenuItem value="M1">M1</MenuItem>
        </FactureSelect>

        </Grid>
        <Grid item xs={12} sm={6}>
        <FactureField fullWidth label="catégorie" variant="outlined" 
            value={operator}
            InputProps={{
              readOnly: true,
            }}
            
            />
        </Grid>
        <Grid item xs={12} sm={6}>
        <FactureField
            fullWidth
            label="Fournisseur"
            variant="outlined"
            value={fournisseur}
            onChange={(event) => setFournisseur(event.target.value)}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <FactureSelect
            fullWidth
            label="Type fournisseur"
            variant="outlined"
            value={typeFournisseur}
            onChange={(event) => setTypeFournisseur(event.target.value)}
        >
            <MenuItem value="ETG">ETG</MenuItem>
            <MenuItem value="LOC">LOC</MenuItem>
        </FactureSelect>
                
        </Grid>
        <Grid item xs={12} sm={6}>
        <FactureField
            fullWidth
            label="Code fournisseur (JDE)"
            variant="outlined"
            value={codeFournisseurJDE}
            onChange={(event) => setCodeFournisseurJDE(event.target.value)}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <FactureField
            fullWidth
            label="N°Manuel SNRT"
            variant="outlined"
            value={numeroManuelSNRT}
            onChange={(event) => setNumeroManuelSNRT(event.target.value)}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <FactureField
            fullWidth
            label="Montant TTC (Global)"
            variant="outlined"
            value={montantTTCGlobal}
            onChange={(event) => setMontantTTCGlobal(event.target.value)}
        />
        </Grid>
        <Button variant="contained"  style={{marginRight: '10px'}} onClick={handleSubmitFacture}>Ajouter</Button>

      </FactureForm>
    </FactureContainer>

    </Box>
    
  );
}


export default AjouterJde;

