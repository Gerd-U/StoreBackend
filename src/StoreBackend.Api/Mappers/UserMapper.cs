using StoreBackend.Api.Models.Requests;
using StoreBackend.Api.Models.Responses;
using StoreBackend.Dto;

namespace StoreBackend.Api.Mappers;

public class UserMapper
{
    public static CreateUserDto ToDto(CreateUserRequestModel model)
    {
        return new CreateUserDto
        {
            Name = model.Name ?? string.Empty,
            Username = model.Username ?? string.Empty,
            Email = model.Email ?? string.Empty,
            Password = model.Password ?? string.Empty
        };
    }

    public static List<UserResponseModel> ToResponseModel(List<UserDto> users)
    {
        return users.Select(user => ToResponseModel(user)).ToList();
    }

    public static UserResponseModel ToResponseModel(UserDto user)
    {
        return new UserResponseModel
        {
            UserResourceId = user.UserResourceId,
            Name = user.Name,
            Username = user.Username,
            Email = user.Email
        };
    }
}
