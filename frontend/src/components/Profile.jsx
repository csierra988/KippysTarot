//user can change name, email, password, or delete account
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from 'react';

const Wrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
`;

const Content = styled.div`
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

const SaveButton = styled.button`
    color: black;
    background: rgba(255, 255, 255, 0.75);

    margin-top: 10px;
`;

const DeleteButton = styled.button`
    color: black;
    background: rgba(255, 255, 255, 0.75);

    margin-top: 10px;
    transition: background 0.2s ease, color 0.2s ease;
    &:hover {
        color: white;
        background: rgba(208, 36, 36, 0.66);
    }
`;

function Profile () {
    const { user, isLoading } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (user) {
            setName(user?.displayName);
            setEmail(user?.email);
        }
    }, [user]); 

    if (isLoading) {
        return (<Wrapper>
            <p>Loading...</p>
        </Wrapper>);
    }

    if (!user) {
        return (<Wrapper>
            <p>You're not logged in!</p>
                <p>Log in here!</p>
        </Wrapper>);
    }

    const changeName = async (event) => {
        setName(event.target.value);
    }

    const changeEmail = async (event) => {
        setEmail(event.target.value);
    }

    return (
        <Wrapper>
            <p style={{ color: "black" }}>Meow! This is your profile!</p>

            <Content>
                <p>Your name: </p>
                <UserInput value={name} placeholder={"Your name"} onChange={changeName}/>

                <p>Your email: </p>
                <UserInput value={email} placeholder={"Your email"} onChange={changeEmail}/>

            </Content>

            <SaveButton>Save changes</SaveButton>
            <DeleteButton>Delete account</DeleteButton>

        </Wrapper>
    );
}

export default Profile;