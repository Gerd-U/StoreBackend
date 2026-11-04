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
            UserResourceId = model.UserResourceId
                ?? throw new ArgumentException("UserResourceId is required.", nameof(model)),
            Name = model.Name,
            Email = model.Email
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
            Email = user.Email
        };
    }
}
