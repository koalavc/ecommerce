using CartAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartAPI.Data
{
    public interface IProductRepository
    {
        void Add(Product entity);
        void Update(Product entity);
        void Delete(Product entity);
        Task<bool> SaveAll();
        Task<List<Product>> GetProducts();
        Task<Product> GetProduct(int id);
    }
}
