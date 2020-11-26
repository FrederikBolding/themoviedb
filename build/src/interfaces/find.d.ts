import { MovieListResult, Obj, PersonListResult, TVListResult } from './generic';
export interface Found {
    movie_results?: MovieListResult[];
    tv_results?: TVListResult[];
    person_results?: PersonListResult[];
    tv_episode_results?: Obj[];
    tv_season_results?: Obj[];
}
