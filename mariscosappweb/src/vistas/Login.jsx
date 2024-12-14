import React, { useState } from "react";
import {
   Box,
   Button,
   Checkbox,
   CircularProgress,
   FormControlLabel,
   TextField,
   Typography,
   Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logomarisco.jpg";

export default function BasicExample() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(false); // Estado de carga
   const navigate = useNavigate();

   const handleLogin = async () => {
      setError(null);
      setIsLoading(true);

      try {
         const response = await fetch("https://localhost:7282/sesion/usuario", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               Email: email,
               Contrasena: password,
            }),
         });

         if (response.ok) {
            const data = await response.json();
            const { token } = data;
            localStorage.setItem("authToken", token);
            navigate("/dashboard");
         } else if (response.status === 401 || response.status === 404) {
            const data = await response.json();
            const { mensaje } = data;
            setError(
               mensaje || "Credenciales incorrectas. Inténtalo de nuevo."
            );
         } else {
            throw new Error("Error del servidor");
         }
      } catch (err) {
         setError(err.message);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <Box
         sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
            padding: 2,
         }}>
         <Box
            sx={{
               display: "flex",
               flexWrap: "wrap",
               alignItems: "center",
               justifyContent: "center",
               width: { xs: "100%", md: "80%" },
               maxWidth: 1200,
               backgroundColor: "#fff",
               boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
               borderRadius: 2,
               overflow: "hidden",
            }}>
            <Box
               sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 2,
                  backgroundColor: "#ffffff",
               }}>
               <img
                  src={logo}
                  alt="Sample"
                  style={{ maxWidth: "100%", height: "auto" }}
               />
            </Box>

            <Box
               sx={{
                  flex: 1,
                  padding: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
               }}>
               <Typography
                  style={{ color: "#FF0000" }}
                  variant="h4"
                  gutterBottom>
                  Iniciar sesión
               </Typography>

               <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                     "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                           borderColor: "#FF0000", // Cambia el borde al rojo cuando está enfocado
                        },
                     },
                     "& .MuiInputLabel-root": {
                        "&.Mui-focused": {
                           color: "#FF0000", // Cambia el label al rojo cuando está enfocado
                        },
                     },
                  }}
               />

               <TextField
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                     "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                           borderColor: "#FF0000", // Cambia el borde al rojo cuando está enfocado
                        },
                     },
                     "& .MuiInputLabel-root": {
                        "&.Mui-focused": {
                           color: "#FF0000", // Cambia el label al rojo cuando está enfocado
                        },
                     },
                  }}
               />

               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center",
                  }}>
                  <FormControlLabel control={<Checkbox />} label="Recordar" />
               </Box>
               {error && <Alert severity="error">{error}</Alert>}
               <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ backgroundColor: "#FF0000" }}
                  sx={{ padding: "10px 0" }}
                  onClick={handleLogin}
                  disabled={isLoading}>
                  {isLoading ? (
                     <CircularProgress size={24} style={{ color: "white" }} />
                  ) : (
                     "Iniciar Sesión"
                  )}
               </Button>
            </Box>
         </Box>
      </Box>
   );
}
