-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-12-14 01:41:49.179

-- tables
-- Table: AlertasInventario
CREATE TABLE AlertasInventario (
    AlertaID int  NOT NULL IDENTITY(1, 1),
    ProductoID int  NULL,
    Fecha date  NOT NULL DEFAULT getdate(),
    Mensaje nvarchar(255)  NOT NULL,
    CONSTRAINT AlertasInventario_pk PRIMARY KEY  (AlertaID)
);

-- Table: Clientes
CREATE TABLE Clientes (
    ClienteId int  NOT NULL IDENTITY(1, 1),
    ClienteNombre varchar(50)  NOT NULL,
    CONSTRAINT Clientes_pk PRIMARY KEY  (ClienteId)
);

-- Table: Combos
CREATE TABLE Combos (
    ComboID int  NOT NULL IDENTITY(1, 1),
    Nombre nvarchar(100)  NOT NULL,
    Precio decimal(10,2)  NOT NULL,
    CONSTRAINT Combos_pk PRIMARY KEY  (ComboID)
);

-- Table: DetalleCombo
CREATE TABLE DetalleCombo (
    DetalleComboID int  NOT NULL IDENTITY(1, 1),
    ComboID int  NULL,
    ProductoID int  NULL,
    CantidadLibras decimal(10,2)  NOT NULL,
    CONSTRAINT DetalleCombo_pk PRIMARY KEY  (DetalleComboID)
);

-- Table: DetalleVentas
CREATE TABLE DetalleVentas (
    DetalleID int  NOT NULL IDENTITY(1, 1),
    VentaID int  NULL,
    ProductoID int  NULL,
    PrecioPorLibra decimal(10,2)  NOT NULL,
    CantidadLibras decimal(10,2)  NULL,
    Subtotal decimal(10,2)  NOT NULL,
    CONSTRAINT DetalleVentas_pk PRIMARY KEY  (DetalleID)
);

-- Table: Productos
CREATE TABLE Productos (
    ProductoID int  NOT NULL IDENTITY(1, 1),
    Nombre nvarchar(100)  NOT NULL,
    PrecioPorLibra decimal(10,2)  NOT NULL,
    LibrasDisponibles decimal(10,2)  NOT NULL,
    CONSTRAINT Productos_pk PRIMARY KEY  (ProductoID)
);

-- Table: Roles
CREATE TABLE Roles (
    RolId smallint  NOT NULL IDENTITY(1, 1),
    RolNombre varchar(25)  NOT NULL,
    CONSTRAINT Roles_pk PRIMARY KEY  (RolId)
);

-- Table: Usuarios
CREATE TABLE Usuarios (
    UsuarioId int  NOT NULL IDENTITY(1, 1),
    UsuarioNombre varchar(25)  NOT NULL,
    UsuarioApellido varchar(20)  NOT NULL,
    UsuarioEmail varchar(64)  NOT NULL,
    UsuarioContrasena varchar(128)  NOT NULL,
    UsuarioIsActivo bit  NOT NULL,
    UsuarioCreado date  NOT NULL DEFAULT GETDATE(),
    UsuarioActualizado datetime  NULL,
    RolId smallint  NOT NULL,
    CONSTRAINT UQ_VendedorEmail UNIQUE (UsuarioEmail),
    CONSTRAINT Usuarios_pk PRIMARY KEY  (UsuarioId)
);

-- Table: Ventas
CREATE TABLE Ventas (
    VentaID int  NOT NULL IDENTITY(1, 1),
    Fecha date  NOT NULL DEFAULT getdate(),
    TipoVenta nvarchar(50)  NOT NULL,
    TotalVenta decimal(10,2)  NOT NULL,
    UsuarioId int  NOT NULL,
    ClienteId int  NOT NULL,
    CONSTRAINT Ventas_pk PRIMARY KEY  (VentaID)
);

-- foreign keys
-- Reference: FK_CLIENTES_VENTAS (table: Ventas)
ALTER TABLE Ventas ADD CONSTRAINT FK_CLIENTES_VENTAS
    FOREIGN KEY (ClienteId)
    REFERENCES Clientes (ClienteId);

-- Reference: FK_Combos_DetalleCombo (table: DetalleCombo)
ALTER TABLE DetalleCombo ADD CONSTRAINT FK_Combos_DetalleCombo
    FOREIGN KEY (ComboID)
    REFERENCES Combos (ComboID);

-- Reference: FK_Producto_DetalleCombo (table: DetalleCombo)
ALTER TABLE DetalleCombo ADD CONSTRAINT FK_Producto_DetalleCombo
    FOREIGN KEY (ProductoID)
    REFERENCES Productos (ProductoID);

-- Reference: FK_Productos_AlertasInventario (table: AlertasInventario)
ALTER TABLE AlertasInventario ADD CONSTRAINT FK_Productos_AlertasInventario
    FOREIGN KEY (ProductoID)
    REFERENCES Productos (ProductoID);

-- Reference: FK_Productos_DetalleVentas (table: DetalleVentas)
ALTER TABLE DetalleVentas ADD CONSTRAINT FK_Productos_DetalleVentas
    FOREIGN KEY (ProductoID)
    REFERENCES Productos (ProductoID);

-- Reference: FK_Roles_Empleados (table: Usuarios)
ALTER TABLE Usuarios ADD CONSTRAINT FK_Roles_Empleados
    FOREIGN KEY (RolId)
    REFERENCES Roles (RolId);

-- Reference: FK_Usuarios_Ventas (table: Ventas)
ALTER TABLE Ventas ADD CONSTRAINT FK_Usuarios_Ventas
    FOREIGN KEY (UsuarioId)
    REFERENCES Usuarios (UsuarioId);

-- Reference: FK_Ventas_DetalleVentas (table: DetalleVentas)
ALTER TABLE DetalleVentas ADD CONSTRAINT FK_Ventas_DetalleVentas
    FOREIGN KEY (VentaID)
    REFERENCES Ventas (VentaID);

-- End of file.

