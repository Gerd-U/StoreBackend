namespace StoreBackend.Dto;

public class UserDto
{
    public Guid UserResourceId { get; set; }
    public string? Username { get; set; }

    // Solo se usa de entrada al crear el usuario; nunca se devuelve.
    public string? Password { get; set; }
}
