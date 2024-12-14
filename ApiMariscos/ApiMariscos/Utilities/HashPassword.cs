using System.Security.Cryptography;
using System.Text;

namespace ApiMariscos.Utilities
{
    public class HashPassword
    {
        private static readonly HashPassword _instance = new();  
        public static HashPassword Instance => _instance;

        public string HashText(string text)
        {
            if (string.IsNullOrEmpty(text))
            {
                return string.Empty;
            }

            string textWithSalt = text + "MySecretSalt";
            byte[] hashBytes = SHA512.HashData(Encoding.UTF8.GetBytes(textWithSalt));
            string hash = BitConverter.ToString(hashBytes).Replace("-", string.Empty);
            return hash;
        }
    }
}
