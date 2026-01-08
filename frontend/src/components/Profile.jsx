//user can change name, email, password, or delete account
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile, updateEmail } from 'firebase/auth';
import { updateUser, deleteUserProfile, logout } from '../api';

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

const ProfileText = styled.div`
    display: flex;
    width: 600px;
    height: 60px;
    margin: 20px auto 40px auto;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: black;
    background-color: rgba(255, 255, 255, 0.65);
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    padding: 10px;
    font-weight: 420;
    border-radius: 12px;
`;

function Profile () {
    const { user, isLoading } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();
    const loginPage = () => {
        navigate('/Login');
    }

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
            <ProfileText>
                <p>To view your profile, you must be logged in!</p>
            </ProfileText>
                <LoginButton onClick={loginPage}>Log in Here!</LoginButton>
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
        event.preventDefault();
        const confirmation = confirm("are you sure you want to delete your account?");

        if (confirmation) {
            try {
                await deleteUserProfile(user, user.uid);
                console.log('deleted profile');
                alert('successfully deleted profile!');

                await logout();
                navigate('/');
            } catch (err) {
                console.error('error deleting profile: ', err);
                alert('failed to delete profile!');
            }
        }
    }

    return (
        <Wrapper>
            <ProfileText>
                <p style={{ color: "black" }}>Meow! This is your profile! Change your name and email here if you wish.</p>
            </ProfileText>

            <Content>
                <p style={{ color: "black" }}>Your name: </p>
                <UserInput value={name} placeholder={"Your name"} onChange={changeName}/>

                <p style={{ color: "black" }}>Your email: </p>
                <UserInput value={email} placeholder={"Your email"} onChange={changeEmail}/>

            </Content>

            <SaveButton onClick={saveChanges}>Save changes</SaveButton>
            <DeleteButton onClick={deleteProfile}>Delete account</DeleteButton>

        </Wrapper>
    );
}

export default Profile;