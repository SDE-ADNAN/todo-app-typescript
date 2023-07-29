import React, { useEffect, useState } from 'react';
import { LoginPageProps } from '../../../Pages/Admin/LoginPage';
import PasswordInput from '../../UIComponents/PasswordInput';
import "./Login.scss"
import GlassmorphicBackground from '../../UIComponents/Modal/DesignComponents/GlassmorphicBackground';
import { getUrl } from '../../../context/todoContext';
import Loader from '../../UIComponents/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';

interface LoginProps extends LoginPageProps{
  setIsAuthenticated: any;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [res, setRes] = useState<any>('')

  const navigate = useNavigate()

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (!token) {
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(true)
      navigate('/dashboard')
    }
  }, []);

  const handleLoginFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true)

    const formdata = new FormData();
    formdata.append('userName', userName);
    formdata.append('password', password);

    fetch(getUrl('/auth/login'), {
      method: 'POST',
      body: formdata,
    }).then((response) => {
      setRes(response)
      if (response.status === 200 || response.ok) {
        console.log("user logged in")
        console.log(response)
      }
      return response.json()
    }).then((jsonResponse) => {
      console.log(jsonResponse)
      setIsLoading(false)
      setError(jsonResponse && jsonResponse.message)
      if (jsonResponse && jsonResponse.token) {
        localStorage.setItem("Token", jsonResponse && jsonResponse.token)
        navigate('/dashboard')
      }
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
        {error && <p>{JSON.stringify(error)}</p>}
        <div className='sign_in_redirect'>
          Don't have an account ?
          <Link to='/register'><span>Sign Up / Register</span></Link>
        </div>
      </GlassmorphicBackground>
      <Loader isLoading={isLoading} />

    </div>
  );
};

export default Login;
