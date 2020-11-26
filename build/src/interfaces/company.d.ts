import { Logo, Name, Results } from './generic';
export declare type Companies = Results<Company>;
export interface Company {
    description?: string;
    headquarters?: string;
    homepage?: string;
    id?: number;
    logo_path?: string;
    name?: string;
    origin_country?: string;
    parent_company?: null | Company;
}
export interface CompanyAlternativeNames {
    id?: number;
    results?: Name[];
}
export interface CompanyImages {
    id?: number;
    logos?: Logo[];
}
