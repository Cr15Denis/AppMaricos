using ApiMariscos.IServices;
using ApiMariscos.Models;
using ApiMariscos.Utilities;
using Dapper;
using System.Data;

namespace ApiMariscos.Services
{
    public class ProductoService : IProductoService
    {

        private readonly DapperContext _context;

        public ProductoService(DapperContext context)
        {
            _context = context;
        }

        public async Task<Result<MessageClass>> CrearProductoAsync(CrearProducto crearProducto)
        {
            using var connection = _context.CreateConnection();
            
            var parameters = new DynamicParameters();
            parameters.Add("@Nombre", crearProducto.Nombre, DbType.String);
            parameters.Add("@Precio", crearProducto.PrecioLibra, DbType.Decimal);
            parameters.Add("@LibrasDisponibles", crearProducto.LibrasDisponibles, DbType.Decimal);           
            parameters.Add("@Evento", "CREARPRODUCTO", DbType.String);
            parameters.Add("@Mensaje", dbType: DbType.String, direction: ParameterDirection.Output, size: 100);

            var rowsAffected = await connection.ExecuteAsync("SP_Producto", parameters, commandType: CommandType.StoredProcedure);

            var message = parameters.Get<string>("Mensaje");

            if (!string.IsNullOrEmpty(message))
            {

                return Result<MessageClass>.FailureResult(message, 404);
            }
            return Result<MessageClass>.SuccessResult(new MessageClass { Message = "Registro exitoso." }, 200);
        }

        public async Task<Result<IEnumerable<LeerProducto>>> LeerProductosAsync()
        {
            using var _connection = _context.CreateConnection();

            var parameters = new DynamicParameters();
            parameters.Add("@Evento", "LEERPRODUCTOS", DbType.String);


            var data = await _connection.QueryAsync<LeerProducto>("SP_Producto", parameters, commandType: CommandType.StoredProcedure);

            if (data.Any())
            {
                return Result<IEnumerable<LeerProducto>>.SuccessResultIEnum(data, 200);
            }

            return Result<IEnumerable<LeerProducto>>.FailureResultIEnum("No hay registros.", 204);
        }

        public async Task<Result<LeerProducto>> LeerProductoAsync(int Id)
        {
            using var _connection = _context.CreateConnection();

            var parameters = new DynamicParameters();
            parameters.Add("@Id", Id, DbType.Int32);
            parameters.Add("@Evento", "LEERPRODUCTO", DbType.String);


            var data = await _connection.QueryFirstOrDefaultAsync<LeerProducto>("SP_Producto", parameters, commandType: CommandType.StoredProcedure);

            if (data != null)
            {
                return Result<LeerProducto>.SuccessResult(data, 200);
            }

            return Result<LeerProducto>.FailureResult("No hay registros.", 204);
        }

        public async Task<Result<MessageClass>> EditarProductoAsync(EditarProducto editarProducto)
        {
            using var connection = _context.CreateConnection();

            var parameters = new DynamicParameters();
            parameters.Add("@Id", editarProducto.Id, DbType.Int32);
            parameters.Add("@Nombre", editarProducto.Nombre, DbType.String);
            parameters.Add("@Precio", editarProducto.PrecioLibra, DbType.Decimal);
            parameters.Add("@LibrasDisponibles", editarProducto.LibrasDisponibles, DbType.Decimal);
            parameters.Add("@Evento", "EDITARPRODUCTO", DbType.String);
            parameters.Add("@Mensaje", dbType: DbType.String, direction: ParameterDirection.Output, size: 100);

            var rowsAffected = await connection.ExecuteAsync("SP_Producto", parameters, commandType: CommandType.StoredProcedure);

            var message = parameters.Get<string>("Mensaje");

            if (!string.IsNullOrEmpty(message))
            {
                return Result<MessageClass>.FailureResult(message, 404);
            }

            return Result<MessageClass>.SuccessResult(new MessageClass { Message = "Actualización exitosa." }, 200);
        }

    }
}
