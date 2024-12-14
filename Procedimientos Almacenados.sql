
CREATE OR ALTER PROCEDURE [dbo].[SP_Usuario]
	 @Id Int = NULL,
	 @Nombre NVARCHAR(25) = NULL,
	 @Apellido NVARCHAR(20) = NULL
	,@Email VARCHAR(64) = NULL
	,@Evento varchar(25)
	,@contrasena VARCHAR(128) = NULL
	,@NuevaContrasena  VARCHAR(128) = NULL
	,@Rol SMALLINT = NULL
	,@IsActivo bit = null
	,@Mensaje nvarchar(100) = NULL OUTPUT 
AS
BEGIN

    IF (@Evento = 'LEERUSUARIOS')
    BEGIN
			SELECT  
			    U.UsuarioId AS Id,
				U.UsuarioNombre AS Nombre,
				U.UsuarioApellido AS Apellido,
				U.UsuarioEmail As Email,
				R.RolId AS RolId,
				R.RolNombre AS Rol,
				U.UsuarioIsActivo As IsActivo,
				U.UsuarioCreado AS Creado
			 FROM Usuarios As U 
			INNER JOIN Roles AS R
			ON U.RolId = R.RolId			
	  END

	IF (@Evento = 'CREARUSUARIO')
    BEGIN
		IF EXISTS(SELECT 1 FROM  Usuarios WHERE  UsuarioEmail = @Email)
        BEGIN
           
		    SET @Mensaje ='Error: El correo electrónico ya está en uso.'
            
        END
		ELSE
		BEGIN			
			 INSERT INTO Usuarios(UsuarioNombre, UsuarioApellido, UsuarioEmail, UsuarioContrasena, UsuarioIsActivo, UsuarioCreado, RolId) 
             VALUES (@Nombre, @Apellido, @Email, @contrasena, 1, DEFAULT, @Rol)
	     END
	END

	IF (@Evento = 'LEERUSUARIO')
    BEGIN
			SELECT TOP(1) 
			    U.UsuarioId AS Id,
				U.UsuarioNombre AS Nombre,
				U.UsuarioApellido AS Apellido,
				U.UsuarioEmail As Email,
				R.RolNombre AS Rol,
				U.UsuarioIsActivo As IsActivo,
				U.UsuarioCreado AS Creado
			 FROM Usuarios As U 
			INNER JOIN Roles AS R
			ON U.RolId = R.RolId WHERE U.UsuarioId = @Id			
	  END

    IF (@Evento = 'EDITARUSUARIO')
    BEGIN
			IF EXISTS(SELECT TOP(1) 1 FROM  Usuarios WHERE  UsuarioId = @Id)
            BEGIN
	            UPDATE Usuarios
				SET UsuarioNombre = @Nombre,
				UsuarioApellido = @Apellido,
				UsuarioEmail = @Email,
			    RolId = @Rol,
				UsuarioIsActivo = @IsActivo,	
				UsuarioActualizado = GETDATE()
				WHERE  UsuarioId = @Id			
		    END 
			ELSE
			BEGIN
				SET @Mensaje ='No se encontro ningun registro.'
			END     
	  END

	  IF (@Evento = 'LEERROLES')
    BEGIN
			SELECT
			RolId,
			RolNombre AS Rol
			FROM Roles		
	  END
END;
GO






CREATE OR ALTER PROCEDURE [dbo].[SP_Autenticacion]	 
	 @Email VARCHAR(64) 
	,@contrasena VARCHAR(128) = NULL
	,@Evento varchar(25)
	,@Mensaje nvarchar(100) OUTPUT
AS
BEGIN

	IF (@Evento = 'SESION')
    BEGIN
			SELECT TOP(1) 
				UsuarioEmail As Email,
				R.RolNombre AS Rol
			 FROM Usuarios As U 
			 INNER JOIN Roles AS R
			 ON U.RolId = R.RolId
			 WHERE UsuarioEmail = @Email AND UsuarioContrasena = @contrasena

			 IF (@@ROWCOUNT = 0)
			 BEGIN
				SET @Mensaje ='El Correo electrónico o contraseña es incorrecto.'
			 END
	  END	  

	  
END;
GO

