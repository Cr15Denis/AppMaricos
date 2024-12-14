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
   Switch,
   MenuItem,
   Select,
   InputLabel,
   FormControl,
} from "@mui/material";

export default function Usuarios() {
   const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
   const [roles, setRoles] = useState([]); // Lista de roles para el dropdown
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
   const [currentUsuario, setCurrentUsuario] = useState({
      id: "",
      nombre: "",
      apellido: "",
      email: "",
      contrasena: "",
      rolId: "",
      isActivo: false,
   });
   const [newUsuario, setNewUsuario] = useState({
      nombre: "",
      apellido: "",
      email: "",
      confirmarEmail: "",
      contrasena: "",
      confirmarContrasena: "",
   });

   // Obtener usuarios y roles al cargar el componente
   useEffect(() => {
      fetchUsuarios();
      fetchRoles();
   }, []);

   const fetchUsuarios = async () => {
      try {
         const response = await fetch("https://localhost:7282/leer/usuarios");
         if (response.ok) {
            const data = await response.json();
            setUsuarios(data);
         } else {
            console.error("Error al obtener los usuarios");
         }
      } catch (error) {
         console.error("Error:", error);
      }
   };

   const fetchRoles = async () => {
      try {
         const response = await fetch(
            "https://localhost:7282/leer/usuario/roles"
         );
         if (response.ok) {
            const data = await response.json();
            setRoles(data);
         } else {
            console.error("Error al obtener los roles");
         }
      } catch (error) {
         console.error("Error:", error);
      }
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCurrentUsuario((prev) => ({ ...prev, [name]: value }));
   };

   const handleNewUsuarioChange = (e) => {
      const { name, value } = e.target;
      setNewUsuario((prev) => ({ ...prev, [name]: value }));
   };

   const handleEdit = (usuario) => {
      setCurrentUsuario({
         id: usuario.id,
         nombre: usuario.nombre,
         apellido: usuario.apellido,
         email: usuario.email,
         contrasena: "",
         rolId: usuario.rolId,
         isActivo: usuario.isActivo,
      });
      setIsEditModalOpen(true);
   };

   const handleSaveEdit = async () => {
      try {
         const response = await fetch("https://localhost:7282/editar/usuario", {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(currentUsuario),
         });
         if (response.ok) {
            await fetchUsuarios(); // Actualizar la tabla
            setIsEditModalOpen(false); // Cerrar el modal
         } else {
            console.error("Error al guardar los cambios");
         }
      } catch (error) {
         console.error("Error:", error);
      }
   };

   const handleCreateUsuario = async () => {
      try {
         const response = await fetch("https://localhost:7282/crear/usuario", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(newUsuario),
         });
         if (response.ok) {
            await fetchUsuarios(); // Actualizar la tabla
            setNewUsuario({
               nombre: "",
               apellido: "",
               email: "",
               confirmarEmail: "",
               contrasena: "",
               confirmarContrasena: "",
            });
            setIsCreateModalOpen(false); // Cerrar el modal
         } else {
            console.error("Error al crear el usuario");
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
            Gestión de Usuarios
         </Typography>
         <Button
            variant="contained"
            onClick={() => setIsCreateModalOpen(true)}
            style={{
               backgroundColor: "#FF0000",
               marginBottom: "16px",
               color: "white",
            }}>
            Crear Usuario
         </Button>

         {/* Tabla de usuarios */}
         <Table>
            <TableHead>
               <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Activo</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Acciones</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                     <TableCell>{usuario.id}</TableCell>
                     <TableCell>{usuario.nombre}</TableCell>
                     <TableCell>{usuario.apellido}</TableCell>
                     <TableCell>{usuario.email}</TableCell>
                     <TableCell>
                        <div
                           style={{
                              width: "12px",
                              height: "12px",
                              borderRadius: "50%",
                              backgroundColor: usuario.isActivo
                                 ? "green"
                                 : "red",
                           }}
                        />
                     </TableCell>
                     <TableCell>{usuario.rol}</TableCell>
                     <TableCell>
                        <Button
                           variant="outlined"
                           onClick={() => handleEdit(usuario)}
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
                  Editar Usuario
               </Typography>
               <TextField
                  label="ID"
                  fullWidth
                  name="id"
                  value={currentUsuario?.id || ""}
                  disabled
                  sx={{ mb: 2 }}
               />
               <TextField
                  label="Nombre"
                  fullWidth
                  name="nombre"
                  value={currentUsuario?.nombre || ""}
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
                  label="Apellido"
                  fullWidth
                  name="apellido"
                  value={currentUsuario?.apellido || ""}
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
                  label="Email"
                  fullWidth
                  name="email"
                  value={currentUsuario?.email || ""}
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
               <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="rol-label">Rol</InputLabel>
                  <Select
                     labelId="rol-label"
                     name="rolId"
                     value={currentUsuario.rolId}
                     onChange={handleInputChange}>
                     {roles.map((rol) => (
                        <MenuItem key={rol.rolId} value={rol.rolId}>
                           {rol.rol}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
               <FormControl
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography variant="body1" style={{ marginRight: "8px" }}>
                     Activo:
                  </Typography>
                  <Switch
                     checked={currentUsuario.isActivo}
                     onChange={(e) =>
                        setCurrentUsuario((prev) => ({
                           ...prev,
                           isActivo: e.target.checked,
                        }))
                     }
                  />
               </FormControl>
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
                  Crear Usuario
               </Typography>
               <TextField
                  label="Nombre"
                  fullWidth
                  name="nombre"
                  value={newUsuario.nombre}
                  onChange={handleNewUsuarioChange}
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
                  label="Apellido"
                  fullWidth
                  name="apellido"
                  value={newUsuario.apellido}
                  onChange={handleNewUsuarioChange}
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
                  label="Email"
                  fullWidth
                  name="email"
                  value={newUsuario.email}
                  onChange={handleNewUsuarioChange}
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
                  label="Confirmar Email"
                  fullWidth
                  name="confirmarEmail"
                  value={newUsuario.confirmarEmail}
                  onChange={handleNewUsuarioChange}
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
                  label="Contraseña"
                  fullWidth
                  name="contrasena"
                  type="password"
                  value={newUsuario.contrasena}
                  onChange={handleNewUsuarioChange}
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
                  label="Confirmar Contraseña"
                  fullWidth
                  name="confirmarContrasena"
                  type="password"
                  value={newUsuario.confirmarContrasena}
                  onChange={handleNewUsuarioChange}
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
               <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel
                     id="rol-label"
                     sx={{
                        "&.Mui-focused": { color: "red" },
                     }}>
                     Rol
                  </InputLabel>
                  <Select
                     labelId="rol-label"
                     name="rolId"
                     value={newUsuario.rolId}
                     onChange={handleNewUsuarioChange}
                     sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                           {
                              borderColor: "red",
                           },
                     }}>
                     {roles.map((rol) => (
                        <MenuItem key={rol.rolId} value={rol.rolId}>
                           {rol.rol}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
               <Button
                  variant="contained"
                  onClick={handleCreateUsuario}
                  fullWidth
                  style={{ backgroundColor: "#FF0000", color: "white" }}>
                  Crear Usuario
               </Button>
            </Box>
         </Modal>
      </div>
   );
}
