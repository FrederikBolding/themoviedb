import { Language, MovieListResult, Obj, Results, Video } from './generic';
import { Keyword } from './keywords';
import { Review } from './reviews';
export declare type Movies = Results<MovieListResult>;
export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: null | Obj;
    budget: number;
    genres: Genre[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompany[];
    production_Countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: Language[];
    status: STATUS;
    tagline: string | null;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
declare enum STATUS {
    RUMORED = "Rumored",
    PLANNED = "Planned",
    IN_PRODUCTION = "In Production",
    POST_PRODUCTION = "Post Production",
    RELEASED = "Released",
    CANCELED = "Canceled"
}
interface Genre {
    id: number;
    name: string;
}
interface ProductionCompany {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
}
interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}
export interface AccountState {
    id: number;
    favorite: boolean;
    rated: boolean | Movie;
    watchlist: boolean;
}
export interface AlternativeTitles {
    id: number;
    titles: AlternativeTitle;
}
interface AlternativeTitle {
    iso_3166_1: string;
    title: string;
    type: string;
}
export interface MovieChanges {
    changes: MovieChange[];
}
interface MovieChange {
    key: string;
    item: MovieChangeItem[];
}
interface MovieChangeItem {
    id: string;
    action: string;
    time: string;
    iso_639_1: string;
    value: string;
    original_value: string;
}
export interface ExternalIds {
    imdb_id: string;
    facebook_id: string;
    instagram_id: string;
    twitter_id: string;
    id: number;
}
export interface MovieKeywords {
    id: number;
    keywords: Keyword[];
}
export interface MovieReleaseDates {
    id: number;
    results: MovieReleaseDate[];
}
export interface MovieReleaseDate {
    iso_3166_1: string;
    releaseDates: ReleaseDate[];
}
interface ReleaseDate {
    certification: string;
    iso_639_1: string;
    release_date: string;
    type: number;
    note: string;
}
export interface MovieVideos {
    id: string;
    results: Video[];
}
export declare type MovieReviews = Results<Review>;
export declare type MovieLists = Results<Obj>;
export {};
