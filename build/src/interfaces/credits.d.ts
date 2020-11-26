import { Obj } from './generic';
export interface Credit {
    credit_type?: string;
    department?: string;
    job?: string;
    media?: Media;
    media_type?: string;
    id?: string;
    person?: Person;
}
interface Media {
    id?: number;
    name?: string;
    original_name?: string;
    character?: string;
    episodes?: Obj[];
    seasons?: Season[];
}
interface Season {
    air_date?: string;
    poster_path?: string;
    season_number?: number;
}
interface Person {
    name?: string;
    id?: number;
}
export interface Credits {
    id?: number;
    cast?: CastMember[];
    crew?: CrewMember[];
}
export interface CastMember {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number | null;
    id: number;
    name: string;
    order: number;
    profile_path: string | null;
}
export interface CrewMember {
    credit_id: string;
    department: string;
    gender: number | number;
    id: number;
    job: string;
    name: string;
    profile_path: string | null;
}
export {};
