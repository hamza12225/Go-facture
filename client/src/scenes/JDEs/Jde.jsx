import React ,{useState} from 'react'
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


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




function Jde() {
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
  

    const data = [
        { id: 1, date: "2022-01-01", en_cours: true, Userid: 100 },
        { id: 2, date: "2022-01-02", en_cours: false, Userid: 101 },
        { id: 3, date: "2022-01-03", en_cours: true, Userid: 102 },
        { id: 4, date: "2022-01-04", en_cours: false, Userid: 103 },
        { id: 5, date: "2022-01-05", en_cours: true, Userid: 104 },

      ];


    const columns = [
        { field: "id", headerName: "Numéro de commande (JDE)", width: 190 },
        { field: "date", headerName: "Type de la commande", width: 150 },
        { field: "filed1", headerName: "Fournisseur ", width: 120 },
        {
          field: "en_cours",
          headerName: "Type fournisseur",
          width: 120,
          renderCell: (params) => {
            return (
              <div className="productListStatus">
                  {/* {statue(params.row.en_cours)} */}
              </div>
            )
          },
        },
        { field: "filed2", headerName: "Code fournisseur (JDE)", width: 150 },
        { field: "filed3", headerName: "N°Manuel SNRT", width: 130 },
        { field: "filed4", headerName: "Montant TTC (Global)", width: 180 },
        {
          field: "action",
          headerName: "Actions",
          width: 150,
          renderCell: (params) => {
            return (
              <>
              {/* must have id in receptions */}
                <Link to={"/Réceptions"}>
                <Button variant="contained" size="small">Details</Button>
                </Link>
                <Button variant="outlined" size="small" >
                Envoyer
              </Button>
              </>
            );
          },
        },
      ];
  return (
      <Box>
        <Navbar/>
        <Box display="flex" justifyContent="center" paddingTop={'20px'} >
        <Link to={`/${operator}/factures/ajouterfacture`}>
          <Button variant="contained"  style={{marginRight: '10px'}}>Ajouter Facture</Button>
        </Link>
        {/* Réceptions */}
        <Link to="/AjouterOperator">
        <Button variant="contained"  style={{marginRight: '10px'}}>Ajouter Operator</Button>
        </Link>
        <Button variant="contained"  style={{marginRight: '10px'}} onClick={handleClick}>Envoyer à directeur</Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          La Facture est envoyer à Le dircteur
        </Alert>
      </Snackbar>

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

export default Jde