import type {IGenre} from "./IGenre.ts";
import type {IVideo} from "./IVideo.ts";

export interface IMovie {
    id: number,
    original_title: string,
    name: string,
    genre_ids:number[],
    genres: IGenre[],
    overview: string,
    popularity: number
    poster_path: string,
    backdrop_path: string,
    release_date: string,
    runtime: string,
    tagline: string,
    title: string,
    status: string,
    vote_average: number,
    vote_count: number,
    video: IVideo[],
    first_air_date: string
}