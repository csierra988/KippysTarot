//the home page - welcomes user and has the start reading button
// hi y/n(if signed in), think of a question, set your intentions, and choose your reading type(?)
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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

    @media (max-width: 888px) {
        flex-direction: column;
        align-items: center;
    }
`;

const KippyBlock = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    background: black;
    height: 550px;
    margin: 40px;

    @media (max-width: 888px) {
        order: -1;
        width: 550px;
        height: 200px;
        padding-top: 40px;
        padding-bottom: 40px;
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
    padding-bottom: 20px;
`;

const ReadingButtons = styled.button`
    background-color: white;
    color: black;
    font-size: 1em;
    outline: none;
    border: 2px solid transparent;
    outline: none;
    height: 55px;
    width: 200px;
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

const Navigate = styled(Link)`
    color: black;
    &:hover {
        background: none;
        color: rgba(104, 20, 138, 0.66);
    }
`;

function Home() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <Wrapper>
                <div>is Loading</div>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <Content>
                <KippyBlock>
                    <p>meow its me kippy</p>
                </KippyBlock>

                <Container>
                    <Text>
                        <p>Hi {user?.displayName || "Friend"}!</p>
                        <p>Think of a question, set your intentions, and choose a reading!</p>
                    </Text>
                    <ReadingOptions>
                        <Navigate to='/Reading'>
                            <ReadingButtons>
                                General
                            </ReadingButtons>
                        </Navigate>

                        <ReadingButtons>
                            Love - tbd
                        </ReadingButtons>

                        <ReadingButtons>
                            Career - tbd
                        </ReadingButtons>

                    </ReadingOptions>
                </Container>
            </Content>
        </Wrapper>
    );
}

export default Home;