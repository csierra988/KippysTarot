//history page - contains a list of a user saved readings
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getReadings } from '../api';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
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

    return (
        <Wrapper>
            <p>this is the history page. view any of your past saved readings.</p>
            <div>
                {readings.map((reading, index) => (
                    <div key={index}>
                        <p>{reading.title}</p>
                        <p>{new Date(reading.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </Wrapper>
    );
}

export default History;