//tarotjournal - individual saved reading 
//displays cards and text box
//use it to write and reflect on how the cards can apply to your situation
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
`;

function Journal() {
    return (
        <Wrapper>
            this is the journal for a saved reading
        </Wrapper>
    );
}

export default Journal;