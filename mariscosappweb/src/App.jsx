import React from "react";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from "react-router-dom";
import Login from "./vistas/Login";
import Dashboard from "./vistas/Dashboard";

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
   const token = localStorage.getItem("authToken");
   return !!token; // Devuelve true si hay un token
};

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
   const token = isAuthenticated();

   if (!token) {
      return <Navigate to="/sesion" />; // Redirige al login si no está autenticado
   }

   return children; // Renderiza la ruta protegida si está autenticado
};

// Componente para redirigir si ya está autenticado
const PublicRoute = ({ children }) => {
   const token = isAuthenticated();

   if (token) {
      return <Navigate to="/dashboard" />; // Redirige al dashboard si ya está autenticado
   }

   return children; // Renderiza la ruta pública si no está autenticado
};

export default function App() {
   return (
      <Router>
         <Routes>
            {/* Ruta pública: Login */}
            <Route
               path="/sesion"
               element={
                  <PublicRoute>
                     <Login />
                  </PublicRoute>
               }
            />
            {/* Ruta protegida: Dashboard */}
            <Route
               path="/dashboard"
               element={
                  <ProtectedRoute>
                     <Dashboard />
                  </ProtectedRoute>
               }
            />
         </Routes>
      </Router>
   );
}
