import React, { useState } from 'react';
import { LoginPageProps } from '../../../Pages/Admin/LoginPage';
import PasswordInput from '../../UIComponents/PasswordInput';
import "./Login.scss"
import GlassmorphicBackground from '../../UIComponents/Modal/DesignComponents/GlassmorphicBackground';
import { getUrl } from '../../../context/todoContext';

interface LoginProps extends LoginPageProps{
}

const Login: React.FC<LoginProps> = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append('userName', userName);
    formdata.append('password', password);

    fetch(getUrl('/auth/login'), {
      method: 'POST',
      body: formdata,
    }).then((response) => {
      if (response.ok) {
        console.log("user logged in")
      }
      return response.json()
    }).then((jsonResponse) => {
      console.log(jsonResponse)
      setError(jsonResponse.message)
      localStorage.setItem("Token", jsonResponse.token)
      window.location.href = '/dashboard'
    })
      .catch(err => {
        console.error(err)
        setError(err)
      })

  };

  return (
    <div className="main_login_container">
      <GlassmorphicBackground>
      <h2>Login</h2>
      <form className='login__form' onSubmit={handleLoginFormSubmit}>
        <div className='inputdiv'>
            <label htmlFor="userName">Username:</label>
            <input type="text" id="userName" value={userName} onChange={handleUsernameChange} />
        </div>
        <div className='inputdiv'>
          <PasswordInput label="Password:" id="password" value={password} onChange={handlePasswordChange}/>
        </div>
        <button className="login__btn" type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      </GlassmorphicBackground>
    </div>
  );
};

export default Login;
