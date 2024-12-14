using System.ComponentModel.DataAnnotations;

namespace ApiMariscos.Utilities
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class CustomCompareAttribute : ValidationAttribute
    {
        //private readonly string _otherPropertyName;

        //public CustomCompareAttribute(string otherPropertyName)
        //{
        //    _otherPropertyName = otherPropertyName;
        //}

        //protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        //{
        //    var otherPropertyName = validationContext.ObjectType.GetProperty(_otherPropertyName);

        //    if (otherPropertyName == null)
        //    {
        //        return new ValidationResult($"La propiedad {_otherPropertyName} no fue encontrada.");
        //    }

        //    var otherPropertyValue = otherPropertyName.GetValue(validationContext.ObjectInstance);

        //    if (string.IsNullOrEmpty((string?)value))
        //    {
        //        return ValidationResult.Success;
        //    }

        //    if (string.IsNullOrEmpty((string?)otherPropertyValue))
        //    {
        //        return ValidationResult.Success;
        //    }

        //    if (!value.Equals(otherPropertyValue))
        //    {
        //        return new ValidationResult(ErrorMessage);
        //    }

        //    return ValidationResult.Success;
        //}

        private readonly string _otherPropertyName;

        public CustomCompareAttribute(string otherPropertyName)
        {
            _otherPropertyName = otherPropertyName;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            // Buscar la propiedad comparada
            var otherProperty = validationContext.ObjectType.GetProperty(_otherPropertyName);
            if (otherProperty == null)
            {
                return new ValidationResult($"La propiedad '{_otherPropertyName}' no fue encontrada.");
            }

            // Obtener valores de las propiedades
            var currentValue = value as string;
            var otherPropertyValue = otherProperty.GetValue(validationContext.ObjectInstance) as string;

            // Validar valores
            if (string.IsNullOrEmpty(currentValue) || string.IsNullOrEmpty(otherPropertyValue))
            {
                return ValidationResult.Success; // Permitir nulos o vacíos
            }

            if (!string.Equals(currentValue, otherPropertyValue, StringComparison.OrdinalIgnoreCase))
            {
                // Asignar el error a la propiedad actual
                return new ValidationResult(ErrorMessage, new[] { validationContext.MemberName });
            }

            return ValidationResult.Success;
        }
    }
}
