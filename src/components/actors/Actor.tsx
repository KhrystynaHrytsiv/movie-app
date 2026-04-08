import {useAppSelector} from "../../hook/reduxHooks";
import {poster, photo} from "../../services";
import css from './Actor.module.css'

const Actor = () => {
    const {actor} = useAppSelector(state => state.movies);

    return (
        <div>
            {actor && (
                <div className={css.actorBlock}>
                    <img src={actor.profile_path ? `${poster}/${actor.profile_path}` : photo} alt={actor.name} className={css.actorImage}/>
                    <div className={css.actorContent}>
                        <h2 className={css.actorName}>{actor.name}</h2>
                        <p className={css.actorBio}>{actor.biography || 'Biography not available'}</p>
                        <div className={css.actorMeta}>
                            {actor.birthday && <span>🎂 {actor.birthday}</span>}
                            {actor.place_of_birth && <span>📍 {actor.place_of_birth}</span>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export {Actor};