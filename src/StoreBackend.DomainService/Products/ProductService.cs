using StoreBackend.Domain.Entities;
using StoreBackend.Dto;
using StoreBackend.Exceptions;
using StoreBackend.Infrastructure.Repositories;

namespace StoreBackend.DomainService.Products;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<List<Product>> GetAllAsync()
    {
        return await _productRepository.GetAllAsync();
    }

    public async Task<Product> GetByIdAsync(Guid productId)
    {
        var product = await _productRepository.GetByIdAsync(productId);
        if (product is null)
        {
            throw new ResourceNotFoundException("Product not found");
        }

        return product;
    }

    public async Task<Product> AddAsync(ProductDto product)
    {
        var productEntity = new Product
        {
            ProductResourceId = product.ProductResourceId,
            Name = product.Name ?? string.Empty
        };

        return await _productRepository.AddAsync(productEntity);
    }

    public async Task DeleteAsync(Guid productId)
    {
        var product = await _productRepository.GetByIdAsync(productId);
        if (product is null)
        {
            throw new ResourceNotFoundException("Product not found");
        }

        await _productRepository.DeleteAsync(product);
    }
}
