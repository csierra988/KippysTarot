import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function useAuthWithUid() {
    const [user, setUser] = useState(null);
    const [uid, setUid] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const auth = getAuth();

    useEffect( () => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setUid(currentUser.uid)
            setIsLoading(false);
        })

        return () => unsub();
    }, []);

    return {user, uid, isLoading};
}

export function useAuth() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const auth = getAuth();

    useEffect( () => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
        })

        return () => unsub();
    }, []);

    return {user, isLoading};
}