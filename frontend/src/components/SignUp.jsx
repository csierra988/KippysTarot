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
    margin-bottom: 30px;
`;

const SignUpButton = styled.button`
    margin-top: 10px;
    background: rgba(255, 255, 255, 0.75);
    color: black;
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    &:hover {
        color: rgba(104, 20, 138, 0.66);
    }
`;


function SignUp () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
        }

    }

    return (
        <Wrapper onSubmit={signingUp}>
            sign up page
            <UserInput
                placeholder="name" type="text" value={name} onChange={changeName} />
            <UserInput 
                placeholder="email" type="email" value={email} onChange={changeEmail} />
            <UserInput 
                placeholder="password" type={showPassword ? "text" : "password"} value={password} onChange={changePassword} />

                { showPassword ? (
                    <FaRegEye onClick={changePasswordVisibility} />
                ) : (
                    <FaRegEyeSlash onClick={changePasswordVisibility}/>
                )}

            <SignUpButton type="submit"> Sign Up Now!</SignUpButton>
        </Wrapper>
    );
}

export default SignUp;