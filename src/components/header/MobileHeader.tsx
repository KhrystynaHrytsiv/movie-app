import {PiTelevisionFill} from "react-icons/pi";
import {BiSolidMoviePlay} from "react-icons/bi";
import {MdHomeFilled} from "react-icons/md";
import {IoSearchOutline} from "react-icons/io5";
import {NavLink} from "react-router-dom";
import css from './Header.module.css'

const MobileHeader = () => {
    const navigation = [
        {label : "Home", href : "/", icon : <MdHomeFilled/>},
        {label : "Movies", href : "movie", icon : <BiSolidMoviePlay/>},
        {label : "TV Shows", href : 'tv', icon : <PiTelevisionFill/>},
        {label : "search", href : "/search", icon : <IoSearchOutline/>}
    ]
    
    return (
        <section className={css.section}>
        <div className={css.container}>
            {navigation.map(nav=>{
                    return(
                        <NavLink
                            key={nav.label} to={nav.href}
                            className={({isActive})=> `${css.link} ${isActive ? css.active : ''}`}>
                            <div className={css.iconM}>{nav.icon}</div>
                            <p className={css.label}>{nav.label}</p>
                        </NavLink>
                    )
                })
            }

        </div>
        </section>
    );
};

export {MobileHeader};