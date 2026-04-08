import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {useSearchParams} from "react-router-dom";
import css from './Pagination.module.css';
import {movieActions} from "../../redux/slices/movieSlice";
import {useWindowWidth} from "../../hook/adaptiveWidth";

const Pagination = () => {
    const [, setQuery] = useSearchParams({page:'1'});
    const { page, total_page } = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const width = useWindowWidth()

    const WINDOW_SIZE =  width < 500 ? 3 : width < 900 ? 6 :10;
    const step =  width < 500 ? 2 :5;

    let startPage = Math.floor((page - 1) / step) * step + 1;
    let endPage = startPage + WINDOW_SIZE - 1;

    if (endPage > total_page) endPage = total_page;

    const pages = [];
    for (let i = startPage; i <= endPage; i++) pages.push(i);

    const changePage = (pageNumber: number) => {
        dispatch(movieActions.setPage(pageNumber))
        setQuery({ page: pageNumber.toString() });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={css.pagination}>
            <button disabled={page === 1} onClick={() => changePage(page - 1)} className={css.button}>Prev</button>
            {pages.map(p => (
                <button key={p} onClick={() => changePage(p)} className={`${css.button} ${p === page ? css.active : ''}`}>{p}</button>
            ))}
            <button disabled={page === total_page} onClick={() => changePage(page + 1)} className={css.button}>Next</button>
        </div>
    );
};

export {Pagination};