using ApiMariscos.Models;
using ApiMariscos.Utilities;

namespace ApiMariscos.IServices
{
    public interface IProductoService
    {
        Task<Result<MessageClass>> CrearProductoAsync(CrearProducto crearProducto);
        Task<Result<IEnumerable<LeerProducto>>> LeerProductosAsync();
        Task<Result<LeerProducto>> LeerProductoAsync(int Id);
        Task<Result<MessageClass>> EditarProductoAsync(EditarProducto editarProducto);
    }
}
