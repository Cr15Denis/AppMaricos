namespace ApiMariscos.Models
{
    public class CrearProducto
    {
        public string? Nombre { get; set; }
        public decimal PrecioLibra { get; set; }
        public decimal LibrasDisponibles { get; set; }
    }

    public class LeerProducto
    {
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public decimal PrecioLibra { get; set; }
        public decimal LibrasDisponibles { get; set; }
    }

    public class EditarProducto
    {
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public decimal PrecioLibra { get; set; }
        public decimal LibrasDisponibles { get; set; }
    }
}
