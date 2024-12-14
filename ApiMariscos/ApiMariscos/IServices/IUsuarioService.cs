using ApiMariscos.Models;
using ApiMariscos.Utilities;

namespace ApiMariscos.IServices
{
    public interface IUsuarioService
    {
        Task<Result<MessageClass>> CrearUsuarioAsync(CrearUsuario crearUsuario);

        Task<Result<IEnumerable<LeerUsuario>>> LeerUsuariosAsync();        

        Task<Result<LeerUsuario>> LeerUsuarioAsync(int Id);

        Task<Result<MessageClass>> EditarUsuarioAsync(EditarUsuario editarUsuario);

        Task<Result<IEnumerable<LeerRolUsuario>>> LeerRolesAsync();
    }
}
