using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartAPI.Models
{
    public class Order : BaseEntity
    {
        public int OrderId { get; set; }
        public User User { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
