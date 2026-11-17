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

    [Column("Username")]
    [StringLength(50)]
    public string Username { get; set; } = string.Empty;

    [Column("Password")]
    [StringLength(255)]
    public string Password { get; set; } = string.Empty;
}
