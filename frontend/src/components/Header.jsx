//contains the home menu, access to the history (tarot journal), sign in/sign out
import { useState } from 'react'
import styled from 'styled-components';

const Navigation = styled.ul`
    display: flex;
    width: 100%;
    height: 50px;
    margin: 0;
    background-color: blue;
`;

function Header() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    //takes in the previous state to toggle the menu 
    const toggleMenu = () => setIsMenuVisible((prev) => !prev);

    return (
        <div>
            <Navigation>
                "this is the header"
            </Navigation>
        </div>
    )
}

export default Header;