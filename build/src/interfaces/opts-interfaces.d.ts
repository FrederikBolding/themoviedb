export interface AppendToResponse {
    append_to_response?: string;
}
export interface SessionId {
    session_id: string;
}
export interface PageOpts {
    page?: string;
}
export interface AccountOpts extends SessionId, PageOpts {
}
export interface AccountSortedOpts extends SessionId, PageOpts {
    sort_by?: 'created_at.asc' | 'created_at.desc';
}
declare enum ExternalId {
    IMDB = "imdb_id",
    FREEBASE_M = "freebase_mid",
    FREEBASE = "freebase_id",
    TVDB = "tvdb_id",
    TVRAGE = "tvrage_id",
    FACEBOOK = "facebook_id",
    TWITTER = "twitter_id",
    INSTAGRAM = "instagram_id"
}
export interface FindOpts {
    external_source: ExternalId;
}
export interface KeywordsOpts {
    include_adult?: boolean;
}
export declare type MoviesOpts = AppendToResponse;
export declare type AccountSateOpts = SessionId;
export interface AccountSateGuestOpts extends SessionId {
    guest_session_id?: string;
}
export interface AlternativeTitlesOpts {
    country?: string;
}
export interface ChangesOpts extends PageOpts {
    end_date?: string;
    start_date?: string;
}
export interface DiscoverOpts extends PageOpts {
    sort_by?: string;
    'air_date.gte'?: string;
    'air_date.lte'?: string;
    'first_air_date.gte'?: string;
    'first_air_date.lte'?: string;
    first_air_date_year?: number;
    timezone?: string;
    'vote_average.gte'?: number;
    'vote_count.gte'?: number;
    with_genres?: string;
    with_networks?: string;
    without_genres?: string;
    'with_runtime.gte'?: number;
    'with_runtime.lte'?: number;
    include_null_first_air_dates?: boolean;
    with_original_language?: string;
    without_keywords?: string;
    screened_theatrically?: boolean;
    with_companies?: string;
    with_keywords?: string;
}
export interface GuestSessionOpts {
    sort_by?: 'created_at.asc' | 'created_at.desc';
}
export interface ListItemStatusOpts {
    movie_id: number;
}
export interface AddListOpts extends SessionId {
    name: string;
    description: string;
}
export interface MovieChangesOpts extends PageOpts {
    start_date?: string;
    end_date?: string;
}
export interface MovieImagesOpts {
    include_image_language?: string;
}
export interface UpcomingOpts extends PageOpts {
    region?: string;
}
export declare type PeopleOpts = AppendToResponse;
export interface PeopleChangesOpts extends PageOpts {
    start_date?: string;
    end_date?: string;
}
export declare type TVOpts = AppendToResponse;
export declare type SeasonOpts = AppendToResponse;
export declare type EpisodeOpts = AppendToResponse;
export interface SearchOpts extends PageOpts {
    query: string;
}
export interface SearchMoviesOpts extends SearchOpts {
    include_adult?: boolean;
    region?: string;
    year?: number;
    primary_release_year?: number;
}
export interface SearchPeopleOpts extends SearchOpts {
    include_adult?: boolean;
    region?: string;
}
export interface SearchShowsOpts extends SearchOpts {
    include_adult?: boolean;
    first_air_date_year?: number;
}
export {};
