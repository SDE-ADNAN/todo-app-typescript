import { useEffect } from "react";
import Login from "../../components/Admin/Login/Login"
import { useNavigate } from "react-router-dom";

export interface LoginPageProps {
    setIsAuthenticated: any;
}
const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated }) => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (!token) {
            setIsAuthenticated(false)
        } else {
            setIsAuthenticated(true)
            navigate('/dashboard')
        }
    }, []);
    return(
        <Login setIsAuthenticated={setIsAuthenticated} />
    )
}

export default LoginPage;