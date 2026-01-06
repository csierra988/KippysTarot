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
    padding: 4px;
    background-color: white;
    caret-color: black;
    color: black;
    outline: none;
    border: 2px solid transparent;
    border-radius: 8px;

    &:focus {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        outline: none; 
    }

    &&::placeholder {
        font-family: "Pixelify Sans", sans-serif;
    }
`;

const LoginButton = styled.button`
    margin-top: 10px;
    background: rgba(255, 255, 255, 0.75);
    color: black;
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    outline: none;
    border: 2px solid transparent;
    &:hover {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        color: rgba(104, 20, 138, 0.66);
    }
    &:focus {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        outline: none; 
    }
`;

const SignUpButton = styled.button`
    justify-content: center;
    margin-top: 10px;
    background: rgba(255, 255, 255, 0.75);
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    outline: none;
    color: black;
    border: 2px solid transparent;;
    &:hover {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        color: rgba(104, 20, 138, 0.66);
    }
    &:focus {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        outline: none; 
    }
`;

const SignUpNav = styled(Link)`
    color: black;
    &:hover {
        background: none;
        color: rgba(104, 20, 138, 0.66);
    }
`;

const PasswordWrapper = styled.div`
     position: relative;
`;

const EyeIcon = styled.div`
    position: absolute;
    right: 30px;
    top: 35%;
    transform: trasnlateY(-50%);
    cursor: pointer;
    color: black;

    &:hover {
        color: rgba(104, 20, 138, 0.66);
    }
`;

const Error = styled.p`
    color: rgba(208, 36, 36, 0.66);
`;

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
        <LoginStyle onSubmit={loggingIn}>
            Login Page
            {errorMessage && (
                <Error>{errorMessage}</Error>
            )}
            <UserInput
                placeholder="email" type="email" value={email} onChange={changeEmail} />

            <PasswordWrapper>
                <UserInput
                    placeholder="password" type={showPassword ? "text" : "password"} value={password} onChange={changePassword} />

                <EyeIcon onClick={changePasswordVisibility}>
                    { showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </EyeIcon>
            </PasswordWrapper>

            <LoginButton type="submit">Log In!</LoginButton>

            <SignUpNav to='/SignUp'>
                <SignUpButton>
                    No account? Sign up here!
                </SignUpButton>
            </SignUpNav>
        </LoginStyle>
    );
}

export default Login;