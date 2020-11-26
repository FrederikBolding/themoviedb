import { Language } from './generic';
export interface Configuration {
    images?: ImagesConfiguration;
}
interface ImagesConfiguration {
    base_url?: string;
    secure_base_url?: string;
    backdrop_sizes?: string[];
    logo_sizes?: string[];
    poster_sizes?: string[];
    profile_sizes?: string[];
    still_sizes?: string[];
    change_keys?: string[];
}
export declare type Countries = Country[];
interface Country {
    iso_3166_1?: string;
    english_name?: string;
}
export declare type Jobs = Job[];
interface Job {
    department?: string;
    jobs?: string[];
}
export declare type Languages = Language[];
export declare type PrimaryTranslations = string[];
export declare type Timezones = Timezone[];
interface Timezone {
    iso_3166_1?: string;
    zones?: string[];
}
export {};
