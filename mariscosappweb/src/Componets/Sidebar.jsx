import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import logo from "../assets/logomarisco.jpg";
import profile from "../assets/logomarisco.jpg";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children, initialSelectedItem }) {
   const [expanded, setExpanded] = useState(true);
   const [selectedItem, setSelectedItem] = useState(initialSelectedItem); // Usamos el valor inicial

   const handleSelect = (item) => {
      setSelectedItem(item); // Actualiza el ítem seleccionado
   };

   return (
      <aside className="flex flex-col bg-white border-r shadow-sm">
         <nav className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 pb-2 flex justify-between items-center">
               <img
                  src={logo}
                  className={`overflow-hidden transition-all ${
                     expanded ? "w-32" : "w-0"
                  }`}
               />
               <button
                  onClick={() => setExpanded((curr) => !curr)}
                  className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                  {expanded ? <ChevronFirst /> : <ChevronLast />}
               </button>
            </div>

            <SidebarContext.Provider
               value={{
                  expanded,
                  selectedItem,
                  handleSelect, // Pasamos la función de selección
               }}>
               <ul className="flex-1 px-3 overflow-auto">{children}</ul>
            </SidebarContext.Provider>

            <div className="border-t flex p-3">
               <img src={profile} className="w-10 h-10 rounded-md" />
               <div
                  className={`flex justify-between items-center overflow-hidden transition-all ${
                     expanded ? "w-52 ml-3" : "w-0"
                  } `}>
                  <div className="leading-4">
                     {/* <h4 className="font-semibold">constGenius</h4>
                     <span className="text-xs text-gray-600">
                        constgenius@gmail.com
                     </span> */}
                  </div>
                  <MoreVertical size={20} />
               </div>
            </div>
         </nav>
      </aside>
   );
}

export function SidebarItem({ icon, text, onClick }) {
   const { expanded, selectedItem, handleSelect } = useContext(SidebarContext);

   return (
      <li
         onClick={() => {
            handleSelect(text); // Actualiza el estado del Sidebar
            if (onClick) onClick(text); // Llama al onClick pasado desde el App
         }}
         className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
            selectedItem === text
               ? "bg-gradient-to-tr from-red-200 to-red-100 text-red-800"
               : "hover:bg-red-50 text-gray-600"
         }`}>
         {icon}
         <span
            className={`overflow-hidden transition-all ${
               expanded ? "w-52 ml-3" : "w-0"
            }`}>
            {text}
         </span>
      </li>
   );
}
