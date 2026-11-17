using System.ComponentModel.DataAnnotations;

namespace StoreBackend.Api.Models.Requests;

public class CreateUserRequestModel
{
    // Opcional: si no se envía, el backend genera uno.
    public Guid? UserResourceId { get; set; }

    [Required]
    [MinLength(3)]
    [MaxLength(50)]
    public string? Username { get; set; }

    [Required]
    [MinLength(8)]
    [MaxLength(100)]
    public string? Password { get; set; }
}
