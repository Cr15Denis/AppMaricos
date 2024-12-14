using ApiMariscos.Utilities;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace ApiMariscos.Models
{
    public class Autenticacion
    {
        [DebuggerBrowsable(DebuggerBrowsableState.Never)]      
        private string _contrasena = string.Empty;

        [DebuggerBrowsable(DebuggerBrowsableState.Never)]
        private string _email = string.Empty;

        
        [Required(ErrorMessage = "Este campo no puede ir vacío.")]
        public string Email
        {
            get => _email;
            set => _email = value.Trim().ToLower();
        }


        [Required(ErrorMessage = "Este campo no puede ir vacío.")]
        public string Contrasena
        {
            get => _contrasena;
            //set => _password = HashPassword.HashText(value);
            set => _contrasena = HashPassword.Instance.HashText(value);
        }
    }

    public class UsuarioDatos
    {        
        public string Email { get; set; } = string.Empty;
        public string Rol { get; set; } = string.Empty;
    }
}
