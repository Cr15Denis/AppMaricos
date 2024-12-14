import { useState } from "react";
import {
   Home,
   PackageSearch,
   BadgeDollarSign,
   ChartPie,
   Users,
   Settings,
} from "lucide-react";
import Sidebar, { SidebarItem } from "../Componets/Sidebar";
import Navbar from "../Componets/Navbar";
import Productos from "../Componets/Productos";
import Ventas from "../Componets/ProductList";
import Usuarios from "../Componets/Usuarios";

function App() {
   const [selectedItem, setSelectedItem] = useState("Inicio");

   const handleSelect = (item) => {
      setSelectedItem(item);
   };

   return (
      <div className="flex flex-col h-screen">
         {/* Navbar fijo */}
         <Navbar height="60px" />

         <div
            className="flex flex-1 overflow-hidden"
            style={{ marginTop: "48px" }}>
            {/* Sidebar */}
            <Sidebar initialSelectedItem={selectedItem}>
               <SidebarItem
                  icon={<Home size={20} />}
                  text="Inicio"
                  onClick={() => handleSelect("Inicio")}
               />
               <SidebarItem
                  icon={<PackageSearch size={20} />}
                  text="Productos"
                  onClick={() => handleSelect("Productos")}
               />
               <SidebarItem
                  icon={<BadgeDollarSign size={20} />}
                  text="Ventas"
                  onClick={() => handleSelect("Ventas")}
               />
               <SidebarItem
                  icon={<Users size={20} />}
                  text="Usuarios"
                  onClick={() => handleSelect("Usuarios")}
               />
               <SidebarItem
                  icon={<ChartPie size={20} />}
                  text="Reportes"
                  onClick={() => handleSelect("Reportes")}
               />
               <hr className="my-3" />
               <SidebarItem
                  icon={<Settings size={20} />}
                  text="Configuración"
                  onClick={() => handleSelect("Configuracion")}
               />
            </Sidebar>

            {/* Contenido principal */}
            <div className="flex-1 overflow-auto bg-gray-100">
               {selectedItem === "Productos" ? (
                  <Productos /> // Componente para la opción "Productos"
               ) : selectedItem === "Ventas" ? (
                  <Ventas /> // Componente para la opción "Ventas"
               ) : selectedItem === "Usuarios" ? (
                  <Usuarios /> // Componente para la opción "Ventas"
               ) : (
                  <div>
                     <h2 className="text-2xl font-bold">
                        Seleccionado: {selectedItem}
                     </h2>
                     <p>
                        Contenido dinámico basado en la selección del menú
                        lateral.
                     </p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

export default App;
