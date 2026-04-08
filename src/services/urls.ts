const baseURL = import.meta.env.VITE_BASE_URL
export type MediaType = 'movie' | 'tv';
export type MediaList = | 'popular' | 'top_rated' | 'upcoming' | 'now_playing' | 'on_the_air' | 'airing_today';

const configuration = '/configuration'
const discover = (type:MediaType):string => `/discover/${type}`;
const list = (type:MediaType, list:MediaList):string => `${type}/${list}`;
const genres = '/genre/movie/list';
const search = '/search/multi';
const video=(id: number, type:MediaType):string => `/${type}/${id}/videos`
const images = (id:number, type:MediaType):string => `${type}/${id}/images`
const people =(id: number, type:MediaType): string=> `/${type}/${id}/credits`
const person = (id:number):string => `person/${id}`

const poster = `https://image.tmdb.org/t/p/w500`
const photo = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'

const urls ={
    discover, list, genres, search, video, images, people, configuration, person,
    byId: (id: number, type: MediaType): string => `/${type}/${id}`
}
 export {baseURL, urls, poster, photo}
