export declare type ID = number;
export declare type Obj = Record<string, unknown>;
export interface ErrorResponse {
    status_message: string;
    status_code: number;
}
export interface Logo {
    aspect_ratio: number;
    file_path: string;
    height: number;
    id: string;
    file_type: '.svg' | '.png';
    vote_average: number;
    vote_count: number;
    width: number;
}
export interface Name {
    name: string;
    type: string;
}
export interface Language {
    iso_639_1: string;
    english_name: string;
    name: string;
}
export interface Genre {
    id: number;
    name: string;
}
export interface MovieListResult {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    release_date: string;
    poster_path: string | number;
    popularity: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
export interface MovieListResultWithMediaType extends MovieListResult {
    media_type: 'movie';
}
export interface TVListResult {
    poster_path: string | null;
    popularity: number;
    id: number;
    backdrop_path: string | null;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}
export interface TVListResultWithMediaType extends TVListResult {
    media_type: 'tv';
}
export interface PersonListResult {
    profile_path: string | null;
    adult: boolean;
    id: number;
    known_for: MovieListResultWithMediaType | TVListResultWithMediaType;
    name: string;
    popularity: number;
}
export interface EpisodeListResult {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: null | string;
    season_number: number;
    show_id: number;
    still_path: string | number;
    vote_average: number;
    vote_count: number;
    rating: number;
}
export interface Images {
    id: number;
    backdrops: Image[];
    posters: Image[];
}
export interface ProfileImages {
    id: number;
    profiles: Image[];
}
export declare type TaggedImages = Results<TaggedImage>;
export interface StillImages {
    id: number;
    stills: Image[];
}
export interface Image {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: null;
    vote_average: number;
    vote_count: number;
    width: number;
}
export interface TaggedImage extends Image {
    image_type: string;
    media: MovieListResult | TVListResult;
    media_type: string;
}
export interface Video {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: VideoSize;
    type: VideoType;
}
declare type VideoSize = 360 | 480 | 720 | 1080;
declare type VideoType = 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Opening Credits' | 'Behind the Scenes' | 'Bloopers' | 'Recap';
export interface Translations {
    id: number;
    translations: Translation[];
}
export interface Translation {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: TranslationData;
}
interface TranslationData {
    title: string;
    overview: string;
    homepage: string;
    biography: string;
}
export declare type MediaType = 'all' | 'movie' | 'tv' | 'person';
export declare type TimeWindow = 'day' | 'week';
export interface Results<T> {
    page: number;
    results: T[];
    total_page: number;
    total_results: number;
}
export declare type Multi = MovieListResult | TVListResult | PersonListResult;
export declare type MultiResults = Results<Multi>;
export {};
