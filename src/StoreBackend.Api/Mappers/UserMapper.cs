using StoreBackend.Api.Models.Requests;
using StoreBackend.Api.Models.Responses;
using StoreBackend.Dto;

namespace StoreBackend.Api.Mappers;

public class UserMapper
{
    public static UserDto ToDto(CreateUserRequestModel model)
    {
        return new UserDto
        {
            UserResourceId = model.UserResourceId ?? Guid.NewGuid(),
            Username = model.Username,
            Password = model.Password
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
            Username = user.Username
        };
    }
}
