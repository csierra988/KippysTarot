//history page - contains a list of a user saved readings
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getReadings } from '../api';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
    padding-top: 80px;
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
    margin: 30px auto 40px auto;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.65);
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    padding: 10px;
    font-weight: 420;
`;

const SavedReadingsList = styled.div`
    width: 80%;
    max-width: 800px;
    max-height: 60vh;
    overflow-y: auto;
    margin: 0 auto;
    padding: 20px;

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
    margin-bottom: 16px;
    text-align: left;
    font-weight: 420;
    &:hover {
        filter: blur(0px);
        box-shadow: 0 4px 20px rgba(0,0,0,0.25);
        transform: scale(1.03);
        transition: 0.25s all ease;
    }
`;

const Navigate = styled(Link)`
    color: black;
    &:hover {
        background: none;
        color: rgba(104, 20, 138, 0.66);
    }
`;

const LoginButton = styled.button`
    margin-top: 10px;
    background: rgba(255, 255, 255, 0.75);
    color: black;
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    &:hover {
        color: rgba(104, 20, 138, 0.66);
    }
`;

function History() {
    const [user, setUser] = useState(null);
    const [uid, setUid] = useState(null);
    const auth = getAuth();
    
    //if the user is logged in, use their information
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setUid(currentUser.uid);
        });
    
        return () => unsub();
    }, []);

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
    const loginPage = () => {
        navigate('/Login');
    }

    //user is not logged in 
    if (!user) {
        return (
            <Wrapper>
                <HistoryText>
                    <p>log in to view your past saved readings</p>
                </HistoryText>

                <LoginButton onClick={loginPage}>
                    log in here!
                </LoginButton>

            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Content>
            <HistoryText>
                <p>click to view on any of your past saved readings.</p>
            </HistoryText>

            <SavedReadingsList>
                {readings.map((reading) => (
                    <SavedReading key={reading.id}>
                        <Navigate to={`/Journal/${reading.id}`}>
                            <p>{reading.title}</p>
                            <p>{new Date(reading.date).toLocaleDateString()}</p>
                        </Navigate>
                    </SavedReading>
                ))}
            </SavedReadingsList>
            </Content>
        </Wrapper>
    );
}

export default History;