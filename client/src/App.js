import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import AjouterFacture from "scenes/AjouterFacture/AjouterFacture"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import FacturesPage from 'scenes/FacturesPage/Facteurs';
import Réceptions from 'scenes/Réceptions/Receptions';
import AddOperator from 'scenes/AddOperator/AddOperator';
import Admin from "scenes/Admin/Admin";
import Jde from "scenes/JDEs/Jde";
import AjouterJde from "scenes/JDEs/AjouterJde";
import Secrétaire from "scenes/Secrétaire/Secrétaire";
import Directeur from "scenes/Directeur/Directeur";
import AjouterUser from "scenes/Admin/AjouterUser";


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);

  const roleBasedRender = (component, role) => {
    return isAuth && user.role === role
      ? component
      : <Navigate to="/" />;
  };

 
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={
                roleBasedRender(<HomePage />, "utilisateur")
              }
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
              <Route
              path="/:operator/factures"
              element={isAuth ? <FacturesPage /> : <Navigate to="/" />}
            />
              <Route
              path="/:operator/factures/ajouterfacture"
              element={
                roleBasedRender(<AjouterFacture />, "utilisateur")
              }
            />
              <Route
              path="/Receptions/:id"
              element={
                roleBasedRender(<Réceptions />, "utilisateur")
              }
            />
              <Route
              path="/AjouterOperator"
              element={
                roleBasedRender(<AddOperator />, "admin")
              }
            />

              <Route
              path="/:operator/Jdes"
              element={
                roleBasedRender(<Jde />, "utilisateur")
              }
            />
              <Route
              path="/:operator/Jdes/AjouterJde"
              element={
                roleBasedRender(<AjouterJde />, "utilisateur")
              }
            />

            <Route
            path="/admin"
            element={
              roleBasedRender(<Admin />, "admin")
            }
            />
            <Route
            path="/secretaire"
            element={
              roleBasedRender(<Secrétaire />, "secrétaire")
            }
            />
            <Route
            path="/directeur"
            element={
              roleBasedRender(<Directeur />, "directeur")
            }
            />
            <Route
            path="/AjouterUtilisateur"
            element={
              roleBasedRender(<AjouterUser />, "admin")
            }
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
