import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import Logo_SNRT from "./Logo_SNRT.jpg";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Gofacture
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <div className='Logo'>
          <img src={Logo_SNRT} alt='logo' height={300} width={300} className='logo_snrt'/> 
        </div>
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }} style={{marginTop:'20px'}}>
          Bienvenue à Gofacture, pour la gestion factures de SNRT!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
