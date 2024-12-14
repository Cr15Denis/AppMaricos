namespace ApiMariscos.Models
{
    public class CrearVenta
    {
        public string? ClienteNombre { get; set; } 
        public List<DetalleVenta> Detalles { get; set; } 
    }

    public class DetalleVenta
    {
        public int ProductoID { get; set; } 
        public decimal PrecioPorLibra { get; set; } 
        public decimal CantidadLibras { get; set; } 
    }
}
