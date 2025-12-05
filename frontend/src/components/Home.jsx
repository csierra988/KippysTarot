//the home page - welcomes user and has the start reading button
// hi y/a(if signed in), think of a question, set your intentions, and choose your reading type(?)
import styled from 'styled-components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 45px;
    min-height: 100vh;
    width: 100vw;
    margin-top: 40px;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
`;

const KippyBlock = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    background: black;
    height: 550px;
    margin: 40px;

    @media (max-width: 888px) {
        display: none;
    }
`;

const Text = styled.div`
    align-items: center;
    text-align: center;
    background-color: white;
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    border: 2px solid black;
    width: 550px;
    height: 100px;
    padding: 10px;
    color: black;
    font-weight: 420;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
`;

const ReadingButtons = styled.button`
    font-size: 1em;
    outline: none;
    border: none;
    height: 55px;
    width: 200px;
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
`;

const Navigate = styled(Link)`
    color: black;
    &:hover {
        background: none;
        color: rgba(104, 20, 138, 0.66);
    }
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
                         <p>hi {user?.displayName || ""}!</p>
                         <p>think of a question, set your intentions, and choose a reading!</p>
                    </Text>
                    <ReadingOptions>
                        <ReadingButtons>
                            <Navigate to='/Reading'> Three Card </Navigate>
                        </ReadingButtons>

                        <ReadingButtons>
                            Love
                        </ReadingButtons>

                        <ReadingButtons>
                            Career
                        </ReadingButtons>
                    </ReadingOptions>
                </Container>
            </Content>
        </Wrapper>
    );
}

export default Home;