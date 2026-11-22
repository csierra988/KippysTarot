//user can change name, email, password, or delete account
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile, updateEmail, EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail } from 'firebase/auth';
import { updateUser, deleteUserProfile, logout } from '../api';
import Button from './ui/Button';
import TextInput from './ui/TextInput';

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
        // Wrapper
        return (<div className="flex flex-col justify-center items-center min-h-screen w-screen">
            <p>Loading...</p>
        </div>);
    }

    if (!user) {
        return (<div className="flex flex-col justify-center items-center min-h-screen w-screen">
            {/* ProfileText */}
            <div className="flex w-[600px] h-[60px]  mt-[20px] mx-auto mb-[40px] justify-center items-center text-center text-black bg-panel shadow-surface p-[10px] font-[420] rounded-panel">
                <p>To view your profile, you must be logged in!</p>
            </div>
            {/* LoginButton */}
            <Button onClick={loginPage} className="mt-[10px]">Log in Here!</Button>
        </div>);
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
            <dialog className="text-black bg-white outline-none border-2 border-solid border-transparent rounded-panel text-center p-[30px] w-[440px]" ref={dialogRef}>
                <p>Please enter in your password to proceed with the changes.</p>
                <form onSubmit={saveChanges}>
                    <TextInput type='password' placeholder='password' value={password} onChange={changePassword} />
                    {/* ButtonBlock */}
                    <div className="mt-[8px] flex justify-center gap-[15px]">
                        <Button className="mt-[10px]" type="submit">
                            Save
                        </Button>
                        <Button className="mt-[10px]" onClick={() => dialogRef.current?.close()}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </dialog>

            <dialog className="text-black bg-white outline-none border-2 border-solid border-transparent rounded-panel text-center p-[30px] w-[440px]" ref={dialogConfirmation}>
                <p>Are you sure you want to delete your account?</p>
                {/* ButtonBlock */}
                <div className="mt-[8px] flex justify-center gap-[15px]">
                    <Button className="mt-[10px]" onClick={() => dialogDeletion.current?.showModal()}>
                        Yes
                    </Button>
                    <Button className="mt-[10px]" onClick={() => dialogConfirmation.current?.close()}>
                        Cancel
                    </Button>
                </div>
            </dialog>

            <dialog className="text-black bg-white outline-none border-2 border-solid border-transparent rounded-panel text-center p-[30px] w-[440px]" ref={dialogDeletion}>
                <p>Please enter your password to proceed with deletion.</p>
                <form onSubmit={deleteProfile}>
                <TextInput type='password' placeholder='password' value={password} onChange={changePassword} />
                {/* ButtonBlock */}
                <div className="mt-[8px] flex justify-center gap-[15px]">
                    <Button className="mt-[10px] transition-[background,color] duration-200 ease-[ease] hover:border-danger-border hover:text-white hover:bg-error focus:border-error" type='submit'>
                        Delete account
                    </Button>
                    <Button className="mt-[10px]" onClick={() => {
                        dialogDeletion.current?.close();
                        dialogConfirmation.current?.close();
                    }}>
                        Cancel
                    </Button>
                </div>
                </form>
            </dialog>

            <form className="flex flex-col justify-center items-center min-h-screen w-screen">
                {/* ProfileText */}
                <div className="flex w-[600px] h-[60px]  mt-[20px] mx-auto mb-[40px] justify-center items-center text-center text-black bg-panel shadow-surface p-[10px] font-[420] rounded-panel">
                    <p style={{ color: "black" }}>Meow! This is your profile! Change your name and email here if you wish.</p>
                </div>

                <div>
                    <p style={{ color: "black" }}>Your name: </p>
                    <TextInput value={name} placeholder={"Your name"} onChange={changeName} />

                    <p style={{ color: "black" }}>Your email: </p>
                    <TextInput value={email} placeholder={"Your email"} onChange={changeEmail} />

                </div>

                <Button className="mt-[10px]" onClick={(event) => {
                    event.preventDefault();
                    dialogRef.current?.showModal();
                }}>Save changes</Button>
                {/* DeleteButton */}
                <Button className="mt-[10px] transition-[background,color] duration-200 ease-[ease] hover:border-danger-border hover:text-white hover:bg-error focus:border-error" onClick={(event) => {
                    event.preventDefault();
                    dialogConfirmation.current?.showModal();
                }}>Delete account</Button>

            </form>
        </>
    );
}

export default Profile;