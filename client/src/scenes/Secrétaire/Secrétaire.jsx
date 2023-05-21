import React, { useState,useEffect } from 'react'
import { Box, useMediaQuery, Button } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "./SecretaireNavbar";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function Secrétaire() {
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [factureDate, setFactureDate] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const { operator } = useParams();
  const [showPopup, setShowPopup] = useState(false);

  const GetFactures = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/facteurs/sendtoSe",
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

  // certifiee

  const handleExport = (data) => {
    const formattedData = data.map((row) => ({
      'Offre': row.offre,
      'No Facture': row.noFacture,
      'Compte de facturation': row.compteFacturation,
      'Date de facturation': row.dateFacturation,
      'Date fin': row.dateFin,
      'Montant Abonnement HT': row.montantAbonnementHT,
      'Montant Communications HT': row.montantCommunicationsHT,
      'Montant TTC': row.montantTTC,
      'Total TTC à payer': row.totalTTCPayer,
      'Nom opèrateur': row.operatorName,
      'certifié': row.certifiee,
      'envoyèe à DA': row.envoyeeDALe,
      // Add more fields as needed
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Factures');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelData, 'factures.xlsx');
  };
  


  const columns = [
    { field: "offre", headerName: "Offre", width: 150 },
    { field: "noFacture", headerName: "No Facture", width: 120 },
    { field: "compteFacturation", headerName: "Compte de facturation", width: 150 },
    {
      field: "dateFacturation",
      headerName: "Date de facturation",
      width: 150,
      valueGetter: (params) => {
        const date = new Date(params.row.dateFacturation);
        const formattedDate = date.toLocaleDateString("en-GB");
        return formattedDate;
      },
    },
    {
      field: "dateFin",
      headerName: "Date fin",
      width: 90,
      valueGetter: (params) => {
        const date = new Date(params.row.dateFin);
        const formattedDate = date.toLocaleDateString("en-GB");
        return formattedDate;
      },
    },
    { field: "montantAbonnementHT", headerName: "Montant Abonnement HT", width: 160 },
    { field: "montantCommunicationsHT", headerName: "Montant Communications HT", width: 180 },
    { field: "montantTTC", headerName: "Montant TTC", width: 90 },
    { field: "totalTTCPayer", headerName: "Total TTC à payer", width: 120 },
    {
      field: "operatorName",
      headerName: "Nom opèrateur",
      width: 120,
    },
    {
      field: "certifiee",
      headerName: "Certifiée",
      width: 90,
      valueGetter: (params) => {
        const date = new Date(params.row.certifiee);
        const formattedDate = date.toLocaleDateString("en-GB");
        return formattedDate;
      },
    },
    {
      field: "envoyeeDALe",
      headerName: "Envoyée à DA",
      width: 120,
      valueGetter: (params) => {
        const date = new Date(params.row.envoyeeDALe);
        const formattedDate = date.toLocaleDateString("en-GB");
        if (formattedDate === "Invalid Date") {
          return "pas en cours!";
        }
        return formattedDate;
      },
    },
  ];
  


  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }


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
        const response = await fetch(
          `http://localhost:3001/facteurs/${facture._id}/da`, // Use originalId instead of id
          {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify(facture),
          }
        );

  
        if (!response.ok) throw new Error(`Failed to update facture ${facture._id}`);
      }
      const timestamp = new Date().toISOString().split('T')[0];
      alert(`${count} facteurs sont envoyés à le DA !`);
      createNotification(`${user._id}`, `${count} factures ont été envoyées à DA par secrétaire ${user.firstName} ${user.lastName}, le ${timestamp}`);
      GetFactures(operator);
    } catch (error) {
      console.error(error);
    }
  
    setOpen(true);
  };

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
        <Button variant="contained"   style={{marginRight: '10px'}}  onClick={() => handleExport(data)}>Exporter Format Excel</Button>

        <Button variant="contained"  style={{marginRight: '10px'}} onClick={handleClickx}>Envoyer à DA</Button>
          <DatePopup
          open={showPopup}
          onClose={handleClosePopup}
          onSubmit={handleSubmitPopup}
        />


      </Box>

    <Box width={1500} padding={2} justifyContent="center">
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
  )
}

export default Secrétaire


