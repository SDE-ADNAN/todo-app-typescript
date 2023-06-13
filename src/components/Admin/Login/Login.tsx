import React, { useState } from 'react';
import  userCredentialsArray, { User } from "../../../data/users"

// const users: User[] = [
//   { username: 'user1', password: 'password1' },
//   { username: 'user2', password: 'password2' },
//   // Add more user objects as needed
// ];

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Find the user object with a matching username
    const user = userCredentialsArray.find((user) => user.username === username);

    // If a user is found and the password matches, authentication is successful
    if (user && user.password === password) {
      // Perform actions like setting the authenticated state or storing the JWT token
      console.log('Authentication successful');
    } else {
      // Handle authentication failure, such as displaying an error message
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
