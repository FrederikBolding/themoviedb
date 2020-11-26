import { MovieListResult, Results } from './generic';
export interface Keyword {
    id?: number;
    name?: string;
}
export declare type Keywords = Results<Keyword>;
export declare type KeywordMovies = Results<MovieListResult>;
