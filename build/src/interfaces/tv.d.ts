import { Company } from './company';
import { CastMember, CrewMember } from './credits';
import { EpisodeListResult, Genre, Results, TVListResult } from './generic';
import { Network } from './networks';
export declare type Shows = Results<TVListResult>;
export interface Show {
    backdrop_path?: string | null;
    created_by?: CastMember[];
    episode_run_time?: number[];
    first_air_date?: '2011-04-17';
    genres?: Genre[];
    homepage?: string;
    id?: number;
    in_production?: boolean;
    languages?: string[];
    last_air_date?: string;
    last_episode_to_air?: Episode;
    name?: string;
    next_episode_to_air?: null;
    networks?: Network[];
    number_of_episodes?: number;
    number_of_seasons?: number;
    origin_country?: string[];
    original_language?: string;
    original_name?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: Company[];
    seasons?: Season[];
    status?: string;
    type?: string;
    vote_average?: number;
    vote_count?: number;
}
export interface Season {
    air_date?: string;
    episode_count?: number;
    id?: number;
    name?: string;
    overview?: string;
    poster_path?: string;
    season_number?: number;
}
export interface SeasonWithEpisodes extends Season {
    _id: string;
    episodes: EpisodeWithExtras[];
}
export interface Episode {
    air_date?: string;
    episode_number?: number;
    id?: number;
    name?: string;
    overview?: string;
    production_code?: string;
    season_number?: number;
    show_id?: number;
    still_path?: string;
    vote_average?: number;
    vote_count?: number;
}
export interface EpisodeWithExtras extends Episode {
    crew?: CrewMember[];
    guest_stars?: CastMember[];
}
export interface TVChanges {
    changes?: TVChange[];
}
interface TVChange {
    key?: string;
    item?: TVChangeItem[];
}
interface TVChangeItem {
    id?: string;
    action?: string;
    time?: string;
}
export interface Ratings {
    id?: number;
    results?: Rating[];
}
interface Rating {
    iso_3166_1?: string;
    rating?: string;
}
export declare type Episodes = Results<EpisodeListResult>;
export declare type EpisodeGroups = Results<EpisodeGroup>;
export interface EpisodeGroup {
    description?: string;
    episode_count?: number;
    group_count?: number;
    groups?: Group[];
    id?: string;
    name?: string;
    network?: Network;
    type?: number;
}
interface Group {
    id?: string;
    name?: string;
    order?: number;
    episodes?: Episode[];
    locked?: boolean;
}
export interface SeasonChanges {
    changes?: SeasonChange[];
}
interface SeasonChange {
    key?: string;
    item?: SeasonChangeItem[];
}
interface SeasonChangeItem {
    id?: string;
    action?: string;
    time?: string;
    value?: string | EpisodeValue;
    iso_639_1?: string;
    original_value?: string;
}
interface EpisodeValue {
    episode_id?: number;
    episode_number?: number;
}
export interface SeasonAccountStates {
    id?: string;
    results?: SeasonState[];
}
interface SeasonState {
    id?: number;
    episode_number?: number;
    rated?: boolean | RateValue;
}
interface RateValue {
    value?: number;
}
export declare type ScreenedTheatrically = Results<EpisodeOrSeason>;
interface EpisodeOrSeason {
    id?: number;
    episode_number?: number;
    season_number?: number;
}
export {};
