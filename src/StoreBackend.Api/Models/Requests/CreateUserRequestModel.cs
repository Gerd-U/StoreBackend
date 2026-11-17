using System.ComponentModel.DataAnnotations;

namespace StoreBackend.Api.Models.Requests;

public class CreateUserRequestModel
{
    [Required]
    [MinLength(2)]
    [MaxLength(50)]
    public string? Name { get; set; }

    [Required]
    [MinLength(3)]
    [MaxLength(50)]
    public string? Username { get; set; }

    [Required]
    [EmailAddress]
    [MaxLength(100)]
    public string? Email { get; set; }

    [Required]
    [MinLength(8)]
    [MaxLength(72)] // BCrypt solo usa los primeros 72 bytes
    public string? Password { get; set; }
}
