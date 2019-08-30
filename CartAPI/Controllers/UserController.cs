using CartAPI.Models;
using CartAPI.Services.Users;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetUsers();
            return Ok(users);
        }

        [HttpPost("register")]
        public IActionResult CreateUser([FromBody]User newUser)
        {
            var user = _userService.AddUser(newUser);
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody]User user)
        {
            user.Id = id;
            var updatedUser = await this._userService.UpdateUser(user);
            return Ok(updatedUser);
        }
    }
}
