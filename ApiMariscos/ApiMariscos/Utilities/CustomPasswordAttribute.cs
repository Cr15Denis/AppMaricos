using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace ApiMariscos.Utilities
{
    public class CustomPasswordAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            //if (value != null)
            if (!string.IsNullOrEmpty((string?)value))
            {
                if (value is string password)
                {
                    // Requisito 1: Mínimo 8 caracteres
                    if (!Regex.IsMatch(password, "^(.{8,})$"))
                    {
                        ErrorMessage = "La contraseña debe tener al menos 8 caracteres.";
                        return false;
                    }

                    // Requisito 2: 1 o más letras mayúsculas
                    if (!Regex.IsMatch(password, "^(?=.*[A-Z]).*$"))
                    {
                        ErrorMessage = "La contraseña debe tener al menos una letra mayúscula.";
                        return false;
                    }

                    // Requisito 3: 1 o más números
                    if (!Regex.IsMatch(password, "^(?=.*\\d).*$"))
                    {
                        ErrorMessage = "La contraseña debe tener al menos un número.";
                        return false;
                    }


                }
            }

            return true;
        }
    }
}
