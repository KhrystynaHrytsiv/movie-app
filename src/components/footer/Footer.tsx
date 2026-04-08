import css from './Footer.module.css'
import {FaGithub, FaInstagram, FaLinkedin, FaTelegram} from "react-icons/fa";
import {SiThemoviedatabase} from 'react-icons/si';

const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={css.container}>
                <div className={css.general}>
                    <SiThemoviedatabase/>
                    <p> Discover movies, actors and ratings from all over the world</p>
                </div>
                <div className={css.linkContainer}>
                    <p>Social Media</p>
                    <div className={css.links}>
                        <a href="https://github.com/KhrystynaHrytsiv/" target="_blank" rel="noreferrer"><FaGithub/></a>
                        <a href="https://www.linkedin.com/in/khrystyna-hrytsiv-75b35038a/" target="_blank" rel="noreferrer"> <FaLinkedin/></a>
                        <a href="https://t.me/khrystynka_hrytsiv" target="_blank" rel="noreferrer"> <FaTelegram/></a>
                        <a href="https://www.instagram.com/khrystyna_hrytsiv?igsh=YTdwY2tudW5jeG5v/" target="_blank" rel="noreferrer"><FaInstagram/></a>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export {Footer};