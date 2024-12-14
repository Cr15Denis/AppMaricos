namespace ApiMariscos.IServices
{
    public interface IJwtTokenService
    {
        string GenerateJWToken(string email, string rol, DateTime expiredDatetime);
    }
}
