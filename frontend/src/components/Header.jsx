//contains the home menu, access to the history (tarot journal), sign in/sign out
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../api';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styled from 'styled-components';

const HeaderBlock = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: #3F5EFB;
    background: rgba(252, 70, 107, 0.25);
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    color: black;
    display: flex;
    align-items: center;
    padding: 0 20px;
    z-index: 100;
`;

const MenuButton = styled.div`
    background: none;
    border: none;
    color: rgba(123, 68, 145, 0.66);;
    font-size: 40px;
    cursor: pointer;
    margin-bottom: 8px;

    &:hover {
        background: none;
        color: rgba(104, 20, 138, 0.66);
    }
`;

const Title = styled(Link)`
    background: none;
    border: none;
    padding: 20px;
    font-size: 30px;
    color: rgba(123, 68, 145, 0.66);
    cursor: pointer;

    &:hover {
        background: none;
        color: rgba(104, 20, 138, 0.66);
    }
`;

//"dims" website when menu is toggled
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: ${props => props.$isOpen ? 'block' : 'none' };
    z-index: 150;
`;

const Menu = styled.div`
    position: fixed;
    background: rgba(231, 184, 206, 1);
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    top: 0;
    //-500 to not show it
    left: ${props => props.$isOpen ? '0' : '-500px'};
    width: 200px;
    height: 100%;
    transition: left 0.3s ease;
    z-index: 200;
    padding: 80px 20px 20px;

    @media (max-width: 300px) {
        width: 220px;
    }

`;

const LoginPlacement = styled.div`
    position: relative;
    margin-top: 200px;
`;

const NavLink = styled(Link)`
    display: block;
    color: rgba(123, 68, 145, 0.66);
    text-decoration: none;
    padding: 15px 20px;
    margin-bottom: 10px;
    border-radius: 8px;
    font-size: 1.1em;
    transition: background 0.2s;
    cursor: pointer;
    
    &:hover {
        background: none;
        color: rgba(104, 20, 138, 0.66);
    }
`;

const LogOutButton = styled.button`
    display: block;
    color: rgba(123, 68, 145, 0.66);
    text-decoration: none;
    padding: 15px 20px;
    margin-bottom: 10px;
    border-radius: 8px;
    font-size: 1.1em;
    transition: background 0.2s;
    cursor: pointer;
    background: none;
    border: none;
    
    &:hover {
        outline: none;
        border: none;
        color: rgba(104, 20, 138, 0.66);
    }
`;

function Header() {
    const [isOpen, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const auth = getAuth();

    const toggleMenu = () => {
        setOpen(!isOpen);
    };

    //if the user is logged in, use their information
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const loggingOut = () => {
        const conf = window.confirm('are you sure you want to log out?');
        if (conf) {
            logout();
        }
    };

    return (
        <div>
            <HeaderBlock>
                <MenuButton onClick={toggleMenu}> ☰ </MenuButton>
                <Title to="/">
                    KIPPYS TAROT
                </Title>
            </HeaderBlock>

            <Overlay $isOpen={isOpen} onClick={toggleMenu}/>

            <Menu $isOpen={isOpen} onClick={toggleMenu}>
                <NavLink to="/" onClick={toggleMenu}> Home</NavLink>
                <NavLink to="/Reading" onClick={toggleMenu}> Three Card Reading</NavLink>
                <NavLink to="/History" onClick={toggleMenu}> History</NavLink>
                <NavLink to="/Profile" onClick={toggleMenu}>Profile</NavLink>

                {/* when a user is logged in, show log out
                and vice versa */}
                <LoginPlacement>
                    { user ? (
                        <LogOutButton onClick={loggingOut}>Logout</LogOutButton>
                    ) : (
                        <NavLink to="/Login" onClick={toggleMenu}>Login</NavLink>
                    )}
                </LoginPlacement>
            </Menu>

        </div>
    );
}

export default Header;