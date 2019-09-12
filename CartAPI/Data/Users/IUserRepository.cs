using CartAPI.Dtos;
using CartAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartAPI.Data
{
    public interface IUserRepository
    {
        void Add(User entity);
        void Update(User entity);
        void Delete(User entity);
        //Task<bool> SaveAll();
        Task<List<User>> GetUsers();
        Task<User> GetUser(int id);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
        //Task<User> Register(RegistrationDto registrationDto);
        //void CreateHashPassword(string password, out byte[] passwordHash, out byte[] passwordSalt);
        //bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);
    }
}
