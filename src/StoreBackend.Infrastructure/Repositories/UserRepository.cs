using Microsoft.EntityFrameworkCore;
using StoreBackend.Domain.Entities;
using StoreBackend.Infrastructure.Persistence;

namespace StoreBackend.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public Task<User> CreateAsync(User user)
    {
        _context.Users.Add(user);
        return Task.FromResult(user);
    }

    // Username y Email se guardan en minúsculas (ver UserService),
    // así que se buscan normalizados de la misma forma.
    public async Task<bool> HasUserByUsernameAsync(string username)
    {
        var normalized = username.Trim().ToLowerInvariant();
        return await _context.Users.AnyAsync(u => u.Username == normalized);
    }

    public async Task<bool> HasUserByEmailAsync(string email)
    {
        var normalized = email.Trim().ToLowerInvariant();
        return await _context.Users.AnyAsync(u => u.Email == normalized);
    }

    public Task<User?> GetByUsername(string username)
    {
        var normalized = username.Trim().ToLowerInvariant();
        return _context.Users.FirstOrDefaultAsync(u => u.Username == normalized);
    }

    public async Task<List<User>> GetAllAsync()
    {
        return await _context.Users.OrderBy(u => u.Username).ToListAsync();
    }

    public async Task<User?> GetByIdAsync(Guid userId)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.UserResourceId == userId);
    }

    public Task DeleteAsync(User user)
    {
        _context.Users.Remove(user);
        return Task.CompletedTask;
    }
}
