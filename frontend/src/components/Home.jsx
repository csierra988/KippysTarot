//the home page - welcomes user and has the start reading button
// hi y/a(if signed in), think of a question, set your intentions, and choose your reading type(?)
import styled from 'styled-components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
`;

function Home() {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    //if the user is logged in, use their information
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsub();
    }, []);
    // const currUser = auth.currentUser;
    // const userName = currUser?.displayName || "";

    return (
        <Wrapper>
            <p>hi {user?.displayName || ""}!</p>
            <p>this is the home page</p>
        </Wrapper>
    );
}

export default Home;