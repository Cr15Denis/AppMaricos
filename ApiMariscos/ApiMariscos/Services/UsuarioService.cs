using ApiMariscos.IServices;
using ApiMariscos.Models;
using ApiMariscos.Utilities;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Data;
using System.Net.Http;
using System.Security.Claims;

namespace ApiMariscos.Services
{
    public class UsuarioService : IUsuarioService
    {

        private readonly DapperContext _context;

        public UsuarioService(DapperContext context)
        {
            _context = context;
        }       
        public async Task<Result<MessageClass>> CrearUsuarioAsync(CrearUsuario crearUsuario)
        {
            using var connection = _context.CreateConnection();

            var vendedor = new GuardarUsuario
            {
                Nombre = crearUsuario.Nombre,
                Apellido = crearUsuario.Apellido,
                Email = crearUsuario.Email,
                Contrasena = crearUsuario.contrasena,
                RolId = crearUsuario.RolId,
            };

            var parameters = new DynamicParameters();
            parameters.Add("@Nombre", vendedor.Nombre, DbType.String);
            parameters.Add("@Apellido", vendedor.Apellido, DbType.String);
            parameters.Add("@Email", vendedor.Email, DbType.String);
            parameters.Add("@contrasena", vendedor.Contrasena, DbType.String);
            parameters.Add("@Rol", vendedor.RolId, DbType.Int16);
            parameters.Add("@Evento", "CREARUSUARIO", DbType.String);
            parameters.Add("@Mensaje", dbType: DbType.String, direction: ParameterDirection.Output, size: 100);

            var rowsAffected = await connection.ExecuteAsync("SP_Usuario", parameters, commandType: CommandType.StoredProcedure);

            var message = parameters.Get<string>("Mensaje");

            if (!string.IsNullOrEmpty(message))
            {
               
                return Result<MessageClass>.FailureResult(message, 404);
            }            
            return Result<MessageClass>.SuccessResult(new MessageClass { Message = "Registro exitoso." }, 200);

        }       

        public async Task<Result<LeerUsuario>> LeerUsuarioAsync(int Id)
        {
            using var _connection = _context.CreateConnection();

            var parameters = new DynamicParameters();
            parameters.Add("@Id", Id, DbType.Int32);
            parameters.Add("@Evento", "LEERUSUARIO", DbType.String);


            var data = await _connection.QueryFirstOrDefaultAsync<LeerUsuario>("SP_Usuario", parameters, commandType: CommandType.StoredProcedure);

            if (data != null)
            {
                return Result<LeerUsuario>.SuccessResult(data, 200);
            }

            return Result<LeerUsuario>.FailureResult("No hay registros.", 204);                  
        }

        public async Task<Result<IEnumerable<LeerUsuario>>> LeerUsuariosAsync()
        {
            using var _connection = _context.CreateConnection();

            var parameters = new DynamicParameters();
            parameters.Add("@Evento", "LEERUSUARIOS", DbType.String);            


            var data = await _connection.QueryAsync<LeerUsuario>("SP_Usuario", parameters, commandType: CommandType.StoredProcedure);

            if (data.Any())
            {
                return Result<IEnumerable<LeerUsuario>>.SuccessResultIEnum(data, 200);
            }

            return Result<IEnumerable<LeerUsuario>>.FailureResultIEnum("No hay registros.", 204);
        }

        public async Task<Result<MessageClass>> EditarUsuarioAsync(EditarUsuario editarUsuario)
        {
            using var connection = _context.CreateConnection();
           
            var parameters = new DynamicParameters();
            parameters.Add("@Id", editarUsuario.Id, DbType.Int32);
            parameters.Add("@Nombre", editarUsuario.Nombre, DbType.String);
            parameters.Add("@Apellido", editarUsuario.Apellido, DbType.String);
            parameters.Add("@Email", editarUsuario.Email, DbType.String);
            parameters.Add("@Contrasena", editarUsuario.Contrasena);
            parameters.Add("@Rol", editarUsuario.RolId, DbType.Int16);
            parameters.Add("@IsActivo", editarUsuario.RolId, DbType.Boolean);
            parameters.Add("@Evento", "EDITARUSUARIO", DbType.String);
            parameters.Add("@Mensaje", dbType: DbType.String, direction: ParameterDirection.Output, size: 100);

            var rowsAffected = await connection.ExecuteAsync("SP_Usuario", parameters, commandType: CommandType.StoredProcedure);

            var message = parameters.Get<string>("Mensaje");

            if (!string.IsNullOrEmpty(message))
            {
                return Result<MessageClass>.FailureResult(message, 404);
            }

            return Result<MessageClass>.SuccessResult(new MessageClass { Message = "Actualización exitosa." }, 200);
        }

        public async Task<Result<IEnumerable<LeerRolUsuario>>> LeerRolesAsync()
        {
            using var _connection = _context.CreateConnection();

            var parameters = new DynamicParameters();
            parameters.Add("@Evento", "LEERROLES", DbType.String);


            var data = await _connection.QueryAsync<LeerRolUsuario>("SP_Usuario", parameters, commandType: CommandType.StoredProcedure);

            if (data.Any())
            {
                return Result<IEnumerable<LeerRolUsuario>>.SuccessResultIEnum(data, 200);
            }

            return Result<IEnumerable<LeerRolUsuario>>.FailureResultIEnum("No hay registros.", 204);
        }
    }
}
