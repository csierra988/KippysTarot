//contains the home menu, access to the history (tarot journal), sign in/sign out
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../api';
import { useAuth } from '../hooks/useAuth';
import Button from './ui/Button';

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
            <dialog ref={dialogRef} className="text-black bg-white outline-none border-2 border-solid border-transparent rounded-panel text-center p-[30px] w-[440px]">
                <p>Are you sure you want to log out?</p>
                <div className="mt-[8px]">
                    <Button onClick={loggingOut} className="text-[1em] ml-[20px]">
                        Log out
                    </Button>
                    <Button onClick={() => dialogRef.current?.close()} className="text-[1em] ml-[20px]">
                        Cancel
                    </Button>
                </div>
            </dialog>
            {/* HeaderBlock */}
            <div className="absolute top-0 left-0 right-0 h-[50px] bg-header shadow-surface text-black flex items-center py-0 px-[20px] z-100">
                <div onClick={toggleMenu} className="bg-none border-none text-panel text-[40px] cursor-pointer mb-[8px] hover:bg-none hover:text-navigation-accent"> ☰ </div>
                <Link to="/" className="bg-none border-none outline-none p-[20px] text-[30px] text-panel cursor-pointer hover:bg-none hover:text-navigation-accent">
                    Kippy's Tarot ⋆˙⟡
                </Link>
            </div>

            {/* Overlay */}
            <div onClick={toggleMenu} className={`fixed inset-0 bg-[rgba(0,0,0,0.4)] z-150 ${isOpen ? 'block' : 'hidden'}`}/>
            
            {/* Menu */}
            <div className={`fixed bg-drawer shadow-surface top-0 ${isOpen ? 'left-0' : 'left-[-500px]'} w-[200px] h-full transition-[left] duration-[0.3s] ease-[ease] z-200 pt-[80px] px-[20px] pb-[20px] [@media(max-width:300px)]:w-[220px]`}>
                <Link to="/" onClick={() => setOpen(false)} className="block text-panel px-[20px] py-[15px] mb-[10px] rounded-control text-[1.1em] transition-[background] duration-[0.2s] cursor-pointer hover:bg-none hover:text-accent ease-[ease]"> Home</Link>
                {/* <NavLink to="/Reading" onClick={toggleMenu}> Three Card Reading</NavLink> */}
                <Link to="/History" onClick={() => setOpen(false)} className="block text-panel px-[20px] py-[15px] mb-[10px] rounded-control text-[1.1em] transition-[background] duration-[0.2s] cursor-pointer hover:bg-none hover:text-accent ease-[ease]"> History</Link>
                <Link to="/Profile" onClick={() => setOpen(false)} className="block text-panel px-[20px] py-[15px] mb-[10px] rounded-control text-[1.1em] transition-[background] duration-[0.2s] cursor-pointer hover:bg-none hover:text-accent ease-[ease]">Profile</Link>

                {/* when a user is logged in, show log out
                and vice versa */}
                <div className="relative mt-[300px]">
                    {user ? (
                        <button type="button" onClick={() => {setOpen(false); dialogRef.current?.showModal();}} className="block bg-transparent border-0 shadow-none px-[20px] py-[15px] mb-[10px] rounded-control text-[1.1em] text-panel transition-[background] duration-200 ease-[ease] hover:text-accent focus:border-none focus:outline-none">Logout</button>
                    ) : (
                        <Link to="/Login" onClick={() => setOpen(false)} className="block text-panel px-[20px] py-[15px] mb-[10px] rounded-control text-[1.1em] transition-[background] duration-[0.2s] cursor-pointer hover:bg-none hover:text-accent ease-[ease]">Login</Link>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Header;