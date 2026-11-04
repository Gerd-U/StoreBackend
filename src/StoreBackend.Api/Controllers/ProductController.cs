using Microsoft.AspNetCore.Mvc;
using ApiProductMapper = StoreBackend.Api.Mappers.ProductMapper;
using StoreBackend.Api.Models.Requests;
using StoreBackend.Exceptions;
using StoreBackend.Facade;

namespace StoreBackend.Api.Controllers;

[Route("api/products")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IProductFacade _productFacade;

    public ProductController(IProductFacade productFacade)
    {
        _productFacade = productFacade;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var products = await _productFacade.GetAllAsync();
        var model = ApiProductMapper.ToResponseModel(products);
        return Ok(model);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(Guid id)
    {
        try
        {
            var product = await _productFacade.GetByIdAsync(id);
            var model = ApiProductMapper.ToResponseModel(product);
            return Ok(model);
        }
        catch (ResourceNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpPost]
    public async Task<IActionResult> AddProduct([FromBody] CreateProductRequestModel product)
    {
        var dto = ApiProductMapper.ToDto(product);
        var addedProduct = await _productFacade.AddAsync(dto);
        var model = ApiProductMapper.ToResponseModel(addedProduct);
        return CreatedAtAction(nameof(GetProduct), new { id = model.ProductResourceId }, model);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(Guid id)
    {
        try
        {
            await _productFacade.DeleteAsync(id);
            return NoContent();
        }
        catch (ResourceNotFoundException)
        {
            return NotFound();
        }
    }
}