--USE Db_Marisco; -- Reemplaza con el nombre de tu base de datos --EL PERMISO NO ES AL MASTER
--GRANT CONNECT, EXECUTE, SELECT, INSERT, UPDATE, DELETE TO usuario; -- Reemplaza con el nombre de tu usuario o rol


CREATE OR ALTER PROCEDURE [dbo].[SP_Producto]
	 @Id Int = NULL,
	 @Nombre Nvarchar(100) = NULL,
	 @Precio Decimal(10,2) = NULL,
	 @LibrasDisponibles Decimal(10,2) = NULL,
	 @Evento varchar(25),
	 @Mensaje nvarchar(100) = NULL OUTPUT 
AS
BEGIN

    IF (@Evento = 'LEERPRODUCTOS')
    BEGIN
			SELECT 
			ProductoID AS Id,
			Nombre,
			PrecioPorLibra AS PrecioLibra,
			LibrasDisponibles AS LibrasDisponibles			
			FROM Productos
	  END

	IF (@Evento = 'CREARPRODUCTO')
    BEGIN
		
			  INSERT INTO Productos(Nombre, PrecioPorLibra, LibrasDisponibles) VALUES (@Nombre, @Precio, @LibrasDisponibles);
	END

	IF (@Evento = 'LEERPRODUCTO')
    BEGIN
		SELECT 
			ProductoID AS Id,
			Nombre,
			PrecioPorLibra AS PrecioLibra,
			LibrasDisponibles AS LibrasDisponibles			
			FROM Productos WHERE ProductoID = @Id
	END

    IF (@Evento = 'EDITARPRODUCTO')
    BEGIN
			IF EXISTS(SELECT TOP(1) 1 FROM  Productos WHERE  ProductoID = @Id)
            BEGIN
	            UPDATE Productos
				SET Nombre = @Nombre,
				PrecioPorLibra = @Precio,
				LibrasDisponibles = @LibrasDisponibles				
				WHERE  ProductoID = @Id			
		    END 
			ELSE
			BEGIN
				SET @Mensaje ='No se encontro ningun registro.'
			END     
	END

END;
GO

CREATE PROCEDURE SP_InsertarCliente
    @ClienteNombre NVARCHAR(50),
    @ClienteId INT OUTPUT
AS
BEGIN
    INSERT INTO Clientes (ClienteNombre)
    VALUES (@ClienteNombre);

    SET @ClienteId = SCOPE_IDENTITY();
END;
go

CREATE PROCEDURE SP_InsertarVenta
    @TipoVenta NVARCHAR(50),
    @TotalVenta DECIMAL(10, 2),
    @UsuarioId INT,
    @ClienteId INT,
    @VentaID INT OUTPUT
AS
BEGIN
    INSERT INTO Ventas (TipoVenta, TotalVenta, UsuarioId, ClienteId)
    VALUES (@TipoVenta, @TotalVenta, @UsuarioId, @ClienteId);

    SET @VentaID = SCOPE_IDENTITY();
END;
GO

CREATE PROCEDURE SP_InsertarDetalleVenta
    @VentaID INT,
    @ProductoID INT,
    @PrecioPorLibra DECIMAL(10, 2),
    @CantidadLibras DECIMAL(10, 2),
    @Subtotal DECIMAL(10, 2)
AS
BEGIN
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Insertar detalle de la venta
        INSERT INTO DetalleVentas (VentaID, ProductoID, PrecioPorLibra, CantidadLibras, Subtotal)
        VALUES (@VentaID, @ProductoID, @PrecioPorLibra, @CantidadLibras, @Subtotal);

        -- Descontar libras del producto
        UPDATE Productos
        SET LibrasDisponibles = LibrasDisponibles - @CantidadLibras
        WHERE ProductoID = @ProductoID;

        -- Validar que no haya libras negativas
        IF (SELECT LibrasDisponibles FROM Productos WHERE ProductoID = @ProductoID) < 0
        BEGIN
            THROW 50001, 'No hay suficientes libras disponibles para el producto.', 1
        END

        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION
        THROW
    END CATCH
END
GO

INSERT INTO Roles(RolNombre) VALUES ('Administrador')
INSERT INTO Roles(RolNombre) VALUES ('Vendedor')