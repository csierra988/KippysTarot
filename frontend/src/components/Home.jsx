//the home page - welcomes user and has the start reading button
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
`;

function Home() {

    return (
        <Wrapper>
            this is the home page
        </Wrapper>
    );
}

export default Home;