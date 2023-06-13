import Login from "../../components/Admin/Login/Login"

export interface LoginPageProps{
    onLogin: () => any;
}
const LoginPage : React.FC<LoginPageProps>= ({onLogin})=>{
    return(
        <Login onLogin={onLogin}/>
    )
}

export default LoginPage;