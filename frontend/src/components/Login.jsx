import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { login } from "../api";
import TextInput from "./ui/TextInput";
import Button from "./ui/Button";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const changeEmail = (event) => {
        setEmail(event.target.value);
    };
    const changePassword = (event) => {
        setPassword(event.target.value);
    };

    const changePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const loggingIn = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
            console.log('user successfully logged in');
            navigate('/');
        } catch (err) {
            console.error('login error: ', err);
            switch(err.code) {
                case 'auth/invalid-credential':
                    setErrorMessage("Incorrect email and/or password!")
                    break;
            }
        }
    }

    return (
        <form onSubmit={loggingIn} className="flex flex-col justify-center items-center min-h-screen w-screen">
            <p style={{ color: "black" }}>Login Page</p>
            {errorMessage && (
                <p className="text-error">{errorMessage}</p>
            )}
            {/* UserInput */}
            <TextInput placeholder="email" type="email" value={email} onChange={changeEmail} />

            <div className="relative">
                {/* UserInput */}
                <TextInput placeholder="password" type={showPassword ? "text" : "password"} value={password} onChange={changePassword} />

                <div onClick={changePasswordVisibility} className="absolute right-[30px] top-[55%] translate-y-[-50%] cursor-pointer text-black hover:text-accent">
                    { showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
            </div>
            
            {/* LoginButton */}
            <Button type="submit" className="mt-[10px]">Log In!</Button>

            <Link to='/SignUp' className="text-black hover:bg-none hover:text-accent">
                {/* SignUpButton */}
                <Button className="justify-center mt-[10px]">
                    No account? Sign up here!
                </Button>
            </Link>
        </form>
    );
}

export default Login;