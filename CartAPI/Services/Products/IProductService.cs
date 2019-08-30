using CartAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CartAPI.Services.Products
{
    public interface IProductService
    {
        Task<List<Product>> GetProducts();
        Task<Product> GetProductById(int id);
        Product AddProduct(Product product);
        Task<Product> UpdateProduct(Product product);
        Task<Product> DeleteProduct(Product product);
    }
}
