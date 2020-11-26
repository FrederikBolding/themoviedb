import { PersonListResult, Results } from './generic';
export declare type People = Results<PersonListResult>;
export interface Person {
    birthday?: string | null;
    known_for_department?: string;
    deathday?: string | null;
    id?: number;
    name?: string;
    also_known_as?: string[];
    gender?: number;
    biography?: string;
    popularity?: number;
    place_of_birth?: string | null;
    profile_path?: string | null;
    adult?: boolean;
    imdb_id?: string;
    homepage?: string | null;
}
export interface PeopleChanges {
    changes?: Changes[];
}
interface Changes {
    key?: string;
    items?: Change[];
}
interface Change {
    id?: string;
    action?: string;
    time?: string;
    original_value?: OriginalValue;
}
interface OriginalValue {
    profile?: Profile;
}
interface Profile {
    file_path?: string;
}
export interface PopularPeople {
    page?: number;
    results: PersonListResult[];
}
export {};
