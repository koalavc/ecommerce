using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CartAPI.Data;
using CartAPI.Dtos;
using CartAPI.Models;

namespace CartAPI.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;

        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> Login(string username, string password)
        {
            var user = await _userRepository.Login(username, password);

            return user;
        }

        public async Task<User> Register(RegistrationDto registrationDto)
        {
            // byteArrays of passwordHash and passwordSalt
            byte[] passwordHash, passwordSalt;

            // The out keyword creates a reference of the variables.
            // When they are updated, within the CreateHashPassword, it will be updated locally within the method
            CreateHashPassword(registrationDto.Password, out passwordHash, out passwordSalt);

            var newUser = new User();

            newUser.PasswordHash = passwordHash;
            newUser.PasswordSalt = passwordSalt;

            newUser = new User
            {
                Username = registrationDto.Username,
                Email = registrationDto.Email,
                PasswordHash = newUser.PasswordHash,
                PasswordSalt = newUser.PasswordSalt
            };

            _userRepository.Add(newUser);
            return newUser;
        }

        private void CreateHashPassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            // Anything within the using curly braces will be disposed properly

            // Using statement - Provides a convenient syntax that ensures the correct use of IDisposable objects.
            // IDisposable - Provides a mechanism for releasing unmanaged resources.
            // The primary use IDispose is to release unmanaged resources. The garbage collector automatically releases the memory allocated to a managed object when that object is no longer used. However, it is not possible to predict when garbage collection will occur.
            // Dispose - Use this method to close or release unmanaged resources such as files, streams, and handles held by an instance of the class that implements this interface.
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            var users = await _userRepository.GetUsers();
            if (users.Any(x => x.Username == username))
            {
                return true;
            }
            return false;
        }
    }
}
