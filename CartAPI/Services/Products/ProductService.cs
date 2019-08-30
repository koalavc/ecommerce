using CartAPI.Models;
using CartAPI.Data;
using CartAPI.Services.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartAPI.Services.Products
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public Product AddProduct(Product product)
        {
            var newProduct = new Product
            {
                ProductId = Guid.NewGuid().ToString(),
                Title = product.Title,
                Price = product.Price,
                ImageUrl = product.ImageUrl,
                Description = product.Description
            };
            _productRepository.Add(newProduct);
            return newProduct;
        }

        public async Task<Product> DeleteProduct(Product product)
        {
            var deletedProduct = await this._productRepository.GetProduct(product.Id);
            this._productRepository.Delete(deletedProduct);
            return deletedProduct;
        }

        public async Task<Product> GetProductById(int id)
        {
            var product = await _productRepository.GetProduct(id);
            return product;
        }

        public async Task<List<Product>> GetProducts()
        {
            var products = await _productRepository.GetProducts();
            return products.ToList();
        }

        public async Task<Product> UpdateProduct(Product product)
        {
            var id = product.Id;
            var existingProduct = await _productRepository.GetProduct(id);

            if (existingProduct!= null)
            {
                existingProduct.Title = product.Title;
                existingProduct.Price = product.Price;
                existingProduct.ImageUrl = product.ImageUrl;
                existingProduct.Description = product.Description;
            }
            this._productRepository.Update(existingProduct);
            return existingProduct;
        }
    }
}
