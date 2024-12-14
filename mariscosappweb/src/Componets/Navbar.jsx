import { useNavigate } from "react-router-dom";

export default function Navbar({ height }) {
   const navigate = useNavigate(); // Hook para redirigir al usuario

   const handleLogout = () => {
      // Borra el token almacenado
      localStorage.removeItem("authToken");

      // Redirige a la página de inicio de sesión
      navigate("/sesion");
   };

   return (
      <nav
         className="h-12 w-full bg-white border-b flex items-center px-4 fixed top-0 left-0 z-10"
         style={{ height: height }}>
         <h1 className="text-xl font-bold" style={{ color: "#FF0000" }}>
            SOTILLO
         </h1>
         <div className="ml-auto">
            <button
               onClick={handleLogout} // Lógica de cerrar sesión
               className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
               Cerrar Sesión
            </button>
         </div>
      </nav>
   );
}
