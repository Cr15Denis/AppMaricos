using ApiMariscos.Models;
using ApiMariscos.Utilities;

namespace ApiMariscos.IServices
{
    public interface IAutenticacionService
    {
        //Task<Result<MessageClass>> CrearVendedorAsync(Autenticacion autenticacion);
        Task<Result<TokenClass>> AutenticarUsuarioAsync(Autenticacion autenticacionVendedor);
    }
}
