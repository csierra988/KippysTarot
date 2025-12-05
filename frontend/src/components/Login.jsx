import { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { login } from "../api";

const LoginStyle = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
`;

const LoginText = styled.div`
    text-align: center;
`;

const UserInput = styled.input`
    height: 30px;
    width: 400px;
    margin: 10px;
`;

const LoginButton = styled.button`
    margin-top: 10px;
    background: rgba(255, 255, 255, 0.75);
    color: black;
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    &:hover {
        color: rgba(104, 20, 138, 0.66);
    }
`;

const SignUpButton = styled.button `
    justify-content: center;
    margin-top: 10px;
    background: rgba(255, 255, 255, 0.75);
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
`;

const SignUpNav = styled(Link) `
    color: black;
    &:hover {
        background: none;
        color: rgba(104, 20, 138, 0.66);
    }
`

function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const changeEmail = ( event ) => {
        setEmail(event.target.value);
    };
    const changePassword = ( event ) => {
        setPassword(event.target.value);
    };

    const changePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const loggingIn = async ( event ) => {
        event.preventDefault();
        try {
            await login(email, password);
            console.log('user successfully logged in');
            navigate('/');
        } catch (err) {
            console.error('login error: ', err);
        }
    }

    return (
        <LoginStyle onSubmit={loggingIn}>
            <LoginText>login page</LoginText>
            <UserInput 
                placeholder="email" type="email" value={email} onChange={changeEmail} />
            <UserInput 
                placeholder="password" type={showPassword ? "text" : "password"} value={password} onChange={changePassword} />

            { showPassword ? (
                <FaRegEye onClick={changePasswordVisibility} />
            ) : (
                <FaRegEyeSlash onClick={changePasswordVisibility}/>
            )}

            <LoginButton type="submit">Log In!</LoginButton>

            <SignUpButton>
                <SignUpNav to='/SignUp'>
                     no account? sign up here!
                </SignUpNav>
            </SignUpButton>
        </LoginStyle>
    );
}

export default Login;