using CartAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartAPI.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        public ProductRepository(DataContext context)
        {
            _context = context;
        }

        public void Add(Product entity)
        {
            _context.Add(entity);
            _context.SaveChanges();
        }

        public void Delete(Product entity)
        {
            _context.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(Product entity)
        {
            _context.Update(entity);
            _context.SaveChanges();
        }

        public async Task<Product> GetProduct(int id)
        {
            var product = await _context.Products
                .FirstOrDefaultAsync(u => u.Id == id);
            return product;
        }

        public async Task<List<Product>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();

            return products;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
