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

const Content = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
    margin-top: 60px;
`;

const KippyBlock = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    background: black;
    min-height: 400px;

    @media (max-width: 888px) {
        display: none;
    }
`;

const Text = styled.div`
    align-items: center;
    background-color: white;
    border: 2px solid black;
    width: 500px;
    height: 50px;
    padding: 10px;
    color: black;
`;

const Container = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
    padding: 10px;
`;

const ReadingOptions = styled.div`
`;

const ReadingButtons = styled.button`
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
            <Content>
                <KippyBlock>
                    <p>meow its me kippy</p>
                </KippyBlock>

                <Container>
                    <Text>
                         hi {user?.displayName || ""}!
                        this is the home page
                    </Text>
                </Container>
            </Content>
        </Wrapper>
    );
}

export default Home;