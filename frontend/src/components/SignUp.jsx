import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signUp } from "../api";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Wrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
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

const SignUpButton = styled.button`
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

const PasswordWrapper = styled.div`
    position: relative;
`;

const EyeIcon = styled.div`
    position: absolute;
    right: 30px;
    top: 55%;
    transform: translateY(-50%);
    cursor: pointer;
    color: black;

    &:hover {
        color: rgba(104, 20, 138, 0.66);
    }
`;

const Error = styled.p`
    color: rgba(208, 36, 36, 0.66);
`;


function SignUp () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    //setting the values using the user input
    const changeName = ( event ) => {
        setName(event.target.value);
    };
    const changeEmail = ( event ) => {
        setEmail(event.target.value);
    };
    const changePassword = ( event ) => {
        setPassword(event.target.value);
    };

    const changePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const signingUp = async ( event ) => {
        //preventing form from submitting 
        event.preventDefault();
        try {
            await signUp(name, email, password);
            console.log('user registered successfully in both firebase and database');
            //taking user to home page
            navigate('/');
        } catch (err) {
            console.error('signup error: ', err);
            switch(err.code) {
                case 'auth/email-already-in-use':
                    setErrorMessage('Email already in use!');
                    break;
            }
        }

    }

    return (
        <Wrapper onSubmit={signingUp}>
            Sign Up Page
            {errorMessage && (
                <Error>{errorMessage}</Error>
            )}
            <UserInput
                placeholder="name" type="text" value={name} onChange={changeName} />
            <UserInput 
                placeholder="email" type="email" value={email} onChange={changeEmail} />
            
            <PasswordWrapper>
                <UserInput 
                placeholder="password" type={showPassword ? "text" : "password"} value={password} onChange={changePassword} />

                <EyeIcon onClick={changePasswordVisibility}>
                    { showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </EyeIcon>
            </PasswordWrapper>

            <SignUpButton type="submit"> Sign Up Now!</SignUpButton>
        </Wrapper>
    );
}

export default SignUp;