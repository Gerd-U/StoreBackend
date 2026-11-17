using StoreBackend.Domain.Entities;

namespace StoreBackend.Infrastructure.Repositories;

public interface IUserRepository
{
    Task<List<User>> GetAllAsync();
    Task<User?> GetByIdAsync(Guid userId);
    Task<bool> ExistsAsync(Guid userId, string username);
    Task<User> AddAsync(User user);
    Task DeleteAsync(User user);
}
