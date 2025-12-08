//communication between the frontend and backend
import axios from 'axios';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

const API_BASE_URL = 'http://localhost:3000';

//sign up using firebase and then store in database
export const signUp = async ( name, email, password ) => {
    try{
        const userData = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile( userData.user, {
            displayName: name,
        });
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

//signs the user out with firebase
export const logout = async () => {
    try {
        await auth.signOut();
    } catch (err) {
        console.error('error with log out:', err);
        throw err;
    }
};

//save a reading(ids of 3 cards) for a user with a title
export const saveReading = async ( firebase_uid, title, card1, card2, card3 ) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/readings`, {
            firebase_uid,
            title,
            card1,
            card2,
            card3
        });
        return response.data;
    } catch (err) {
        console.error('error with saving reading:', err);
        throw err;
    }
};

//return all of the readings for the given user
export const getReadings = async ( firebase_uid ) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/readings/${firebase_uid}`);
        console.log('retrieved readings from user');
        return response.data;

    } catch (err) {
        console.error('error with getting saved readings:', err);
        throw err;
    }
};

export const deleteReading = () => {
    //do later after setting up history page
};