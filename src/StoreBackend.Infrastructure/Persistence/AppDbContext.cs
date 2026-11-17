using Microsoft.EntityFrameworkCore;
using StoreBackend.Domain.Entities;

namespace StoreBackend.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(user =>
        {
            user.HasIndex(u => u.UserResourceId).IsUnique();
            user.HasIndex(u => u.Username).IsUnique();
        });
    }
}
