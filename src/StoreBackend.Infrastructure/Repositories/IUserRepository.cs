using StoreBackend.Domain.Entities;

namespace StoreBackend.Infrastructure.Repositories;

public interface IUserRepository
{
    // Métodos del ejemplo de la profe
    Task<User> CreateAsync(User user);
    Task<bool> HasUserByUsernameAsync(string username);
    Task<bool> HasUserByEmailAsync(string email);
    Task<User?> GetByUsername(string username);

    // Métodos extra que usa el resto de la API (listar, detalle, eliminar)
    Task<List<User>> GetAllAsync();
    Task<User?> GetByIdAsync(Guid userId);
    Task DeleteAsync(User user);
}
