import {useEffect, useRef, useState} from 'react';
import {useAppSelector} from "../../hook/reduxHooks";
import {ArrowBackIosNew, ArrowForwardIos} from "@mui/icons-material";
import {poster} from "../../services";
import css from './Gallery.module.css';

const Gallery = () => {
    const {images} = useAppSelector(state => state.movies);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const itemRef = useRef<HTMLDivElement | null>(null);

    const [index, setIndex] = useState(0);
    const [step, setStep] = useState(0);
    const [visible, setVisible] = useState(1);

    const maxIndex = Math.max(0, images.slice(0, 10).length - visible);

    useEffect(() => {
        if (!containerRef.current || !itemRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = itemRef.current.offsetWidth;
        setStep(itemWidth);
        setVisible(Math.floor(containerWidth / itemWidth));
    }, [images]);

    const handleLeft = () => {
        setIndex(prev => Math.max(prev - 1, 0));
    };

    const handleRight = () => {
        setIndex(prev => Math.min(prev + 1, maxIndex));
    };

    return (
        <div className={css.gallery}>
            <div className={css.wrapper}>
            {index > 0 && (<ArrowBackIosNew className={css.arrowL} onClick={handleLeft}/>)}
            <div ref={containerRef}>
                <div className={css.inner} style={{transform: `translateX(-${index * step}px)`}}>
                    {images.map((img, i) => (
                        <div key={img.id} className={css.imageContainer} ref={i === 0 ? itemRef : null}>
                            <img src={`${poster}/${img.file_path}`} className={css.images} alt=""/>
                        </div>
                    ))}
                </div>
            </div>
            {index < maxIndex && (<ArrowForwardIos className={css.arrowR} onClick={handleRight}/>)}
            </div>
        </div>
    );
};

export {Gallery};