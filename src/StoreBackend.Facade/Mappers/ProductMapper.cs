using StoreBackend.Domain.Entities;
using StoreBackend.Dto;

namespace StoreBackend.Facade.Mappers;

public static class ProductMapper
{
    public static List<ProductDto> ToDto(List<Product> products)
    {
        return products.Select(product => ToDto(product)).ToList();
    }

    public static ProductDto ToDto(Product product)
    {
        return new ProductDto
        {
            ProductResourceId = product.ProductResourceId,
            Name = product.Name
        };
    }
}
