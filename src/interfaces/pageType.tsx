import {type FC, useEffect} from "react";
import type {MediaType} from "../services";
import {useAppDispatch, useAppSelector} from "../hook/reduxHooks";
import {useSearchParams} from "react-router-dom";
import {movieActions} from "../redux/slices/movieSlice";
import {Actor, MovieCard, Pagination, Sorting} from "../components";

import css from '../components/movies/Movies.module.css'

const MediaPage: FC<{type:MediaType}> = ({ type }) => {
    const { filter, genreId, actorId, rating, year, page: reduxPage } = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams({ page: '1' });

    const urlPage = +(query.get('page') ?? 1);
    const page = reduxPage !== urlPage && reduxPage === 1 ? reduxPage : urlPage;

    useEffect(() => {
        if (!query.get('page')) setQuery({ page: '1' });
        dispatch(
            movieActions.getAll({type, params: {page,
                    genreId: genreId ?? undefined,
                    actorId: actorId ?? undefined,
                    rating: rating ?? undefined,
                    year: year ?? undefined,
                },
            })
        )
    }, [dispatch, page, genreId, actorId, rating, year, type]);

    return (
        <div className={css.content}>
            <div className={css.filters}><Sorting type={type} /></div>
            {actorId && <Actor />}

            <div className={css.Movies}>
                {filter.map(m => (<MovieCard key={m.id} movie={m} />))}
            </div>

            <div className={css.paginationWrapper}><Pagination/></div>
        </div>
    );
};

export {MediaPage}