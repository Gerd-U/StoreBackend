using Microsoft.AspNetCore.Mvc;
using ApiUserMapper = StoreBackend.Api.Mappers.UserMapper;
using StoreBackend.Api.Models.Requests;
using StoreBackend.Exceptions;
using StoreBackend.Facade;

namespace StoreBackend.Api.Controllers;

[Route("api/users")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserFacade _userFacade;

    public UserController(IUserFacade userFacade)
    {
        _userFacade = userFacade;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _userFacade.GetAllAsync();
        var model = ApiUserMapper.ToResponseModel(users);
        return Ok(model);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(Guid id)
    {
        try
        {
            var user = await _userFacade.GetByIdAsync(id);
            var model = ApiUserMapper.ToResponseModel(user);
            return Ok(model);
        }
        catch (ResourceNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpPost]
    public async Task<IActionResult> AddUser([FromBody] CreateUserRequestModel user)
    {
        try
        {
            var dto = ApiUserMapper.ToDto(user);
            var addedUser = await _userFacade.AddAsync(dto);
            var model = ApiUserMapper.ToResponseModel(addedUser);
            return CreatedAtAction(nameof(GetUser), new { id = model.UserResourceId }, model);
        }
        catch (ResourceConflictException exception)
        {
            return Conflict(new { message = exception.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        try
        {
            await _userFacade.DeleteAsync(id);
            return NoContent();
        }
        catch (ResourceNotFoundException)
        {
            return NotFound();
        }
    }
}
