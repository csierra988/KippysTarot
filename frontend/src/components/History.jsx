//history page - contains a list of a user saved readings
import { useState, useEffect } from 'react';
import { getReadings, deleteReading } from '../api';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthWithUid } from '../hooks/useAuth';
import { FaTrashCan } from "react-icons/fa6";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
    padding-top: 80px;
`;

const CenteredWrapper = styled.div`
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
    flex-direction: column;
`;

const HistoryText = styled.div`
    display: flex;
    width: 600px;
    height: 60px;
    margin: 20px auto 40px auto;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: black;
    background-color: rgba(255, 255, 255, 0.65);
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    padding: 10px;
    font-weight: 420;
    border-radius: 12px;
`;

const SavedReadingsList = styled.div`
    width: 80%;
    max-width: 800px;
    max-height: 60vh;
    overflow-y: scroll;
    margin: 0 auto;
    padding: 50px 60px;

    //adding scrollbar back for the list
    &::-webkit-scrollbar {
        display: block;
        width: 8px;
        height: 50px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(123, 68, 145, 0.6);
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(255,255,255,0.2);
    }
`;

const SavedReading = styled.div`
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 30px;
    text-align: left;
    font-weight: 420;
`;

const Navigate = styled(Link)`
    color: black;
    background: none;
    transition: color 0.2s ease;
`;

const LoginButton = styled.button`
    margin-top: 10px;
    background: rgba(255, 255, 255, 0.75);
    color: black;
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    outline: none;
    border: 2px solid transparent;
    &:hover {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        color: rgba(104, 20, 138, 0.66);
    }
    &:focus {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        outline: none; 
    }
`;

const BinIcon = styled.div`
    position: absolute;
    top: 50%;
    right: 40px;
    transform: translateY(-50%);
    cursor: pointer;
    color: black;
    z-index: 10;
    padding: 8px;
    transition: color 0.2s ease;

    &:hover {
       color: rgba(208, 36, 36, 0.66);
    }
`;

const ReadingWrapper = styled.div`
    position: relative;
    margin-bottom: 20px;
    transition: 0.25s all ease;

    &:hover {
        transform: scale(1.02);
        color: rgba(104, 20, 138, 0.66);

        ${BinIcon} {
            color: rgba(104, 20, 138, 0.66);

            &:hover {
                color: rgba(208, 36, 36, 0.66);
            }
        }
    }

    &:hover ${Navigate} {
        background: none;
        color: rgba(104, 20, 138, 0.66);
    }
    &:hover ${SavedReading} {
        filter: blur(0px);
        box-shadow: 
            0 15px 60px -10px rgba(147, 51, 234, 0.3),
            0 20px 100px -15px rgba(236, 72, 153, 0.2), 
            0 10px 40px -10px rgba(0, 0, 0, 0.15);
        transform: scale(1.02);
    }
`;

function History() {

    const { user, uid, isLoading } = useAuthWithUid();

    const [readings, setReadings] = useState([]);

    useEffect(() => {
        const fetchReadings = async () => {
            if (user) {
                try {
                    const response = await getReadings(uid);
                    setReadings(response);
                } catch (err) {
                    console.error('error getting readings:', err)
                }
            }
        };

        fetchReadings();
    }, [user]);

    const navigate = useNavigate();
    const loginPage = async ( event ) => {
        event.preventDefault();
        navigate('/Login');
    }

    if (!readings) {
        return (
            <Wrapper>
                <p>Loading...</p>
            </Wrapper>
        );
    }

    //user is not logged in 
    if (!user) {
        return (
            <CenteredWrapper>
                <HistoryText>
                    <p>Log in to view your past saved readings.</p>
                </HistoryText>

                <LoginButton onClick={loginPage}>
                    Log in Here!
                </LoginButton>
            </CenteredWrapper>
        );
    }

    if (isLoading) {
        return (<Wrapper>
            <p>Loading...</p>
            </Wrapper>);
    }

    const deletingReading = async ( readingId ) => {
        const confirmation = confirm("are you sure you want to delete this reading?");

        if (confirmation) {
            //delete the reading
            try {
               console.log(readingId);
               await deleteReading(readingId);
               console.log('successfully deleted reading ', readingId);

               setReadings(readings.filter(r => r.id !== readingId));

            } catch (err) {
                console.log('error with deleting reading: ', err);
            }
        }
    }

    return (
        <Wrapper>
            <Content>
            <HistoryText>
                Click to view on any of your past saved readings.
            </HistoryText>

            <SavedReadingsList>
                {readings.map((reading) => (
                    <ReadingWrapper key={reading.id}>
                    <Navigate to={`/Journal/${reading.id}`}>
                    <SavedReading key={reading.id}>
                            <p>{reading.title}</p>
                            <p>{new Date(reading.date).toLocaleDateString()}</p>
                    </SavedReading>
                    </Navigate>

                    <BinIcon onClick={(e) => deletingReading(reading.id, e)}>
                        <FaTrashCan />
                    </BinIcon>
                    </ReadingWrapper>
                ))}
            </SavedReadingsList>
            </Content>
        </Wrapper>
    );
}

export default History;