//user can change name, email, password, or delete account
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import { updateProfile, updateEmail } from 'firebase/auth';
import { updateUser } from '../api';

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
    outline: none;
    border: 2px solid transparent;
    margin-top: 10px;

    &:hover {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        color: rgba(104, 20, 138, 0.66);
    }

    &:focus {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        outline: none; 
    }
`;

const DeleteButton = styled.button`
    color: black;
    background: rgba(255, 255, 255, 0.75);
    outline: none;
    border: 2px solid transparent;
    margin-top: 10px;
    transition: background 0.2s ease, color 0.2s ease;
    &:hover {
        border: 2px solid rgba(118, 20, 20, 0.66); 
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

    const saveChanges = async (event) => {
        event.preventDefault();
        try {
            //firebase updates
            await updateProfile(user, {displayName: name});
            if (email != user.email) {
                await updateEmail(user, email);
            }

            //db updates
            await updateUser(user.uid, name, email);
            console.log('updated profile');
            alert('successfully updated profile!');
        } catch (err) {
            console.error('error updating profile: ', err);
            alert('failed to update profile!');
        }
    }

    const deleteProfile = async (event) => {
        const confirmation = confirm("are you sure you want to delete your account?");
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

            <SaveButton onClick={saveChanges}>Save changes</SaveButton>
            <DeleteButton onClick={deleteProfile}>Delete account</DeleteButton>

        </Wrapper>
    );
}

export default Profile;