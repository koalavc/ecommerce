using CartAPI.Data;
using CartAPI.Models;
using CartAPI.Services.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User AddUser(User user)
        {
            var newUser = new User
            {
                Username = user.Username,
                Email = user.Email,
                Password = user.Password
            };
            _userRepository.Add(newUser);
            return newUser;
        }

        public Task<User> DeleteUser(User user)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUserById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<User>> GetUsers()
        {
            var users = await _userRepository.GetUsers();
            return users.ToList();
        }

        public async Task<User> UpdateUser(User user)
        {
            var id = user.Id;
            var existingUser = await _userRepository.GetUser(id);

            if (existingUser != null)
            {
                existingUser.Username = user.Username;
                existingUser.Email = user.Email;
            }
            this._userRepository.Update(existingUser);
            return existingUser;
        }
    }
}
