import React from 'react'
import { useState } from "react";
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

function Receptions() {
const [operator, setOperator] = useState("");
  const handleChange = (event) => {
    setOperator(event.target.value);
  };
  return (
    <Box>
        <Navbar/>
        <FactureContainer maxWidth="md">
      <FactureTitle variant="h4">Facture Details</FactureTitle>
      <FactureForm>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FactureField fullWidth label="Offre" 
            variant="outlined"
             value={"Business Datacenters"} 
             InputProps={{
                readOnly: true,
              }}
             />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FactureField fullWidth label="No FACTURE" variant="outlined" value={"F22120954706"} />
          </Grid>
          <Grid item xs={12}>
            <FactureField fullWidth label="Operator Name" 
            variant="outlined"
            value={"orange"}
            InputProps={{
                readOnly: true,
              }}
             />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FactureField
              fullWidth
              label="Compte de facturation"
              value={"1008774089"}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}

            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FactureField
              fullWidth
              label="Date facturation"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FactureField fullWidth label="Date Fin" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FactureField
              fullWidth
              label="Montant Abonnement HT"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FactureField
              fullWidth
              label="Montant Communications HT"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FactureField
              fullWidth
              label="certifie"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      </FactureForm>
    </FactureContainer>

    </Box>
    
  );
}


export default Receptions;
