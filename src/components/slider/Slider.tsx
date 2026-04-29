import {type FC, useEffect, useRef, useState} from 'react';
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

    const [cardWidth, setCardWidth] = useState(0);
    const [visibleCards, setVisibleCards] = useState(1);
    useEffect(() => {
        if (!movies) return;
        if (!sliderRef.current) return;
        const firstCard = sliderRef.current.children[0] as HTMLElement;
        if (!firstCard) return;
        const width = firstCard.offsetWidth;
        setCardWidth(width);
        const containerWidth = sliderRef.current.parentElement?.offsetWidth || 0;
        setVisibleCards(Math.floor(containerWidth / width) - 2);
    }, [movies]);


    const handleRight = () => {
        if (index < movies.length - visibleCards ) {
            setIndex(prev => prev + 1);
        }
    };
    const handleLeft = () => {
        if (index > 0) {
            setIndex(prev => prev - 1)
        }
    };

    return (
        <section className={css.sliderContainer} onMouseEnter={()=>setShowControls(true)} onMouseLeave={()=>setShowControls(false)}>
            <h2>{title}</h2>
            <div className={css.wrapper}>
                {index > 0 && <AiOutlineLeft onClick={handleLeft} className={`${css.buttons} ${css.left} ${!showControls ? css.hidden : ''}`}/>}
                <div className={css.slider} ref={sliderRef} style={{ transform : `translateX(-${index * cardWidth}px)`}}>
                {movies && movies.map(movie=><MovieCard movie={movie} key={movie.id} />)}
                </div>
                {index < movies.length - visibleCards  &&<AiOutlineRight onClick={handleRight} className={`${css.buttons} ${css.right} ${!showControls ? 'none' : ''}`}/>}
            </div>
        </section>
    );
};

export {Slider};

