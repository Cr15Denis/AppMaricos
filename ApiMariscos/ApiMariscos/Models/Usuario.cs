using ApiMariscos.Utilities;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace ApiMariscos.Models
{
    public class CrearUsuario
    {
        [DebuggerBrowsable(DebuggerBrowsableState.Never)]
        private string _email = string.Empty;

        [DebuggerBrowsable(DebuggerBrowsableState.Never)]
        private string _emailconfirm = string.Empty;

        [MinLength(1, ErrorMessage = "Este campo no puede ir vacío."), MaxLength(25, ErrorMessage = "Máximo de {1} caracteres permitidos")]        
        public string Nombre { get; set; } = string.Empty;

        [MinLength(1, ErrorMessage = "Este campo no puede ir vacío."), MaxLength(20, ErrorMessage = "Máximo de {1} caracteres permitidos")]       
        public string Apellido { get; set; } = string.Empty;


        [RegularExpression("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", ErrorMessage = "Correo inválido")]
        [Required(ErrorMessage = "Este campo no puede ir vacío.")]
        public string Email
        {
            get => _email;
            set => _email = value.Trim().ToLower();
        }

        [CustomCompare(nameof(Email), ErrorMessage = "El correo electrónico no coincide.")]
        [RegularExpression("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", ErrorMessage = "Correo inválido")]
        [Required(ErrorMessage = "Este campo no puede ir vacío.")]
        public string ConfirmarEmail
        {
            get => _emailconfirm;
            set => _emailconfirm = value.Trim().ToLower();
        }

        [CustomPassword(ErrorMessage = "Contraseña inválida.")]
        [Required(ErrorMessage = "Este campo no puede ir vacío.")]
        public string? contrasena { get; set; }


        [CustomCompare(nameof(contrasena), ErrorMessage = "La contraseña no coincide.")]
        [Required(ErrorMessage = "Este campo no puede ir vacío.")]
        public string? ConfirmarContrasena { get; set; }

        public int RolId { get; set; }

    }

    public class GuardarUsuario
    {
        [DebuggerBrowsable(DebuggerBrowsableState.Never)]
        private string? _contrasena;

        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Email { get; set; }
        public string? Contrasena
        {
            get => _contrasena;
            //set => _password = HashPassword.HashText(value);
            set => _contrasena = HashPassword.Instance.HashText(value!);

        }
        public int RolId { get; set; }
    }

    public class LeerUsuario
    {
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Email { get; set; }
        public int RolId { get; set; }
        public string? Rol { get; set; }
        public bool IsActivo { get; set; }
        public string? Creado { get; set; }
    }

    public class EditarUsuario
    {
        [DebuggerBrowsable(DebuggerBrowsableState.Never)]
        private string? _contrasena;

        public int Id { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Email { get; set; }
        public string? Contrasena
        {
            get => _contrasena;
            //set => _password = HashPassword.HashText(value);
            set => _contrasena = HashPassword.Instance.HashText(value!);

        }
        public int RolId { get; set; }
        public bool IsActivo { get; set; }
    }

    public class LeerRolUsuario
    {       
        public int RolId { get; set; }
        public string? Rol { get; set; }        
    }
}
