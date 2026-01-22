//contains the home menu, access to the history (tarot journal), sign in/sign out
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../api';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';

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
    color: rgba(255, 255, 255, 0.66);
   // color: rgba(123, 68, 145, 0.66);;
    font-size: 40px;
    cursor: pointer;
    margin-bottom: 8px;

    &:hover {
        background: none;
        color: rgba(123, 68, 145, 0.66);
       // color: rgba(104, 20, 138, 0.66);
    }
`;

const Title = styled(Link)`
    background: none;
    border: none;
    outline: none;
    padding: 20px;
    font-size: 30px;
    color: rgba(255, 255, 255, 0.66);
   // color: rgba(123, 68, 145, 0.66);
    cursor: pointer;

    &:hover {
        background: none;
        color: rgba(123, 68, 145, 0.66);
       // color: rgba(104, 20, 138, 0.66);
    }

    &:focus {
        background: none;
        outline: none;
    }
`;

//"dims" website when menu is toggled
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: ${props => props.$isOpen ? 'block' : 'none'};
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
    margin-top: 300px;
`;

const NavLink = styled(Link)`
    display: block;
    color: rgba(255, 255, 255, 0.66);
    // color: rgba(123, 68, 145, 0.66);
    text-decoration: none;
    padding: 15px 20px;
    margin-bottom: 10px;
    border-radius: 8px;
    font-size: 1.1em;
    transition: background 0.2s;
    cursor: pointer;
    
    &:hover {
        background: none;
        color: rgba(123, 68, 145, 0.66);
        // color: rgba(104, 20, 138, 0.66);
    }
`;

const LogOutButton = styled.button`
    display: block;
    color: rgba(255, 255, 255, 0.66);
    // color: rgba(123, 68, 145, 0.66);
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
        color: rgba(123, 68, 145, 0.66);
        // color: rgba(104, 20, 138, 0.66);
    }
`;

const LogOutPrompt = styled.dialog`
    color: black;
    background-color: white;
    outline: none;
    border: 2px solid transparent;
    border-radius: 12px;
    text-align: center;
    padding: 30px;
    width: 440px;
`;

const Button = styled.button`
    font-size: 1em;
    outline: none;
    border: 2px solid transparent;
    // height: 55px;
    // width: 200px;
    margin-left: 20px;
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, .15);
    background-color: rgba(255, 255, 255, 0.75);
    color: black;

    &:hover {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        color: rgba(104, 20, 138, 0.66);
    }

    &:focus {
        border: 2px solid rgba(104, 20, 138, 0.66); 
        outline: none; 
    }
`;

const ButtonBlock = styled.div`
    margin-top: 8px;
`;

function Header() {
    const [isOpen, setOpen] = useState(false);
    const dialogRef = useRef(null);

    const toggleMenu = () => {
        setOpen(!isOpen);
    };

    //if the user is logged in, use their information
    const { user, isLoading } = useAuth();

    const loggingOut = () => {
            logout();  
            dialogRef.current?.close();
    };

    return (
        <div>
            <LogOutPrompt ref={dialogRef}>
                <p>Are you sure you want to log out?</p>
                <ButtonBlock>
                    <Button onClick={loggingOut}>
                        Log out
                    </Button>
                    <Button onClick={() => dialogRef.current?.close()}>
                        Cancel
                    </Button>
                </ButtonBlock>
            </LogOutPrompt>
            <HeaderBlock>
                <MenuButton onClick={toggleMenu}> ☰ </MenuButton>
                <Title to="/">
                    Kippy's Tarot ⋆˙⟡
                </Title>
            </HeaderBlock>

            <Overlay $isOpen={isOpen} onClick={toggleMenu} />

            <Menu $isOpen={isOpen} onClick={toggleMenu}>
                <NavLink to="/" onClick={toggleMenu}> Home</NavLink>
                {/* <NavLink to="/Reading" onClick={toggleMenu}> Three Card Reading</NavLink> */}
                <NavLink to="/History" onClick={toggleMenu}> History</NavLink>
                <NavLink to="/Profile" onClick={toggleMenu}>Profile</NavLink>

                {/* when a user is logged in, show log out
                and vice versa */}
                <LoginPlacement>
                    {user ? (
                        <LogOutButton onClick={() => dialogRef.current?.showModal()}>Logout</LogOutButton>
                    ) : (
                        <NavLink to="/Login" onClick={toggleMenu}>Login</NavLink>
                    )}
                </LoginPlacement>
            </Menu>

        </div>
    );
}

export default Header;