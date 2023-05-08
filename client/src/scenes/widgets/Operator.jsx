import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WidgetWrapper from "components/WidgetWrapper";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Logo_SNRT from './Logo_SNRT.png';
import operator from './operator.css'
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOperators } from "state";

const OperatorBox = styled(Grid)(({ theme, color }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 200,
  height: 200,
  backgroundColor: color,
  color: theme.palette.common.white,
  fontSize: 48,
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[4],
    transform: "scale(1.05)",
  },
  "&:active": {
    boxShadow: theme.shadows[8],
    transform: "scale(0.95)",
  },
}));

function Operator() {
  const [operators, setOperators] = useState([]);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);

  const getOperators = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/operators`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOperators(response.data);
    } catch (error) {
      console.error(error);
      // Handle the error here
    }
  };
  
  
  useEffect(() => {
    getOperators();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='operator'>
      <div className='Logo'>
        <img src={Logo_SNRT} alt='logo' height={200} className='logo_snrt'/> 
      </div>
      <Box display="flex" justifyContent="center" paddingTop={'20px'}>
        <Grid container justifyContent="center" spacing={2}>
          {operators.map(operator => (
            <Grid item key={operator.name}>
              <Link to={`/${operator.name}/factures`}>
                <OperatorBox color={`rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`}>{operator.name}</OperatorBox>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>  
  );
}

export default Operator;
