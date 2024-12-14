using Microsoft.AspNetCore.Http.Metadata;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace ApiMariscos.Utilities
{
    public static class EndpointValidationExtensions
    {
        public static RouteHandlerBuilder Validate<T>(this RouteHandlerBuilder builder) where T : class
        {
            return builder.AddEndpointFilter(async (context, next) =>
            {
                // Obtener el modelo del tipo T desde los argumentos
                var argument = context.Arguments.OfType<T>().FirstOrDefault();
                if (argument == null)
                {
                    return Results.Problem("El modelo no puede estar vacío.", statusCode: 400);
                }

                // Validar el modelo con Data Annotations (incluyendo validaciones personalizadas)
                var validationResults = new List<ValidationResult>();
                var validationContext = new ValidationContext(argument);

                if (!Validator.TryValidateObject(argument, validationContext, validationResults, validateAllProperties: true))
                {
                    // Organizar los errores por propiedad
                    var errors = validationResults
                        .SelectMany(vr =>
                            vr.MemberNames.Select(memberName => new KeyValuePair<string, string>(
                                memberName, vr.ErrorMessage ?? "Error desconocido"
                            ))
                        )
                        .GroupBy(kv => kv.Key)
                        .ToDictionary(
                            g => g.Key,
                            g => g.Select(kv => kv.Value).ToArray()
                        );

                    return Results.ValidationProblem(errors); // Retornar los errores
                }

                // Continuar con la ejecución del handler si no hay errores
                return await next(context);
            });
        }
    }
}
