import  {useEffect, useState} from 'react';
import {apiService, baseURL} from "../../services";
import {movieActions} from "../../redux/slices/movieSlice";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import css from './BackImage.module.css'
import {FaAngleRight, FaAngleLeft} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

const BackgroundImage = () => {
    const dispatch = useAppDispatch();
    const {movies, backImages} = useAppSelector(state => state.movies);
    const [currentImage, setCurrentImage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(movieActions.getMovieByType({type: 'movie', list: 'popular'}))
        fetchBackDropData()
    }, [dispatch]);

    const fetchBackDropData = async ()=>{
        try{
            const {data} = await apiService.get(`${baseURL}/configuration`);
            dispatch(movieActions.setBackImage(data.images.secure_base_url + 'original'))
        } catch (e) {
        }
    }

    const handleLeft =() =>{
        if(currentImage > 0){
            setCurrentImage(prev=> prev -1)
        }
    }
    const handleRight =() => {
        if (currentImage < movies.length -1) {
            setCurrentImage(prev => prev + 1)
        }
    }

    return (
        <section className={css.section}>
            <div className={css.wrapper}>
            {movies.map(movie =>
                <div className={css.bannerItem} style={{ transform : `translateX(-${currentImage * 100}%)`}}>
                    <img src={backImages + movie.backdrop_path} alt={movie.title} className={css.image}/>

                    <div className={css.buttonsWrapper}>
                        <button className={css.button} onClick={handleLeft}><FaAngleLeft /></button>
                        <button className={css.button} onClick={handleRight}><FaAngleRight/></button>
                    </div>

                    <div className={css.gradientOverlay}></div>
                    <div className={css.details}>
                        <div className={css.title}>{movie.title}</div>
                        <p className={css.overview}>{movie.overview}</p>
                        <div className={css.bannerStats}>
                            <p>Rating : {Number(movie.vote_average).toFixed(1)}+</p>
                            <span>|</span>
                            <p>View : {Number(movie.popularity).toFixed(0)}</p>
                        </div>
                        <button className={css.playButton} onClick={()=> navigate(`movie/${movie.id}/player`)}>Play Now</button>
                    </div>
                </div>)}
            </div>
        </section>
    );
};

export {BackgroundImage};