import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { signUp } from "../api";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import TextInput from "./ui/TextInput";
import Button from "./ui/Button";


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
        <form onSubmit={signingUp} className="flex flex-col justify-center items-center min-h-screen w-screen">
            <p style={{ color: "black" }}>Sign Up Page</p>
            {errorMessage && (
                <p className="text-error">{errorMessage}</p>
            )}
            <TextInput
                placeholder="name" type="text" value={name} onChange={changeName} />
            <TextInput 
                placeholder="email" type="email" value={email} onChange={changeEmail} />
            
            <div className="relative">
                <TextInput 
                placeholder="password" type={showPassword ? "text" : "password"} value={password} onChange={changePassword} />

                <div onClick={changePasswordVisibility} className="absolute right-[30px] top-[55%] translate-y-[-50%] cursor-pointer text-black hover:text-accent">
                    { showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
            </div>

            <Button type="submit" className="mt-[10px]"> Sign Up Now!</Button>
        </form>
    );
}

export default SignUp;