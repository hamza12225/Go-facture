
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./AdminNavbar";
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
import { Password } from '@mui/icons-material';


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

function AjouterUser() {
  const token = useSelector((state) => state.token);

  const [operators, setOperators] = useState([]);
  const [operatorName, setOperatorName] = useState('');
  const [role, setRole] = useState("");


  const [Nom, SetNom] = useState("");
  const [Prenom, SetPrenom] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [passwordValue, setPasswordValue] = useState("");


  const navigate = useNavigate();


  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleSubmitUser = (event) => {
    event.preventDefault();
  
    const formData = {
      firstName: Nom,
      lastName: Prenom,
      email: Email,
      password: passwordValue,
      role : role,
    };
  
    // Check if any input field is null
  
    axios.post('http://localhost:3001/auth/register', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data);
        alert(`Utilisateur Ajouter!`);
        navigate(`/admin`);
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <Box>
        <Navbar/>
        <FactureContainer maxWidth="md">
      <FactureTitle variant="h4">Ajouter Utilisateur</FactureTitle>
      <FactureForm>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FactureField fullWidth label="Nom" 
            variant="outlined"
            value={Nom}
            onChange={(event) => SetNom(event.target.value)}
             />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FactureField fullWidth label="Prènom" variant="outlined" 
            value={Prenom}
            onChange={(event) => SetPrenom(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                label="Role"
                fullWidth
                name="role"
                select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                sx={{ gridColumn: "span 4" }} >
                <MenuItem value="utilisateur">Utilisateur</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="directeur">Directeur</MenuItem>
                <MenuItem value="secrétaire">Secrétaire</MenuItem>
            </TextField>
            </Grid>
          <Grid item xs={12} sm={6}>
            <FactureField
              fullWidth
              label="Email"
              value={Email}
              onChange={(event) => SetEmail(event.target.value)}

            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <FactureField
            fullWidth
            type="password"
            label="Mot de passe"
            variant="outlined"
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.target.value)}
          />
          </Grid>     
        </Grid>
        <Button variant="contained"  style={{marginRight: '10px'}} onClick={handleSubmitUser} >Ajouter</Button>

      </FactureForm>
    </FactureContainer>

    </Box>
    
  );
}


export default AjouterUser;

