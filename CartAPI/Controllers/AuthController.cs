using CartAPI.Dtos;
using CartAPI.Services.Auth;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> CreateUser(RegistrationDto registrationDto)
        {
            if (await _authService.UserExists(registrationDto.Username))
            {
                return BadRequest("Username already exists");
            }
            else
            {
                var user = await _authService.Register(registrationDto);
                return Ok(user);
            }
        }

        //[HttpPost("login")]
        //public async Task<IActionResult> LoginUser(LoginDto loginDto)
        //{
        
        //}
    }
}
