import {createHashRouter} from "react-router-dom";
import {Home, MainPage, MovieDetailsPage, Movies, Player, TVShows} from "../pages";
import {movieService} from "../services";
import { Search } from "../components";


const router = createHashRouter([
    {path: '', element:<MainPage/>  , children:[
            {index:true, element:<Home/>},
            {path: 'movie', element:<Movies/>},
            {path: 'movie/:genreName', element:<Movies/>},
            {path: ':type/:id/:name', element:<MovieDetailsPage/>, loader: ({params:{id, type}}) => movieService.getById(+id!, type as 'movie' | 'tv')},
            {path: 'tv', element:<TVShows/>},
            {path: 'tv/:genreName', element:<TVShows/>},
            {path: 'search', element:<Search/>},
            {path: ':type/:id/player', element:<Player/>}
        ]}
]
);

export {router}