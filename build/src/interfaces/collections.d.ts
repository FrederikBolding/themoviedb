import { Results } from './generic';
export declare type Collections = Results<Collection>;
export interface Collection {
    id?: number;
    name?: string;
    overview?: string;
    poster_path?: string | null;
    backdrop_path?: string;
    parts?: CollectionPart[];
}
interface CollectionPart {
    adult?: boolean;
    backdrop_path?: null;
    genre_ids?: number[];
    id?: number;
    original_language?: string;
    original_title?: string;
    overview?: string;
    release_date?: string;
    poster_path?: string;
    popularity?: number;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}
export {};
