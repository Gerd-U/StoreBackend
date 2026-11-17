using StoreBackend.Domain.Entities;
using StoreBackend.Dto;
using StoreBackend.Exceptions;
using StoreBackend.Infrastructure.Repositories;

namespace StoreBackend.DomainService.Users;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<List<User>> GetAllAsync()
    {
        return await _userRepository.GetAllAsync();
    }

    public async Task<User> GetByIdAsync(Guid userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user is null)
        {
            throw new ResourceNotFoundException("User not found");
        }

        return user;
    }

    public async Task<User> AddAsync(UserDto user)
    {
        var username = user.Username?.Trim().ToLowerInvariant() ?? string.Empty;

        if (string.IsNullOrWhiteSpace(user.Password))
        {
            throw new ArgumentException("Password is required.", nameof(user));
        }

        if (await _userRepository.ExistsAsync(user.UserResourceId, username))
        {
            throw new ResourceConflictException("A user with this id or username already exists");
        }

        var userEntity = new User
        {
            UserResourceId = user.UserResourceId,
            Username = username,
            Password = BCrypt.Net.BCrypt.HashPassword(user.Password)
        };

        return await _userRepository.AddAsync(userEntity);
    }

    public async Task DeleteAsync(Guid userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user is null)
        {
            throw new ResourceNotFoundException("User not found");
        }

        await _userRepository.DeleteAsync(user);
    }
}
