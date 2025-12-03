import { useState } from "react";
import { auth } from '../firebase';
import styled from 'styled-components';

const Wrapper = styled.div`
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
`;

function SignUp () {
    return (
        <Wrapper>
            sign up page
            <UserInput placeholder="name"></UserInput>
            <UserInput placeholder="email"></UserInput>
            <UserInput placeholder="password"></UserInput>
            <SignUpButton> Sign Up Now!</SignUpButton>
        </Wrapper>
    );
}

export default SignUp;