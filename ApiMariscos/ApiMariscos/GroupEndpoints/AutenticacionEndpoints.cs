using ApiMariscos.IServices;
using ApiMariscos.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Reflection.Metadata;

namespace ApiMariscos.GroupEndpoints
{
    public static class AutenticacionEndpoints
    {

        public static void MapAutenticacionEndpoints(this IEndpointRouteBuilder app)
        {
            var todoItems = new List<TodoItem>()
            {
                new TodoItem { Id = 1, Name = "Learn .NET 8 Minimal APIs", IsComplete = true },
                new TodoItem { Id = 2, Name = "Build a Simple To-Do API", IsComplete = false }
            };
            //app.MapGet("/todos", () => Results.Ok(todoItems));
            app.MapPost("/sesion/usuario", [AllowAnonymous] async ([FromBody] Autenticacion autenticacionVendedor, IAutenticacionService autenticacionService) =>
            {

                var result = await autenticacionService.AutenticarUsuarioAsync(autenticacionVendedor);

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

    public class TodoItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
    }
}
