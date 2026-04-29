import {apiService} from "./apiService";
import {type MediaType, urls, type MediaList} from "./urls";
import type {IImage, IMovie, IPagination, IParams, IActor, IPerson, IRes, IVideo} from "../interfaces";


const movieService = {
    getMovieByType: async (type:MediaType, list:MediaList): IRes<IPagination<IMovie>> => await apiService.get(urls.list(type, list)),
    getById:async (id: number,type:MediaType):IRes<IMovie> => await apiService.get(urls.byId(id, type)),
    search: async (query:string, page: number): IRes<IPagination<IMovie>> => await apiService.get(urls.search, {params:{query, page}}),
    video: async (id:number, type:MediaType):IRes<{results: IVideo[]}> => await apiService.get(urls.video(id, type)),
    images: async (id:number, type:MediaType):IRes<{backdrops: IImage[]}> => await apiService.get(urls.images(id, type)),
    people: async (id:number, type:MediaType):IRes<{cast: IActor[]}> => await apiService.get(urls.actors(id, type)),
    person: async (id: number):IRes<IPerson> => await apiService.get(urls.person(id)),

    getAll: (type:MediaType,{page, genreId, actorId, rating, year,}:IParams): IRes<IPagination<IMovie>> => {
        const params = {
            page,
            ...(genreId && {with_genres: genreId}),
            ...(actorId && {with_cast: actorId}),
            ...(rating && { 'vote_average.gte': rating }),
            ...(year && {[type === 'movie' ? 'primary_release_year' : 'first_air_date_year']: year }),
        };
        return apiService.get(urls.discover(type), { params });
    },
}

export {movieService}


