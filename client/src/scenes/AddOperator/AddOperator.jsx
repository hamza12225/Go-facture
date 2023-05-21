
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "scenes/Admin/AdminNavbar";
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

function AddOperator() {
  const token = useSelector((state) => state.token);
  const [Nom, setNom] = useState("");
  const [Type, setType] = useState("");

  const navigate = useNavigate();

  const handleSubmitOperator = (event) => {
    event.preventDefault();
  
    const formData = {
      name: Nom,
      type: Type,
    };
  

    // Check if any input field is null

    axios.post('http://localhost:3001/operators/add', formData , {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data);
        alert(`Operator est ajouter!`);
        createNotification(`ADMIN`, `un nouvel opérateur est ajouté  : ${Nom} le ${timestamp} `);
        navigate(`/admin`);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const timestamp = new Date().toISOString().split('T')[0];

  const createNotification = async (userId, message) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/notifications',
        { userId, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  

      if (response.status === 201) {
        const notification = response.data;
      } else {
        throw new Error('Failed to create notification');
      }
    } catch (error) {
      console.error(error);
    }
  };
  



  return (
    <Box>
        <Navbar/>
        <FactureContainer maxWidth="md">
      <FactureTitle variant="h4">Ajouter Operator</FactureTitle>
      <FactureForm>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FactureField fullWidth label="Nom Operator" 
            variant="outlined"
            value={Nom}
            onChange={(event) => setNom(event.target.value)}
             />
          </Grid>
          <Grid item xs={12}>
            <TextField
                label="Catégorie de operateur"
                fullWidth
                name="role"
                select
                value={Type}
                onChange={(event) => setType(event.target.value)}
                sx={{ gridColumn: "span 4" }}
            >
                <MenuItem value="operator">Operateur de communication</MenuItem>
                <MenuItem value="JDE">JDE</MenuItem>  
            </TextField>
            </Grid>
        </Grid>
        <Button variant="contained"  style={{marginRight: '10px' ,marginTop:'20px'}} onClick={handleSubmitOperator}>Ajouter</Button>
      </FactureForm>
    </FactureContainer>

    </Box>
    
  );
}


export default AddOperator;

