import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {genreService} from "../../services/genreService";
import type {IGenre} from "../../interfaces";

interface IState{
    genres:IGenre[],
}

const initialState:IState ={
    genres:[]
};

const getAll = createAsyncThunk<IGenre[], void>(
    'genreSlice/getAll',
    async (_, {rejectWithValue}) =>{
        try {
            const {data} = await genreService.getAll();
            return data.genres
        } catch (e:any) {
            return rejectWithValue(e.response?.data || e.message);
        }
    }
)

const genreSlice = createSlice({
    name: 'genreSlice',
    initialState,
    reducers:{},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action)=>{
                state.genres = action.payload
            })

});
const {reducer:genreReducer, actions} = genreSlice;
const genreActions = {...actions, getAll}

export {genreReducer, genreActions}

