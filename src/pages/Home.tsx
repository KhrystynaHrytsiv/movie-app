import  {useEffect, useState} from 'react';
import {movieService} from "../services";
import {BackgroundImage, Slider} from "../components";
import type {IMovie} from "../interfaces";


const Home = () => {
    const [nowPlaying, setNowPlaying] = useState<IMovie[]>([]);
    const [popular, setPopular] = useState<IMovie[]>([]);
    const [topRated, setTopRated] =useState<IMovie[]>([]);
    const [upcoming, setUpcoming] = useState<IMovie[]>([]);

    useEffect(() => {
        movieService.getMovieByType('movie','now_playing').then(({data})=>setNowPlaying(data.results))
        movieService.getMovieByType('tv','popular').then(({data})=>setPopular(data.results))
        movieService.getMovieByType('movie','top_rated').then(({data})=> setTopRated(data.results))
        movieService.getMovieByType('tv','top_rated').then(({data})=> setUpcoming(data.results))

    }, []);
    return (
        <div>
            <BackgroundImage/>
            <Slider movies={nowPlaying} title={'Now Playing Movies'}/>
            <Slider movies={popular} title={'Popular TV Shows'}/>
            <Slider movies={topRated} title={'Top Rated Movies'}/>
            <Slider movies={upcoming} title={'Top Rated TV Shows'}/>
        </div>
    );
};

export {Home};
