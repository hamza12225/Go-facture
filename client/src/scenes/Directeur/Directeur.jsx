import React, { useState ,useEffect } from 'react'
import { Box, useMediaQuery, Button } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "./DirecteurNavbar";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';
import facteurs from './directeur.css';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';




const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function Directeur() {
  const [open, setOpen] = useState(false);
  const { operator } = useParams();
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const token = useSelector((state) => state.token);
  const [factureDate, setFactureDate] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  
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
  const CertifiePardate = (date,certifié) =>{
    

  }



  const GetFactures = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/facteurs/sendtoDir",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const facturesWithId = response.data.map((facture) => ({
        id: uuidv4(), // Generate a unique id for each facture
        ...facture,
      }));
  
      setData(facturesWithId);
    } catch (error) {
      console.error(error);
      // Handle the error here
    }
  };
  
  useEffect(() => {
    GetFactures();
  }, []);
  


  const columns = [
    { field: "offre", headerName: "Offre", width: 150 },
    { field: "noFacture", headerName: "No Facture", width: 90 },
    { field: "compteFacturation", headerName: "Compte de facturation", width: 150 
    },
    { field: "dateFacturation", headerName: "Date de facturation", width: 150,
    valueGetter: (params) => {
      const date = new Date(params.row.dateFacturation);
      const formattedDate = date.toLocaleDateString('en-GB');
      return formattedDate;
    },
  
  }, 
    { field: "dateFin", headerName: "Date fin", width: 150 ,
    valueGetter: (params) => {
      const date = new Date(params.row.dateFin);
      const formattedDate = date.toLocaleDateString('en-GB');
      return formattedDate;
    },
    },
    { field: "montantAbonnementHT", headerName: "Montant Abonnement HT", width: 160 },
    { field: "montantCommunicationsHT", headerName: "Montant Communications HT", width: 180 },
    { field: "montantTTC", headerName: "Montant TTC", width: 90 },
    { field: "totalTTCPayer", headerName: "Total TTC à payer", width: 120 },
    { field: "operatorName", headerName: "Nom Operateur", width: 120 },
  ];
  const handleSubmitPopup = async (date) => {
    const selectedDate = new Date(date);
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();
  
    setFactureDate(selectedDate);
    setShowPopup(false);
  
    const updatedData = data.map((row) => {
      const rowDate = new Date(row.dateFacturation); // Moved this line outside of the map function
      if (
        selectedRows.includes(row.id) &&
        rowDate.getMonth() === selectedMonth &&
        rowDate.getFullYear() === selectedYear
      ) {
        return { ...row, sendtoDir: true };
      }
      return row;
    });
  
    const filteredData = updatedData.filter((row) => {
      const rowDate = new Date(row.dateFacturation); // Repeated the same line here
      return rowDate.getMonth() === selectedMonth && rowDate.getFullYear() === selectedYear;
    });
  
    setData(filteredData);
    const count = filteredData.length;
    
    try {
      for (const facture of filteredData) {
        facture.sendtoDir = true;
        console.log(JSON.stringify(facture));
        const response = await fetch(
          `http://localhost:3001/facteurs/${facture._id}/se`,
          {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify(facture),
          }
        );
  
        if (!response.ok) throw new Error(`Failed to update facture ${facture._id}`);
      }
  
      alert(`${count} facteurs sont envoyés à secrétaire pour envoyer à DA!`);
      GetFactures(operator);
      
    } catch (error) {
      console.error(error);
    }
  
    setOpen(true);
  };
  



  
  function DatePopup({ open, onClose, onSubmit }) {
    const [date, setDate] = useState('');
  
    const handleSubmit = () => {
      onSubmit(date);
    };
  
    return (
      <Dialog open={open} onClose={onClose}>

        <DialogTitle style={{marginBottom:'5px'}}>Enter la date des factures </DialogTitle>

        <DialogContent>
          <TextField
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      
    );
  }
  const handleClickx = () => {
    setShowPopup(true);
  };
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  

  return (
    <Box>
      <Navbar />
      <Box display="flex" justifyContent="center" paddingTop={'20px'} >
        {/* Réceptions */}
        <Button variant="contained"  style={{marginRight: '10px'}} onClick={handleClickx}>Certifié Les factures</Button>
          <DatePopup
          open={showPopup}
          onClose={handleClosePopup}
          onSubmit={handleSubmitPopup}
        />


      </Box>
      <Box display="flex" justifyContent="center" paddingTop={'20px'} >
        <Box width={1500} padding={2}>
          <DataGrid
            rows={data}
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

export default Directeur