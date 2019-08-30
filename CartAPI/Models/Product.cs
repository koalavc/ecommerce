using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartAPI.Models
{
    public class Product : BaseEntity
    {
        public string ProductId { get; set; }
        public string Title { get; set; }
        public int Price { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
    }
}
