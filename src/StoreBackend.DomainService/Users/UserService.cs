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

    public async Task<User> CreateAsync(CreateUserDto user)
    {
        // BCrypt solo usa los primeros 72 bytes; el login rechaza contraseñas más largas.
        if (System.Text.Encoding.UTF8.GetByteCount(user.Password) > 72)
        {
            throw new BadRequestResponseException("Password is too long");
        }
        if (await _userRepository.HasUserByUsernameAsync(user.Username))
        {
            throw new BadRequestResponseException("Username is already taken");
        }
        if (await _userRepository.HasUserByEmailAsync(user.Email))
        {
            throw new BadRequestResponseException("Email is already taken");
        }

        var entity = new User
        {
            UserResourceId = Guid.NewGuid(),
            Name = user.Name.Trim(),
            Username = user.Username.Trim().ToLowerInvariant(),
            Email = user.Email.Trim().ToLowerInvariant(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password) // Aca se hashea la contraseña antes de guardarla en la base de datos
        };
        return await _userRepository.CreateAsync(entity);
    }

    // Login: queda listo para cuando exista AuthorizationRequestDto.
    // public async Task<User?> GetByUserAndPassword(AuthorizationRequestDto request)
    // {
    //     // BCrypt solo usa los primeros 72 bytes de la contraseña
    //     if (System.Text.Encoding.UTF8.GetByteCount(request.Password) > 72) return null;
    //     var user = await _userRepository.GetByUsername(request.Username);
    //     if (user == null)
    //     {
    //         return null;
    //     }
    //
    //     if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
    //     {
    //         return null;
    //     }
    //
    //     return user;
    // }

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
