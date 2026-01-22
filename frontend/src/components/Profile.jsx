//user can change name, email, password, or delete account
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile, updateEmail, EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail } from 'firebase/auth';
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

const Button = styled.button`
    color: black;
    background: rgba(255, 255, 255, 0.75);
    outline: none;
    border: 2px solid transparent;
    margin-top: 10px;
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);

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
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    &:hover {
        border: 2px solid rgba(118, 20, 20, 0.66); 
        color: white;
        background: rgba(208, 36, 36, 0.66);
    }
    &:focus {
        border: 2px solid rgba(208, 36, 36, 0.66);
        outline: none; 
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

const DialogPrompts = styled.dialog`
    color: black;
    background-color: white;
    outline: none;
    border: 2px solid transparent;
    border-radius: 12px;
    text-align: center;
    padding: 30px;
   // position: fixed;
    width: 440px;

    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
`;

const ButtonBlock = styled.div`
    margin-top: 8px;
    display: flex;
    justify-content: center;
    gap: 15px;
`;

function Profile() {
    const { user, isLoading } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const dialogRef = useRef(null);
    const dialogConfirmation = useRef(null);
    const dialogDeletion = useRef(null);
    const navigate = useNavigate();

    const loginPage = async (event) => {
        event.preventDefault();
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

    const changePassword = async (event) => {
        setPassword(event.target.value);
    }

    const saveChanges = async (event) => {
        event.preventDefault();
        try {
            //   const password = prompt("please enter in your password to proceed with the changes");
            const credential = EmailAuthProvider.credential(user.email, password);
            reauthenticateWithCredential(user, credential);
            //firebase updates
            await updateProfile(user, { displayName: name });
            if (email != user.email) {
                await verifyBeforeUpdateEmail(user, email);
                alert('verify the link sent to your new email to proceed. (check spam folder!)');
                //await updateEmail(user, email);
            }

            //db updates
            await updateUser(user.uid, name);
            console.log('updated profile');
            //alert('successfully updated profile!');
        } catch (err) {
            console.error('error updating profile: ', err);
            //alert('failed to update profile!');
        }
        dialogRef.current?.close();
    }

    const deleteProfile = async (event) => {
        event.preventDefault();
        
            try {
                const credential = EmailAuthProvider.credential(user.email, password);
                reauthenticateWithCredential(user, credential);

                await deleteUserProfile(user, user.uid);
                console.log('deleted profile');

                await logout();
                navigate('/');
            } catch (err) {
                console.error('error deleting profile: ', err);
            }

            dialogDeletion.current?.close();
            dialogConfirmation.current?.close();
        
    }

    return (
        <>
            <DialogPrompts ref={dialogRef}>
                <p>Please enter in your password to proceed with the changes.</p>
                <form onSubmit={saveChanges}>
                    <UserInput type='password' placeholder='password' value={password} onChange={changePassword} />
                    <ButtonBlock>
                        <Button type="submit">
                            Save
                        </Button>
                        <Button onClick={() => dialogRef.current?.close()}>
                            Cancel
                        </Button>
                    </ButtonBlock>
                </form>
            </DialogPrompts>

            <DialogPrompts ref={dialogConfirmation}>
                <p>Are you sure you want to delete your account?</p>
                <ButtonBlock>
                    <Button onClick={() => dialogDeletion.current?.showModal()}>
                        Yes
                    </Button>
                    <Button onClick={() => dialogConfirmation.current?.close()}>
                        Cancel
                    </Button>
                </ButtonBlock>
            </DialogPrompts>

            <DialogPrompts ref={dialogDeletion}>
                <p>Please enter your password to proceed with deletion.</p>
                <form onSubmit={deleteProfile}>
                <UserInput type='password' placeholder='password' value={password} onChange={changePassword} />
                <ButtonBlock>
                    <DeleteButton type='submit'>
                        Delete account
                    </DeleteButton>
                    <Button onClick={() => {
                        dialogDeletion.current?.close();
                        dialogConfirmation.current?.close();
                    }}>
                        Cancel
                    </Button>
                </ButtonBlock>
                </form>
            </DialogPrompts>

            <Wrapper>
                <ProfileText>
                    <p style={{ color: "black" }}>Meow! This is your profile! Change your name and email here if you wish.</p>
                </ProfileText>

                <Content>
                    <p style={{ color: "black" }}>Your name: </p>
                    <UserInput value={name} placeholder={"Your name"} onChange={changeName} />

                    <p style={{ color: "black" }}>Your email: </p>
                    <UserInput value={email} placeholder={"Your email"} onChange={changeEmail} />

                </Content>

                <Button onClick={(event) => {
                    event.preventDefault();
                    dialogRef.current?.showModal();
                }}>Save changes</Button>
                <DeleteButton onClick={(event) => {
                    event.preventDefault();
                    dialogConfirmation.current?.showModal();
                }}>Delete account</DeleteButton>

            </Wrapper>
        </>
    );
}

export default Profile;