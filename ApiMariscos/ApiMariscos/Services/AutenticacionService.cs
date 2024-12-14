using ApiMariscos.IServices;
using ApiMariscos.Models;
using ApiMariscos.Utilities;
using Dapper;
using System.Data;

namespace ApiMariscos.Services
{
    public class AutenticacionService : IAutenticacionService
    {

        private readonly DapperContext _context;
        private readonly IJwtTokenService _jwtTokenService;
        public AutenticacionService(DapperContext context, IJwtTokenService jwtTokenService)
        {
            _context = context;
            _jwtTokenService = jwtTokenService;
        }

        

        public async Task<Result<TokenClass>> AutenticarUsuarioAsync(Autenticacion usuario)
        {
            using var connection = _context.CreateConnection();

            var parameters = new DynamicParameters();
            parameters.Add("@Email", usuario.Email, DbType.String);
            parameters.Add("@contrasena", usuario.Contrasena, DbType.String);
            parameters.Add("@Evento", "SESION", DbType.String);
            parameters.Add("@Mensaje", dbType: DbType.String, direction: ParameterDirection.Output, size: 100);


            var reader = await connection.QueryAsync<UsuarioDatos>("SP_Autenticacion", parameters, commandType: CommandType.StoredProcedure);

            
            var message = parameters.Get<string>("Mensaje");

            if (!string.IsNullOrEmpty(message))
            {
                return Result<TokenClass>.FailureResult(message, 404);
            }         

            var Creartoken = _jwtTokenService.GenerateJWToken(reader.FirstOrDefault()!.Email, reader.FirstOrDefault()!.Rol.ToLower(), DateTime.UtcNow.AddDays(2));

            return Result<TokenClass>.SuccessResult(new TokenClass { Token = Creartoken }, 200);
        }
    }
}
