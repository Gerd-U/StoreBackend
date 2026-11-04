using StoreBackend.DomainService.Users;
using StoreBackend.Dto;
using StoreBackend.Facade.Mappers;
using StoreBackend.Infrastructure.Persistence;

namespace StoreBackend.Facade;

public class UserFacade : IUserFacade
{
    private readonly IUserService _userService;
    private readonly AppDbContext _context;

    public UserFacade(IUserService userService, AppDbContext context)
    {
        _userService = userService;
        _context = context;
    }

    public async Task<List<UserDto>> GetAllAsync()
    {
        var entities = await _userService.GetAllAsync();
        return UserMapper.ToDto(entities);
    }

    public async Task<UserDto> GetByIdAsync(Guid userId)
    {
        var entity = await _userService.GetByIdAsync(userId);
        return UserMapper.ToDto(entity);
    }

    public async Task<UserDto> AddAsync(UserDto user)
    {
        var entity = await _userService.AddAsync(user);
        await _context.SaveChangesAsync();
        return UserMapper.ToDto(entity);
    }

    public async Task DeleteAsync(Guid userId)
    {
        await _userService.DeleteAsync(userId);
        await _context.SaveChangesAsync();
    }
}
