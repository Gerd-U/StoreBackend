namespace StoreBackend.Dto;

// DTO de salida: nunca lleva la contraseña.
public class UserDto
{
    public Guid UserResourceId { get; set; }
    public string? Name { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
}
