import { Results } from './generic';
export declare type Changes = Results<Change>;
interface Change {
    id?: number;
    adult?: boolean | null;
}
export {};
