import {type FC, useRef, useState} from 'react';
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import css from './Slider.module.css'
import {MovieCard} from "../movies";
import type {IMovie} from "../../interfaces";

interface IProp {
    movies:IMovie[],
    title:string
}

const Slider:FC<IProp> = ({movies, title}) => {
    const [index, setIndex] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const sliderRef = useRef<HTMLDivElement | null>(null);

    const getCardWidth = () => {
        if (!sliderRef.current) return 0;
        const firstCard = sliderRef.current.children[0] as HTMLElement;
        return firstCard?.offsetWidth || 0;
    };

    const getVisibleCards = () => {
        if (!sliderRef.current) return 1;
        const containerWidth = sliderRef.current.parentElement?.offsetWidth || 0;
        const cardWidth = getCardWidth();
        return Math.floor(containerWidth / cardWidth);
    };

    const handleLeft =() =>{
        if(index > 0){
            setIndex(prev=> prev -1)
        }
    }
    const handleRight =() => {
        if (index < movies.length ) {
            setIndex(prev => prev + 1)
        }
    }

    return (
        <section className={css.sliderContainer} onMouseEnter={()=>setShowControls(true)} onMouseLeave={()=>setShowControls(false)}>
            <h1>{title}</h1>
            <div className={css.wrapper}>
                {index > 0 && <AiOutlineLeft onClick={handleLeft} className={`${css.buttons} ${css.left} ${!showControls ? css.hidden : ''}`}/>}
                <div className={css.slider} ref={sliderRef} style={{ transform : `translateX(-${index * getCardWidth()}px)`}}>
                {movies.map(movie=><MovieCard movie={movie} key={movie.id} />)}
                </div>
                {index < 22 - getVisibleCards() &&<AiOutlineRight onClick={handleRight} className={`${css.buttons} ${css.right} ${!showControls ? 'none' : ''}`}/>}
            </div>
        </section>
    );
};

export {Slider};
