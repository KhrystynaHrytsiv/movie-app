import {useEffect, useState} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {Header, Footer} from "../components";
import {MobileHeader} from "../components/header/MobileHeader";

const MainPage = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const isPlayerPage = location.pathname.includes(`/player`);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.pageYOffset !== 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div style={{display: "flex", flexDirection: 'column', position: 'relative', minHeight: '100vh'}}>
            {!isPlayerPage && <Header isScrolled={isScrolled}/>}
            {!isPlayerPage && <MobileHeader/>}
            <main style={{flex: '1'}}><Outlet/></main>
           <Footer/>
        </div>
    );
};

export {MainPage};