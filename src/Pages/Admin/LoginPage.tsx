import { useEffect } from "react";
import Login from "../../components/Admin/Login/Login"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../ReduxStore/store";

export interface LoginPageProps {
    setIsAuthenticated: any;
}
const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated }) => {
    const navigate = useNavigate()
    const reduxToken = useSelector((state: RootState) => state.User.token)
    // useEffect(() => {
    //     const token = localStorage.getItem('Token');
    //     if (!token && !reduxToken) {
    //         setIsAuthenticated(false)
    //     } else {
    //         setIsAuthenticated(true)
    //         navigate('/dashboard')
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    return(
        <Login setIsAuthenticated={setIsAuthenticated} />
    )
}

export default LoginPage;