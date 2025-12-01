//contains the home menu, access to the history (tarot journal), sign in/sign out
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    color: white;
    font-size: 40px;
    cursor: pointer;
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
    background: white;
    top: 0;
    //-500 to not show it
    left: ${props => props.$isOpen ? '0' : '-500px'};
    width: 200px;
    height: 100vh;
    transition: left 0.3s ease;
    z-index: 200;
    padding: 80px 20px 20px;

    @media (max-width: 300px) {
        width: 220px;
    }

`;

const NavLink = styled(Link)`
    display: block;
    color: black;
    text-decoration: none;
    padding: 15px 20px;
    margin-bottom: 10px;
    border-radius: 8px;
    font-size: 1.1em;
    transition: background 0.2s;
    cursor: pointer;
    
    &:hover {
        background: none;
        color: black;
    }
`;

function Header() {
    //for hamburger style menu
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen(!isOpen);
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
                <NavLink to="/Reading" onClick={toggleMenu}> Three Card Reading</NavLink>
                <NavLink to="/" onClick={toggleMenu}> Home</NavLink>
                <NavLink to="/History" onClick={toggleMenu}> History</NavLink>
            </Menu>

        </div>
    )
}

export default Header;