
import React, { useState ,useEffect } from 'react'
import { Box, useMediaQuery, Button } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "./AdminNavbar";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function Admin() {
  const [open, setOpen] = useState(false);
  const { operator } = useParams();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }


  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Function to fetch user data
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/users');

        const facturesWithId = response.data.map((facture) => ({
          id: uuidv4(), // Generate a unique id for each facture
          ...facture,
        }));
        
        setUsers(facturesWithId);

      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { field: "firstName", headerName: "Nom", width: 90 },
    { field: "lastName", headerName: "Prènom", width: 90 },
    { field: "email", headerName: "Email", width: 170 },
    { field: "role", headerName: "Role", width: 90 },
    { field: "createdAt", headerName: "Date de Crèation", width: 150,
    valueGetter: (params) => {
      const date = new Date(params.row.createdAt);
      const formattedDate = date.toLocaleDateString('en-GB');
      return formattedDate;
    },
  
  },
  
  ];
  return (
    <Box>
      <Navbar />
      <Box display="flex" justifyContent="center" paddingTop={'20px'} >
        {/* Réceptions */}
        <Link to="/AjouterUtilisateur">
          <Button variant="contained" style={{ marginRight: '10px' }}>Ajouter Utilisateur</Button>
        </Link>
        <Link to="/AjouterOperator">
          <Button variant="contained" style={{ marginRight: '10px' }}>Ajouter Operateur</Button>
        </Link>
        {/* <Button variant="contained"  style={{marginRight: '10px'}} onClick={handleClick}>Envoyer à directeur</Button> */}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            La Facture est envoyer à Le dircteur
          </Alert>
        </Snackbar>
      </Box>
      <Box display="flex" justifyContent="center" paddingTop={'20px'} >
        <Box width={1500} padding={2}>
          <DataGrid
            rows={users}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            checkboxSelection
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </Box>
      </Box>

    </Box>

  )
}

export default Admin