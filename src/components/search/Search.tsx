import {type SyntheticEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {movieActions, selectMoviesByPage} from "../../redux/slices/movieSlice";
import {useSearchParams} from "react-router-dom";
import {MovieCard, Pagination} from '..';
import css from './Search.module.css';
import cs1 from '../movies/Movies.module.css';

const Search = () => {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchStart, setSearchStart] = useState(false)

    const {searchQuery, loading} = useAppSelector(state => state.movies);
    const page = +(searchParams.get('page') ?? 1);
    const movies = useAppSelector(selectMoviesByPage(page));

    const handleSearch = (e:SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;
        dispatch(movieActions.setSearchQuery(trimmed));
        setSearchParams({ page: '1' });
        setSearchStart(true)
    };

    useEffect(() => {
        if (!searchQuery) return;
        if (movies.length === 0) {
            dispatch(movieActions.search({ query: searchQuery, page }));
        }
    }, [dispatch, searchQuery, page]);

    return (
        <div>
            <form onSubmit={handleSearch} className={css.search}>
                <div className={css.container}>
                    <input type="text" value={query} placeholder="Search" className={css.input}
                        onChange={e => setQuery(e.target.value)}/>
                    <button className={css.button}>Search</button>
                </div>
            </form>
            {loading && searchStart ? (<div className={css.loading}>Loading...</div>)
                :
                <div className={css.wrapper}>
                    <div className={cs1.Movies} style={{flex: '1'}}>
                        {movies.length > 0 ? (movies.map(movie => <MovieCard key={movie.id} movie={movie}/>))
                            : searchQuery ? (<h2>🔍 No results found</h2>)
                                : null}
                    </div>
                    <div className={css.pagination}><Pagination/></div>
                </div>}
        </div>
    );

};
export {Search}