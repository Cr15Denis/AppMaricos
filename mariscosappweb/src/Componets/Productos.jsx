import React, { useState, useEffect } from "react";
import {
   Button,
   Modal,
   Box,
   TextField,
   Typography,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
} from "@mui/material";

export default function ProductManager() {
   const [products, setProducts] = useState([]); // Productos obtenidos desde la API
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
   const [currentProduct, setCurrentProduct] = useState({
      id: "",
      nombre: "",
      precioLibra: "",
      librasDisponibles: "",
   });
   const [newProduct, setNewProduct] = useState({
      nombre: "",
      precioLibra: "",
      librasDisponibles: "",
   });

   // Obtener la lista de productos al cargar el componente
   useEffect(() => {
      fetchProducts();
   }, []);

   const fetchProducts = async () => {
      try {
         const response = await fetch("https://localhost:7282/leer/productos");
         if (response.ok) {
            const data = await response.json();
            setProducts(data);
         } else {
            console.error("Error al obtener los productos");
         }
      } catch (error) {
         console.error("Error:", error);
      }
   };

   // Manejar cambios en los formularios
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCurrentProduct((prev) => ({ ...prev, [name]: value }));
   };

   const handleNewProductChange = (e) => {
      const { name, value } = e.target;
      setNewProduct((prev) => ({ ...prev, [name]: value }));
   };

   // Obtener producto para editar
   const handleEdit = async (product) => {
      try {
         const response = await fetch(
            `https://localhost:7282/leer/producto/${product.id}`
         );
         if (response.ok) {
            const data = await response.json();
            setCurrentProduct({
               id: data.id,
               nombre: data.nombre,
               precioLibra: data.precioLibra,
               librasDisponibles: data.librasDisponibles,
            });
            setIsEditModalOpen(true);
         } else {
            console.error("Error al obtener el producto");
         }
      } catch (error) {
         console.error("Error:", error);
      }
   };

   // Guardar cambios en el producto editado
   const handleSaveEdit = async () => {
      try {
         const response = await fetch(
            "https://localhost:7282/editar/producto",
            {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(currentProduct),
            }
         );
         if (response.ok) {
            await fetchProducts(); // Actualizar la tabla
            setIsEditModalOpen(false); // Cerrar el modal
         } else {
            console.error("Error al guardar los cambios");
         }
      } catch (error) {
         console.error("Error:", error);
      }
   };

   // Crear producto
   const handleCreateProduct = async () => {
      try {
         const response = await fetch("https://localhost:7282/crear/producto", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
         });
         if (response.ok) {
            await fetchProducts(); // Actualizar la tabla
            setNewProduct({
               nombre: "",
               precioLibra: "",
               librasDisponibles: "",
            });
            setIsCreateModalOpen(false); // Cerrar el modal
         } else {
            console.error("Error al crear el producto");
         }
      } catch (error) {
         console.error("Error:", error);
      }
   };

   return (
      <div
         style={{
            backgroundColor: "white",
            margin: "20px",
            padding: "20px",
            borderRadius: "8px",
         }}>
         <Typography variant="h4" gutterBottom>
            Gestión de Productos
         </Typography>
         <Button
            variant="contained"
            onClick={() => setIsCreateModalOpen(true)}
            style={{
               backgroundColor: "#FF0000",
               marginBottom: "16px",
               color: "white",
            }}>
            Crear Producto
         </Button>

         {/* Tabla de productos */}
         <Table>
            <TableHead>
               <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Precio por Libra</TableCell>
                  <TableCell>Libras Disponibles</TableCell>
                  <TableCell>Acciones</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {products.map((product) => (
                  <TableRow key={product.id}>
                     <TableCell>{product.id}</TableCell>
                     <TableCell>{product.nombre}</TableCell>
                     <TableCell>Q{product.precioLibra.toFixed(2)}</TableCell>
                     <TableCell>{product.librasDisponibles} lbs</TableCell>
                     <TableCell>
                        <Button
                           variant="outlined"
                           onClick={() => handleEdit(product)}
                           style={{ color: "#FF0000", borderColor: "#FF0000" }}>
                           Editar
                        </Button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>

         {/* Modal de edición */}
         <Modal
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}>
            <Box
               sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
               }}>
               <Typography variant="h6" gutterBottom>
                  Editar Producto
               </Typography>
               <TextField
                  label="ID"
                  fullWidth
                  name="id"
                  value={currentProduct?.id || ""}
                  disabled
                  sx={{ mb: 2 }}
               />
               <TextField
                  label="Nombre"
                  fullWidth
                  name="nombre"
                  value={currentProduct?.nombre || ""}
                  onChange={handleInputChange}
                  sx={{
                     mb: 2,
                     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                           borderColor: "red",
                        },
                     "& .MuiInputLabel-root.Mui-focused": {
                        color: "red",
                     },
                  }}
               />
               <TextField
                  label="Precio por Libra"
                  fullWidth
                  name="precioLibra"
                  type="number"
                  value={currentProduct?.precioLibra || ""}
                  onChange={handleInputChange}
                  sx={{
                     mb: 2,
                     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                           borderColor: "red",
                        },
                     "& .MuiInputLabel-root.Mui-focused": {
                        color: "red",
                     },
                  }}
               />
               <TextField
                  label="Libras Disponibles"
                  fullWidth
                  name="librasDisponibles"
                  type="number"
                  value={currentProduct?.librasDisponibles || ""}
                  onChange={handleInputChange}
                  sx={{
                     mb: 2,
                     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                           borderColor: "red",
                        },
                     "& .MuiInputLabel-root.Mui-focused": {
                        color: "red",
                     },
                  }}
               />
               <Button
                  variant="contained"
                  onClick={handleSaveEdit}
                  fullWidth
                  style={{ backgroundColor: "#FF0000", color: "white" }}>
                  Guardar Cambios
               </Button>
            </Box>
         </Modal>

         {/* Modal de creación */}
         <Modal
            open={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}>
            <Box
               sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
               }}>
               <Typography variant="h6" gutterBottom>
                  Crear Producto
               </Typography>
               <TextField
                  label="Nombre"
                  fullWidth
                  name="nombre"
                  value={newProduct.nombre}
                  onChange={handleNewProductChange}
                  sx={{
                     mb: 2,
                     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                           borderColor: "red",
                        },
                     "& .MuiInputLabel-root.Mui-focused": {
                        color: "red",
                     },
                  }}
               />
               <TextField
                  label="Precio por Libra"
                  fullWidth
                  name="precioLibra"
                  type="number"
                  value={newProduct.precioLibra}
                  onChange={handleNewProductChange}
                  sx={{
                     mb: 2,
                     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                           borderColor: "red",
                        },
                     "& .MuiInputLabel-root.Mui-focused": {
                        color: "red",
                     },
                  }}
               />
               <TextField
                  label="Libras Disponibles"
                  fullWidth
                  name="librasDisponibles"
                  type="number"
                  value={newProduct.librasDisponibles}
                  onChange={handleNewProductChange}
                  sx={{
                     mb: 2,
                     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                           borderColor: "red",
                        },
                     "& .MuiInputLabel-root.Mui-focused": {
                        color: "red",
                     },
                  }}
               />
               <Button
                  variant="contained"
                  onClick={handleCreateProduct}
                  fullWidth
                  style={{ backgroundColor: "#FF0000", color: "white" }}>
                  Crear Producto
               </Button>
            </Box>
         </Modal>
      </div>
   );
}
