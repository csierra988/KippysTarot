//communication between the frontend and backend
import axios from 'axios';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const API_BASE_URL = 'http://localhost:3000';

//sign up using firebase and then store in database
export const signUp = async ( name, email, password ) => {
    try{
        const userData = await createUserWithEmailAndPassword(auth, email, password);
        const firebase_uid = userData.user.uid;

        const response = await axios.post(`${API_BASE_URL}/users`, {
            firebase_uid,
            email,
            name
        });
        return response.data;
    } catch (err) {
        console.error('error with sign up: ', err);
        throw err;
    }
};

//login with email/password using firebase
export const login = async ( email, password ) => {
    try {
        const userData = await signInWithEmailAndPassword(auth, email, password);
        return userData.user;
    } catch (err) {
        console.error('error with login: ', err);
        throw err;
    }
};

export const logout = async () => {
    try {
        await auth.signOut();
    } catch (err) {
        console.error('error with log out:', err);
        throw err;
    }
};