import React, { useState } from 'react';
import  userCredentialsArray from "../../../data/users"
import { LoginPageProps } from '../../../Pages/Admin/LoginPage';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../UIComponents/PasswordInput';
import "./Login.scss"

// const users: User[] = [
//   { username: 'user1', password: 'password1' },
//   { username: 'user2', password: 'password2' },
//   // Add more user objects as needed
// ];

interface LoginProps extends LoginPageProps{
}

const Login: React.FC<LoginProps> = ({onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate()

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
      onLogin()
      navigate("/dashboard")
      localStorage.setItem("jwtToken",user && user.jwtToken)
    } else {
      // Handle authentication failure, such as displaying an error message
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form className='login__form' onSubmit={handleLoginFormSubmit}>
        <div className='inputdiv'>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div className='inputdiv'>
          <PasswordInput label="Password:" id="password" value={password} onChange={handlePasswordChange}/>
        </div>
        <button className="login__btn" type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
