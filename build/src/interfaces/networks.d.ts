import { Logo, Name } from './generic';
export interface Network {
    headquarters?: string;
    homepage?: string;
    id?: number;
    name?: string;
    origin_country?: string;
}
export interface NetworkAlternativeNames {
    id: number;
    results: Name[];
}
export interface NetworkImages {
    id: number;
    logos: Logo[];
}
