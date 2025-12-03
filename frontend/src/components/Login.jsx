import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoginStyle = styled.div`
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

const SignUpButton = styled.button `
    justify-content: center;
    margin-top: 10px;
    background: rgba(255, 255, 255, 0.75);
`;

const SignUpNav = styled(Link) `
    color: black;
    &:hover {
        background: none;
        color: rgba(104, 20, 138, 0.66);
    }
`

function Login () {
    return (
        <LoginStyle>
            <LoginText>login page</LoginText>
            <UserInput placeholder="email"></UserInput>
            <UserInput placeholder="password"></UserInput>
            <SignUpButton>
                <SignUpNav to='/SignUp'>
                     no account? sign up here!
                </SignUpNav>
            </SignUpButton>
        </LoginStyle>
    );
}

export default Login;