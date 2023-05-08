import { Grid } from '@mui/material';
import React from 'react';
import { Box, Button, DatePicker, TextField, Typography } from '@mui/material';
import Navbar from 'scenes/navbar';
import { useState } from 'react';
import axios from 'axios';

function AddOperator() {
    const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/operators/new', { name });
      console.log(response.data);
      // handle success, e.g. show a success message and clear the form
    } catch (error) {
      console.error(error);
      // handle error, e.g. show an error message to the user
    }
  };

  return (
    <Box>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        paddingTop={'20px'}
        padding={'20px'}
        flexDirection={'column'}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Remplir les informations de Facture
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Operator"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={{ marginBottom: '20px' }}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}> 
            Ajouter
          </Button>
      </Box>
    </Box>
  );
}

export default AddOperator;
