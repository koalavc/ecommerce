using CartAPI.Dtos;
using CartAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartAPI.Services.Auth
{
    public interface IAuthService
    {
        Task<User> Register(RegistrationDto registrationDto);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}
