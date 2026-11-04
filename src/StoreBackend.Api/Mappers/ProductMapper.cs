using StoreBackend.Api.Models.Requests;
using StoreBackend.Api.Models.Responses;
using StoreBackend.Dto;

namespace StoreBackend.Api.Mappers;

public class ProductMapper
{
    public static ProductDto ToDto(CreateProductRequestModel model)
    {
        return new ProductDto
        {
            ProductResourceId = model.ProductResourceId
                ?? throw new ArgumentException("ProductResourceId is required.", nameof(model)),
            Name = model.Name
        };
    }

    public static List<ProductResponseModel> ToResponseModel(List<ProductDto> products)
    {
        return products.Select(product => ToResponseModel(product)).ToList();
    }

    public static ProductResponseModel ToResponseModel(ProductDto product)
    {
        return new ProductResponseModel
        {
            ProductResourceId = product.ProductResourceId,
            Name = product.Name
        };
    }
}
