import { MovieListResult, Results } from './generic';
export declare type Lists = Results<List>;
export interface List {
    created_by?: string;
    description?: string;
    favorite_count?: number;
    id?: string;
    items?: MovieListResult[];
    item_count?: number;
    iso_639_1?: string;
    name?: string;
    poster_path?: string | null;
}
export interface ListItemStatus {
    id?: string;
    item_present?: boolean;
}
export interface AddListResponse {
    status_message?: string;
    success?: boolean;
    status_code?: number;
    list_id?: number;
}
