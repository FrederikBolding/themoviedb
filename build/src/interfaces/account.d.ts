export interface Account {
    avatar?: Avatar;
    id?: number;
    iso_639_1?: string;
    iso_3166_1?: string;
    name?: string;
    include_adult?: boolean;
    username?: string;
}
interface Avatar {
    gavatar?: Gravatar;
}
interface Gravatar {
    hash?: string;
}
export {};
