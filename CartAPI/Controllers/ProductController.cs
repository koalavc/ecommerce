using CartAPI.Models;
using CartAPI.Services.Products;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace CartAPI.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        //private readonly IMapper _mapper;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _productService.GetProducts();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            try
            {
                var product = await _productService.GetProductById(id);

                if (product == null)
                {
                    return NotFound($"Could not find product");
                }

                return Ok(product);

            }
            catch (Exception)
            {
                return NotFound($"Could not retrieve the product for some reason.");
            }
        }

        [HttpPost]
        public IActionResult CreateProduct([FromBody]Product newProduct)
        {
            var product = _productService.AddProduct(newProduct);
            return Ok(product);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var deletedProduct = await _productService.GetProductById(id);

            if (deletedProduct == null)
            {
                return NotFound($"Could not delete product based on Id");
            }
            var removedProduct =  await _productService.DeleteProduct(deletedProduct);
            return Ok(removedProduct);
            
            //catch (Exception)
            //{
            //    return NotFound($"Could not delete the product for some reason");
            //}
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product product)
        {
            product.Id = id;
            var updatedProduct = await this._productService.UpdateProduct(product);
            return Ok(updatedProduct);
        }

    }
}
