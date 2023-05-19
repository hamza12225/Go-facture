import React ,{useState,useEffect} from 'react'
import { Box, useMediaQuery,Button} from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import { Link } from "react-router-dom";
import { DataGrid ,GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function Jde() {
  const token = useSelector((state) => state.token);
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
  

  const [jdes, setJdes] = useState([]);

  useEffect(() => {
    fetchJdes();
  }, []);

  const fetchJdes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/facteurs/Jdx`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const JdesWithId = response.data.map((jde) => ({
        id: uuidv4(), // Generate a unique id for each facture
        ...jde,
      }));
      
      setJdes(JdesWithId);
      console.log(JdesWithId)
    } catch (error) {
      console.error(error);
      // Handle the error here
    }
  };


    const columns = [
        { field: "numeroCommandeJDE", headerName: "Numéro de commande (JDE)", width: 190 },
        { field: "typeCommande", headerName: "Type de la commande", width: 150 },
        { field: "fournisseur", headerName: "Fournisseur ", width: 120 },
        {
          field: "typeFournisseur",
          headerName: "Type fournisseur",
          width: 120,
        },
        { field: "codeFournisseurJDE", headerName: "Code fournisseur (JDE)", width: 150 },
        { field: "numeroManuelSNRT", headerName: "N°Manuel SNRT", width: 130 },
        { field: "montantTTCGlobal", headerName: "Montant TTC (Global)", width: 180 },
        {
          field: "action",
          headerName: "Actions",
          width: 150,
          renderCell: (params) => {
            return (
              <>
              {/* must have id in receptions */}
                <Link to={`/Receptions/${params.row._id}`}>
                <Button variant="contained" size="small">Details</Button>
                </Link>
              </>
            );
          },
        },
      ];


      const handleExport = (data) => {
  const formattedData = data.map((row) => ({
    'Numéro de commande (JDE)': row.numeroCommandeJDE,
    'Type de la commande': row.typeCommande,
    'Fournisseur': row.fournisseur,
    'Type fournisseur': row.typeFournisseur,
    'Code fournisseur (JDE)': row.codeFournisseurJDE,
    'N°Manuel SNRT': row.numeroManuelSNRT,
    'Montant TTC (Global)': row.montantTTCGlobal,
    'Réceptions': row.receptions.map((reception) => ({
      'Numéro de facture': reception.numeroFacture,
      'Numéro de document de réception': reception.numeroDocumentReception,
      'Montant TTC': reception.montantTTC,
      'Date': reception.date,
    })),
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData.flat());
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Factures');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(excelData, 'Jdes.xlsx');
};

      
  return (
      <Box>
        <Navbar/>
        <Box display="flex" justifyContent="center" paddingTop={'20px'} >
        <Link to={`/${operator}/Jdes/AjouterJde`}>
          <Button variant="contained"  style={{marginRight: '10px'}}>Ajouter Commande</Button>
        </Link>
        <Button variant="contained"  onClick={() => handleExport(jdes)} >Exporter Format excel</Button>
        {/* Réceptions */}
        </Box>
        <Box display="flex" justifyContent="center" paddingTop={'20px'} >
        <Box width={1500} padding={2}>
        <DataGrid
          rows={jdes}
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

export default Jde