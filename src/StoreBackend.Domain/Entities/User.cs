using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StoreBackend.Domain.Entities;

[Table("User")]
public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int UserId { get; set; }

    [Required]
    public Guid UserResourceId { get; set; }

    [Column("Name")]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Column("Email")]
    [StringLength(150)]
    public string Email { get; set; } = string.Empty;
}
