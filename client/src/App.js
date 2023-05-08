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
              element={isAuth ? <AjouterFacture /> : <Navigate to="/" />}
            />
              <Route
              path="/Réceptions"
              element={isAuth ? <Réceptions /> : <Navigate to="/" />}
            />
              <Route
              path="/AjouterOperator"
              element={isAuth ? <AddOperator /> : <Navigate to="/" />}
            />
              <Route
              path="/:operator/Jdes"
              element={
                roleBasedRender(<Jde />, "utilisateur")
              }
            />

            <Route
            path="/admin"
            element={
              roleBasedRender(<Admin />, "admin")
            }
            />
            
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
