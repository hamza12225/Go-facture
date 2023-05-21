import React ,{useState,useEffect} from 'react'
import { Box, useMediaQuery,Button} from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import { Link } from "react-router-dom";
import { DataGrid ,GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';
import facteurs from './facteurs.css';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';






function Factures() {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [factureDate, setFactureDate] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);


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



    const columns = [
        { field: "offre", headerName: "Offre", width: 150 },
        { field: "noFacture", headerName: "No Facture", width: 120 },
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
        { field: "dateDebut", headerName: "dateDebut", width: 150 ,
        valueGetter: (params) => {
          const date = new Date(params.row.dateDebut);
          const formattedDate = date.toLocaleDateString('en-GB');
          return formattedDate;
        },
        },
        { field: "montantAbonnementHT", headerName: "Montant Abonnement HT", width: 160 },
        { field: "montantCommunicationsHT", headerName: "Montant Communications HT", width: 180 },
        { field: "montantTTC", headerName: "Montant TTC", width: 120 },
        { field: "totalTTCPayer", headerName: "Total TTC à payer", width: 120 },
      ];

      const GetFactures = async (operatorName) => {
        try {
          const response = await axios.get(
            `http://localhost:3001/facteurs/${operatorName}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
      
          const facturesWithId = response.data
        
          .map((facture) => ({
            id: uuidv4(),
            ...facture,
          }));
    
        setData(facturesWithId);
        } catch (error) {
          console.error(error);
          // Handle the error here
        }
      };      
      useEffect(() => {
        GetFactures(operator);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const handleClickx = () => {
        setShowPopup(true);
      };
    
      const handleClosePopup = () => {
        setShowPopup(false);
      };

      function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

      const [openSnackbar, setOpenSnackbar] = useState(false);


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
      


      const timestamp = new Date().toISOString().split('T')[0];

      const handleSubmitPopup = async (date) => {
        const selectedDate = new Date(date);
        const selectedMonth = selectedDate.getMonth();
        const selectedYear = selectedDate.getFullYear();
      
        setFactureDate(selectedDate);
        setShowPopup(false);
      
        const updatedData = data.map((row) => {
          const rowDate = new Date(row.dateFacturation); // Moved this line outside of the map function
          if (
            selectedRows.includes(row.id)
            && rowDate.getMonth() === selectedMonth
            && rowDate.getFullYear() === selectedYear
          ) {
            return { ...row, sendtoDir: true };
          }
          return row;
        });
      
        const filteredData = updatedData.filter((row) => {
          const rowDate = new Date(row.dateFacturation); // Repeated the same line here
          return (
            rowDate.getMonth() === selectedMonth && rowDate.getFullYear() === selectedYear
          );
        });
      
        setData(filteredData);
        const count = filteredData.length;
        // Send a PATCH request to update each facture in the filteredData array
      for (const facture of filteredData) {
        facture.sendtoDir = true; // Update the sendtoDir property to true

        try {
          const response = await fetch(
            `http://localhost:3001/facteurs/${facture._id}`, 
            {
              method: 'PATCH',
              headers: { Authorization: `Bearer ${token}` },
              body: JSON.stringify(facture),
            }
          );
          if (!response.ok) throw new Error(`Failed to update facture ${facture.originalId}`);
          alert(`${count} facteurs sont envoyés au directeur pour certification!`);
          createNotification(`${user._id}`, `${count} nouvelles factures ont été envoyées par ${user.firstName} ${user.lastName} le ${timestamp}`);
          GetFactures(operator);
        } catch (error) {
          console.error(error);
        }
      }
        setOpen(true);
      };
      
      const handleSnackbarClose = () => {
        setOpenSnackbar(false);
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
      

      
  return (
      <Box>
        <Navbar/>
        <Box display="flex" justifyContent="center" paddingTop={'20px'} >
        <Link to={`/${operator}/factures/ajouterfacture`}>
          <Button variant="contained"  style={{marginRight: '10px'}}>Ajouter Facture</Button>
        </Link>
        <Button variant="contained" onClick={handleClickx}>
        Envoyer à directeur
      </Button>
      {/* <Button variant="contained"  style={{marginLeft: '10px'}}>
        Ajouter factures par Pack
      </Button> */}
      <DatePopup
        open={showPopup}
        onClose={handleClosePopup}
        onSubmit={handleSubmitPopup}
      />

        </Box>
        <Box display="flex" justifyContent="center" paddingTop={'20px'} >
        <Box width={1600} padding={2}>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          checkboxSelection
          selectionModel={selectedRows}
          onSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
          components={{
            Toolbar: CustomToolbar,
          }}
          
        />
      </Box>
       </Box>

      </Box>
     
  )
}

export default Factures