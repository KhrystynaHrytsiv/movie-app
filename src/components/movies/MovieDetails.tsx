import {type FC, useEffect} from "react";
import {type MediaType, photo, poster} from "../../services";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {useNavigate, useParams} from "react-router-dom";
import {movieActions} from "../../redux/slices/movieSlice";
import {Gallery} from "../gallery";
import css from './Details.module.css'
import {FaArrowLeftLong} from "react-icons/fa6";
import {useWindowWidth} from "../../hook/adaptiveWidth";
import type {IMovie} from "../../interfaces";


interface IProps {
    movie:IMovie
}

const MovieDetails: FC<IProps> = ({movie}) => {
    const {id, poster_path, backdrop_path, overview, release_date, vote_average, popularity, title, genres, runtime, name, tagline, vote_count, status, first_air_date} = movie;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {actors} = useAppSelector(state => state.movies);
    const { type } = useParams<{ type: MediaType }>();

    useEffect(() => {
        if(id && type){
            dispatch(movieActions.getVideo({id, type}));
            dispatch(movieActions.getImages({id, type}));
            dispatch(movieActions.getActors({id, type}))
        }
    }, [id, type, dispatch]);


    const sortingGenres = (genreName: string, genreId: number) => {
        if (!type) return
        dispatch(movieActions.setGenre(genreId));
        dispatch(movieActions.getAll({type, params:{page: 1, genreId }}));
        dispatch(movieActions.setPage(1));
        navigate(`/${type}/${genreName}`);
    };


    const sortingMoviesByActors = (actorId:number, actorsName:string)=>{
        if (!type) return
        dispatch(movieActions.setActorId(actorId));
        dispatch(movieActions.getActorsInfo({ id: actorId }));
        dispatch(movieActions.getAll({type, params:{page:1, actorId}}));
        dispatch(movieActions.setPage(1));
        navigate(`/${type}/${actorsName}`)
    }


    return (
        <div className={css.main}>
            <div className={css.background}>
                <div className={css.imageContainer}>
                    {useWindowWidth() < 900 && <div onClick={() => navigate(-1)} className={css.arrow}><FaArrowLeftLong/> </div>}
                    <img src={`${poster}/${backdrop_path}`} alt={title} className={css.movieBackground}/>
                </div>
                <div className={css.black}></div>
            </div>
            <div className={css.posterContainer}>
                <div className={css.moviePoster}>
                    <img src={`${poster}/${poster_path}`} alt={title} className={css.poster}/>
                    <button className={css.play} onClick={()=>navigate(`/${type}/${id}/player`)}>Play Now</button>
                </div>
                <div className={css.details}>
                    <h2 className={css.title}>{title || name}</h2>
                    <p>{tagline}</p>
                    <hr/>
                    <div className={css.numbers}>
                        <p>Rating: {Number(vote_average).toFixed(1)}+</p>
                        <span>|</span>
                        <p> View : {vote_count}</p>
                        {runtime && <span>|</span>}
                        {runtime && <p>Duration: {runtime}</p>}
                    </div>
                    <hr/>
                    <div>
                        <h3 className={css.overview}>Overview</h3>
                        <p>{overview}</p>
                        <hr/>
                        <h4 className={css.genres}>
                            Genres: {genres.map(genre => (
                            <p key={genre.id} onClick={() => sortingGenres(genre.name, genre.id)}> {genre.name}  </p>))}</h4>
                        <hr/>
                        <div className={css.status}>
                            <p>Status : {status}</p>
                            <span>|</span>
                            <p>Release Date : {release_date || first_air_date}</p>
                            <span>|</span>
                            <p>Popularity : {popularity}</p>
                        </div>
                        <hr/>
                    </div>
                    <Gallery/>
                    <hr/>
                    <h2 className={css.hActors}>Actors :</h2>
                    <div className={css.blockCast}>
                        {actors && actors.slice(0, 18).map(actor => (
                            <div key={actor.id} onClick={() => sortingMoviesByActors(actor.id, actor.name)}>
                                <div><img src={actor.profile_path ? `${poster}/${actor.profile_path}` : photo} alt={actor.name} className={css.actors}/></div>
                                <p className={css.actorsName}>{actor.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export {MovieDetails};
