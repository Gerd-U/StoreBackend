using StoreBackend.Domain.Entities;
using StoreBackend.Dto;

namespace StoreBackend.DomainService.Users;

public interface IUserService
{
    Task<User> CreateAsync(CreateUserDto user);
    // Task<User?> GetByUserAndPassword(AuthorizationRequestDto request);

    Task<List<User>> GetAllAsync();
    Task<User> GetByIdAsync(Guid userId);
    Task DeleteAsync(Guid userId);
}
