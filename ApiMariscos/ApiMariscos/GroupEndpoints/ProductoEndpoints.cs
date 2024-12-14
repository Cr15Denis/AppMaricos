using ApiMariscos.IServices;
using ApiMariscos.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiMariscos.GroupEndpoints
{
    public static class ProductoEndpoints
    {
        public static void MapProductoEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapPost("/crear/producto", [AllowAnonymous] async ([FromBody] CrearProducto crearProducto, IProductoService productoService) =>
            {

                var result = await productoService.CrearProductoAsync(crearProducto);

                if (result.Success)
                {
                    return Results.Ok(result.Data);
                }
                else
                {
                    return Results.NotFound(new { Mensaje = result.ErrorMessage });
                }
            });

            app.MapGet("/leer/productos", [AllowAnonymous] async (IProductoService productoService) =>
            {

                var result = await productoService.LeerProductosAsync();

                if (result.Success)
                {
                    return Results.Ok(result.Data);
                }
                else
                {
                    return Results.NoContent();
                }
            });

            app.MapGet("/leer/producto/{Id}", [AllowAnonymous] async ([FromRoute] int Id, IProductoService productoService) =>
            {

                var result = await productoService.LeerProductoAsync(Id);


                return Results.Ok(result.Data);


            });

            app.MapPut("/editar/producto", [AllowAnonymous] async ([FromBody] EditarProducto editarProducto, IProductoService productoService) =>
            {

                var result = await productoService.EditarProductoAsync(editarProducto);

                if (result.Success)
                {
                    return Results.Ok(result.Data);
                }
                else
                {
                    return Results.NotFound(new { Mensaje = result.ErrorMessage });
                }
            });
        }
     }
}
