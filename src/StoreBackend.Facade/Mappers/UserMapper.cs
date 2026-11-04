using StoreBackend.Domain.Entities;
using StoreBackend.Dto;

namespace StoreBackend.Facade.Mappers;

public static class UserMapper
{
    public static List<UserDto> ToDto(List<User> users)
    {
        return users.Select(user => ToDto(user)).ToList();
    }

    public static UserDto ToDto(User user)
    {
        return new UserDto
        {
            UserResourceId = user.UserResourceId,
            Name = user.Name,
            Email = user.Email
        };
    }
}
