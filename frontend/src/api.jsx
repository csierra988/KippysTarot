//communication between the frontend and backend
import axios from 'axios';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, deleteUser } from 'firebase/auth';

//production
const API_BASE_URL = 'https://kippys-tarot-backend.vercel.app/api';

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

//update name and/or email for a user
export const updateUser = async ( firebase_uid, name, email ) => {
    try {
         const response = await axios.put(`${API_BASE_URL}/users/${firebase_uid}`, {
            name: name, email: email
         });
         return response.data;
    } catch (err) {
        console.error('error with updating profile: ', err);
        throw err;
    }
};

//delete a users profile
export const deleteUserProfile = async( user, firebase_uid ) => {
    try {
        //delete from firebase auth
        await deleteUser(user);

        //delete from db
        const response = await axios.delete(`${API_BASE_URL}/users/${firebase_uid}`);
        console.log('user profile deleted!');
        return response.data;
    } catch (err) {
        console.error('error with deleting user: ', err);
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

//return a reading by its id
export const getReading = async ( firebase_uid, readingId ) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/readings/reading/${readingId}`, {
            params: {firebase_uid}
        });
        console.log('retrieved reading by id');
        return response.data;
    } catch (err) {
        console.error('error with retrieving reading', err);
        throw err;
    }
};

//update/save a journal entry for a reading
export const saveEntry = async ( entry, readingId ) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/readings/reading/${readingId}`, 
            {journal_entry: entry});
        console.log('saved entry');
        return response.data;
    } catch (err) {
        console.error('error with saving entry: ', err);
        throw err;
    }
};

//delete a reading and its information
export const deleteReading = async ( readingId ) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/readings/${readingId}`);
            console.log('reading deleted');
            return response.data;
        } catch(err) {
            console.error('error with deleting reading: ', err);
            throw err;
        }
};