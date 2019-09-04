using CartAPI.Dtos;
using CartAPI.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CartAPI.Services.Users
{
    public interface IUserService
    {
        Task<List<User>> GetUsers();
        Task<User> GetUserById(int id);
        //RegistrationDto AddUser(RegistrationDto user);
        Task<User> UpdateUser(User user);
        Task<User> DeleteUser(User user);
    }
}
