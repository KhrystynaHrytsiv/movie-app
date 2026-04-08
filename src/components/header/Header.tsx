import {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import css from './Header.module.css'
import {SiThemoviedatabase} from "react-icons/si";
import {useAppDispatch} from "../../hook/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import type {FC} from "react";

interface IProp {
    isScrolled: boolean
}

const Header:FC<IProp> = ({isScrolled}) => {
    const [theme, setTheme] = useState('light');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        document.body.className = theme === 'light' ? css.light : css.dark;
    }, [theme]);

    const changeTheme = ()=>{
        setTheme(prev =>(prev=== 'light' ? 'dark': 'light') )
    }


    return (
        <div className={`${css.header} ${isScrolled ? css.scrolled : ''}`}>
            <div className={css.nav}>
                <SiThemoviedatabase onClick={() => navigate('/')} className={css.icon}/>
                <Link to={'movie'} onClick={() => dispatch(movieActions.reset())}>Movies</Link>
                <Link to={'tv'} onClick={() => dispatch(movieActions.reset())}>TV Shows</Link>
                <Link to={'search'}>Search</Link>
                <div onClick={changeTheme}>{theme === 'light' ? '🌙' : '☀️'} Theme</div>
            </div>
        </div>
    );
};

export {Header};