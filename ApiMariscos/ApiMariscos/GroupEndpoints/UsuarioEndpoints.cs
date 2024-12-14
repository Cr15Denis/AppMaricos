using ApiMariscos.IServices;
using ApiMariscos.Models;
using ApiMariscos.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiMariscos.GroupEndpoints
{
    public static class UsuarioEndpoints
    {
        public static void MapUsuarioEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapPost("/crear/usuario", [AllowAnonymous] async ([FromBody] CrearUsuario crearUsuario, IUsuarioService usuarioService) =>
            {

                var result = await usuarioService.CrearUsuarioAsync(crearUsuario);

                if (result.Success)
                {
                    return Results.Ok(result.Data);
                }
                else
                {                    
                    return Results.NotFound(new { Mensaje = result.ErrorMessage });
                }
            })
            .Validate<CrearUsuario>();

            app.MapGet("/leer/usuarios", [AllowAnonymous] async (IUsuarioService usuarioService) =>
            {

                var result = await usuarioService.LeerUsuariosAsync();

                if (result.Success)
                {
                    return Results.Ok(result.Data);
                }
                else
                {
                    return Results.NoContent();
                }
            });

            app.MapGet("/leer/usuario/{Id}", [AllowAnonymous] async ([FromRoute] int Id, IUsuarioService usuarioService) =>
            {

                var result = await usuarioService.LeerUsuarioAsync(Id);

                
               return Results.Ok(result.Data);
                
                
            });

            app.MapPut("/editar/usuario", [AllowAnonymous] async ([FromBody] EditarUsuario editarUsuario, IUsuarioService usuarioService) =>
            {

                var result = await usuarioService.EditarUsuarioAsync(editarUsuario);

                if (result.Success)
                {
                    return Results.Ok(result.Data);
                }
                else
                {
                    return Results.NotFound(new { Mensaje = result.ErrorMessage });
                }
            });

            app.MapGet("/leer/usuario/roles", [AllowAnonymous] async (IUsuarioService usuarioService) =>
            {

                var result = await usuarioService.LeerRolesAsync();

                if (result.Success)
                {
                    return Results.Ok(result.Data);
                }
                else
                {
                    return Results.NoContent();
                }
            });

        }
    }
}
