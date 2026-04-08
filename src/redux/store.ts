import {configureStore} from "@reduxjs/toolkit";
import {movieSlice} from "./slices/movieSlice";
import {genreReducer} from "./slices/genreSlice";

const store = configureStore({
    reducer:{
        movies: movieSlice.reducer,
        genres: genreReducer,

    }
});


export type RootState = ReturnType<typeof  store.getState>

export {store}