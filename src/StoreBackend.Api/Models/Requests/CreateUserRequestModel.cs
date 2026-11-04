using System.ComponentModel.DataAnnotations;

namespace StoreBackend.Api.Models.Requests;

public class CreateUserRequestModel
{
    [Required]
    public Guid? UserResourceId { get; set; }

    [Required]
    [MinLength(2)]
    [MaxLength(100)]
    public string? Name { get; set; }

    [Required]
    [EmailAddress]
    [MaxLength(150)]
    public string? Email { get; set; }
}
