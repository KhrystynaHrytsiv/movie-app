import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hook/reduxHooks";
import {movieActions} from "../redux/slices/movieSlice";
import {useNavigate, useParams} from "react-router-dom";
import {BsArrowLeft} from "react-icons/bs";
import type {MediaType} from "../services";
import css from '../components/Player.module.css'


const Player = () => {
    const {video} = useAppSelector(state => state.movies);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { type } = useParams<{ type: MediaType }>();
    const {id} = useParams();
    const movieId = Number(id)
    useEffect(() => {
        if (!type) return;

        if(movieId){
            dispatch(movieActions.getVideo({id: movieId, type}))
        }
    }, [movieId, type, dispatch]);

    return (
        <div className={css.block}>
            <BsArrowLeft onClick={()=> navigate(-1)} className={css.arrow}/>
            {video && video.filter(v => v.site === 'YouTube' && v.type === 'Trailer').length > 0 ? (
                    video.filter(v => v.site === 'YouTube' && v.type === 'Trailer').slice(0, 1).map(v => (
                        <div className={css.player}>
                            <iframe key={v.id} src={`https://www.youtube.com/embed/${v.key}`} title={v.name} allowFullScreen></iframe>
                        </div>)))
                : (<h1>Trailer not found</h1>)}
        </div>
    );
};

export {Player};