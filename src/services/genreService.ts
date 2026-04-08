import {apiService} from "./apiService";
import {urls} from "./urls";
import type {IGenre, IRes} from "../interfaces";

const genreService ={
    getAll: ():IRes<{genres: IGenre[]}> => apiService.get(urls.genres),

}
export {genreService}
