import {apiService} from "./apiService";
import {type MediaType, urls, type MediaList} from "./urls";
import type {IImage, IMovie, IPagination, IParams, IActor, IPerson, IRes, IVideo} from "../interfaces";


const movieService ={
    getMovieByType:(type:MediaType, list:MediaList): IRes<IPagination<IMovie>> => apiService.get(urls.list(type, list)),
    getById:(id: number,type:MediaType):IRes<IMovie> => apiService.get(urls.byId(id, type)),
    search: (query:string, page: number): IRes<IPagination<IMovie>> => apiService.get(urls.search, {params:{query, page}}),
    video: (id:number, type:MediaType):IRes<{results: IVideo[]}> => apiService.get(urls.video(id, type)),
    images: (id:number, type:MediaType):IRes<{backdrops: IImage[]}> => apiService.get(urls.images(id, type)),
    people: (id:number, type:MediaType):IRes<{cast: IActor[]}> => apiService.get(urls.people(id, type)),
    person: (id: number):IRes<IPerson> => apiService.get(urls.person(id)),

    getAll: (type:MediaType,{page, genreId, actorId, rating, year,}:IParams): IRes<IPagination<IMovie>> => {
        const params: any = {
            page,
            ...(genreId && { with_genres: genreId }),
            ...(actorId && {with_cast: actorId}),
            ...(rating && { 'vote_average.gte': rating }),
            ...(year && {[type === 'movie' ? 'primary_release_year' : 'first_air_date_year']: year }),
        };
        return apiService.get(urls.discover(type), { params });
    },
}

export {movieService}

