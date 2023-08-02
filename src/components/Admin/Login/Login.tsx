import React, { /*useEffect,*/ useState } from 'react';
import { LoginPageProps } from '../../../Pages/Admin/LoginPage';
import PasswordInput from '../../UIComponents/PasswordInput';
import "./Login.scss"
import GlassmorphicBackground from '../../UIComponents/Modal/DesignComponents/GlassmorphicBackground';
// import Loader from '../../UIComponents/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { setLoading } from '../../../ReduxStore/UISlice';
import { useDispatch } from 'react-redux';
import { getUrl } from '../../../CONFIG';
import { RootState } from '../../../ReduxStore/store';
import { useSelector } from 'react-redux';
import { setToken } from '../../../ReduxStore/UserSlice';

interface LoginProps extends LoginPageProps{
  setIsAuthenticated: any;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated, fetchAllUserData }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.User.token)

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };


  const handleLoginFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(setLoading(true))

    const formdata = new FormData();
    formdata.append('userName', userName);
    formdata.append('password', password);

    fetch(getUrl('/auth/login'), {
      method: 'POST',
      body: formdata,
    }).then((response) => {
      if (response.status === 200 || response.ok) {
        console.log("user logged in")
      }
      return response.json()
    }).then((jsonResponse) => {
      dispatch(setLoading(false))
      setError(jsonResponse && jsonResponse.message)
      if (jsonResponse && jsonResponse.token) {
        localStorage.setItem("Token", jsonResponse && jsonResponse.token)
        dispatch(setToken(jsonResponse.token))
        // dispatch(setLoading(true))
        // fetchAllUserData(jsonResponse.token)
        // dispatch(setLoading(false))
        if (token) {
          navigate('/todos')
        }
      }
    })
      .catch(err => {
        console.error(err)
        setError(err)
        dispatch(setLoading(false))
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
    </div>
  );
};

export default Login;
