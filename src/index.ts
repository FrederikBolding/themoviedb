import {
  AccountOpts,
  AccountSateGuestOpts,
  AccountSateOpts,
  AddListOpts,
  ChangesOpts,
  DiscoverOpts,
  EpisodeOpts,
  ListItemStatusOpts,
  MovieChangesOpts,
  MovieImagesOpts,
  PageOpts,
  PeopleChangesOpts,
  PeopleOpts,
  SearchMoviesOpts,
  SearchOpts,
  SearchPeopleOpts,
  SearchShowsOpts,
  SeasonOpts,
  TVOpts,
  UpcomingOpts,
  AlternativeTitlesOpts,
  FindOpts,
  KeywordsOpts,
  MoviesOpts,
  AccountSortedOpts,
  GuestSessionOpts,
} from './interfaces/opts-interfaces';
import {
  ErrorResponse,
  ID,
  Images,
  MediaType,
  MultiResults,
  Obj,
  ProfileImages,
  StillImages,
  TaggedImages,
  TimeWindow,
  Translations,
} from './interfaces/generic';
import { Account } from './interfaces/account';
import { Companies, Company, CompanyAlternativeNames, CompanyImages } from './interfaces/company';
import { Configuration, Countries, Jobs, Languages, PrimaryTranslations, Timezones } from './interfaces/configuration';
import { Keyword, KeywordMovies, Keywords } from './interfaces/keywords';
import { Network, NetworkAlternativeNames, NetworkImages } from './interfaces/networks';
import { People, PeopleChanges, Person, PopularPeople } from './interfaces/people';
import { AddListResponse, List, ListItemStatus, Lists } from './interfaces/list';
import { Review } from './interfaces/reviews';
import { GenresMovieList, GenresTVList } from './interfaces/genres';
import { GuestSession, Session, Token } from './interfaces/authentication';
import { MovieCertifications, TVCertifications } from './interfaces/certifications';
import { Changes } from './interfaces/changes';
import { Collection, Collections } from './interfaces/collections';
import { Credit, Credits } from './interfaces/credits';
import { Found } from './interfaces/find';
import {
  AccountState,
  AlternativeTitles,
  ExternalIds,
  Movie,
  MovieChanges,
  MovieKeywords,
  MovieLists,
  MovieReleaseDates,
  MovieReviews,
  Movies,
  MovieVideos,
} from './interfaces/movies';
import {
  GuestSessionRatedEpisodes,
  GuestSessionRatedMovies,
  GuestSessionRatedShows,
} from './interfaces/guest-sessions';
import {
  EpisodeGroup,
  EpisodeGroups,
  Episodes,
  EpisodeWithExtras,
  Ratings,
  ScreenedTheatrically,
  SeasonAccountStates,
  SeasonChanges,
  SeasonWithEpisodes,
  Show,
  Shows,
  TVChanges,
} from './interfaces/tv';
export default class TheMovieDB {
  private images_uri = 'http://image.tmdb.org/t/p/';
  private timeout = 5000;
  private language = 'en-US';

  constructor(private api_key: string, private base_uri = 'http://api.themoviedb.org/3/') {}

  private generateQuery = (opts: { [key: string]: string | number | boolean } = {}) => {
    const query = `?api_key=${this.api_key}&language=${this.language}`;
    return [query, ...Object.entries(opts).map(([k, v]) => `${k}=${v}`)].join('&');
  };

  public getImage = ({ size, file }: { size: string; file: string }) => this.images_uri + size + '/' + file;

  private client = (
    {
      url,
      method = 'GET',
      status = 200,
      body,
      options = {},
    }: {
      url: string;
      method?: string;
      status?: number;
      body?: any;
      options?: { [key: string]: string | number | boolean };
    },
    success: (a: string) => void,
    error: (a: string) => void
  ) => {
    const xhr = new XMLHttpRequest();

    xhr.ontimeout = function () {
      error('{"status_code":408,"status_message":"Request timed out"}');
    };

    xhr.open(method, this.base_uri + url + this.generateQuery(options), true);

    if (method === 'POST') {
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Accept', 'application/json');
    }

    xhr.timeout = this.timeout;

    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === status) {
          success(xhr.responseText);
        } else {
          error(xhr.responseText);
        }
      } else {
        error(xhr.responseText);
      }
    };

    xhr.onerror = () => {
      error(xhr.responseText);
    };

    if (method === 'POST') {
      xhr.send(JSON.stringify(body));
    } else {
      xhr.send(null);
    }
  };

  private GET = <T>(url: string, options = {}) => {
    return new Promise((res: (value: T) => void, rej: (error: ErrorResponse) => void) => {
      this.client(
        { url, options },
        (v: string) => res(JSON.parse(v)),
        (e: string) => rej(JSON.parse(e))
      );
    });
  };

  private POST = <T>(url: string, body: Obj, options = {}) => {
    return new Promise((res: (value: T) => void, rej: (error: ErrorResponse) => void) => {
      this.client(
        { url, options, status: 201, method: 'POST', body },
        (v: string) => res(JSON.parse(v)),
        (e: string) => rej(JSON.parse(e))
      );
    });
  };

  private DELETE = <T>(url: string, body: Obj, options = {}) => {
    return new Promise((res: (value: T) => void, rej: (error: ErrorResponse) => void) => {
      this.client(
        { url, options, status: 204, method: 'DELETE', body },
        (v: string) => res(JSON.parse(v)),
        (e: string) => rej(JSON.parse(e))
      );
    });
  };

  public account = {
    getInformation: (opts: AccountOpts) => this.GET<Account>('account', opts),
    getLists: (id: ID, opts?: AccountOpts) => this.GET<Lists>(`account/${id}/lists`, opts),
    getFavoritesMovies: (id: ID, opts?: AccountSortedOpts) => this.GET<Movies>(`account/${id}/favorite/movies`, opts),
    getFavoritesTvShows: (id: ID, opts?: AccountSortedOpts) => this.GET<Shows>(`account/${id}/favorite/tv?`, opts),
    getRatedMovies: (id: ID, opts?: AccountSortedOpts) => this.GET<Movies>(`account/${id}/rated/movies`, opts),
    getRatedTvShows: (id: ID, opts?: AccountSortedOpts) => this.GET<Shows>(`account/${id}/rated/tv`, opts),
    getRatedTvEpisodes: (id: ID, opts?: AccountSortedOpts) =>
      this.GET<Episodes>(`account/${id}rated/tv/episodes`, opts),
    getMovieWatchlist: (id: ID, opts?: AccountSortedOpts) => this.GET<Movies>(`account/${id}/watchlist/movies`, opts),
    getTvShowsWatchlist: (id: ID, opts?: AccountSortedOpts) => this.GET<Shows>(`account/${id}/watchlist/tv`, opts),
    addFavorite: (id: ID, session_id: string, media_type: MediaType, media_id: number, favorite: boolean) =>
      this.POST<ErrorResponse>(`account/${id}/favorite`, { media_type, media_id, favorite }, { session_id }),
    addToWatchlist: (id: ID, session_id: string, media_type: MediaType, media_id: number, watchlist: boolean) =>
      this.POST<ErrorResponse>(`account/${id}/watchlist`, { media_type, media_id, watchlist }, { session_id }),
  };

  public authentication = {
    generateGuestSession: () => this.GET<GuestSession>('authentication/guest_session/new'),
    generateToken: () => this.GET<Token>('authentication/token/new'),
    createSession: (request_token: string) => this.POST<Session>('authentication/session/new', { request_token }),
    createSessionWithLogin: (username: string, password: string, request_token: string) =>
      this.POST<Token>('authentication/token/validate_with_login', { username, password, request_token }),
    createSessionV4: (access_token: string) => this.POST<Session>('authentication/session/new', { access_token }),
  };

  public certifications = {
    getMovieList: () => this.GET<MovieCertifications>('certification/movie/list'),
    getTvList: () => this.GET<TVCertifications>('certification/tv/list'),
  };

  public changes = {
    getMovieChanges: (opts?: ChangesOpts) => this.GET<Changes>('movie/changes', opts),
    getTvChanges: (opts?: ChangesOpts) => this.GET<Changes>('tv/changes', opts),
    getPersonChanges: (opts: ChangesOpts) => this.GET<Changes>('person/changes', opts),
  };

  public collections = {
    getDetails: (id: ID) => this.GET<Collection>(`collection/${id}`),
    getImages: (id: ID) => this.GET<Images>(`collection/${id}/images`),
    getTranslations: (id: ID) => this.GET<Translations>(`collection/${id}/translations`),
  };

  public companies = {
    getDetails: (id: ID) => this.GET<Company>(`company/${id}`),
    getAlternativeNames: (id: ID) => this.GET<CompanyAlternativeNames>(`company/${id}/alternative_names`),
    getImages: (id: ID) => this.GET<CompanyImages>(`company/${id}/images`),
  };

  public configurations = {
    getConfiguration: () => this.GET<Configuration>('configuration'),
    getCountries: () => this.GET<Countries>('configuration/countries'),
    getJobs: () => this.GET<Jobs>('configuration/jobs'),
    getLanguages: () => this.GET<Languages>('configuration/languages'),
    getPrimaryTranslations: () => this.GET<PrimaryTranslations>('configuration/primary_translations'),
    getTimezones: () => this.GET<Timezones>('configuration/timezones'),
  };

  public credits = { getDetails: (id: ID) => this.GET<Credit>(`credit/${id}`) };

  public discover = {
    getMovies: (opts?: DiscoverOpts) => this.GET<Movies>('discover/movie', opts),
    getTvShows: (opts?: DiscoverOpts) => this.GET<Shows>('discover/tv', opts),
  };

  public find = { getById: (id: ID, opts: FindOpts) => this.GET<Found>(`find/${id}`, opts) };

  public genres = {
    getMovieList: () => this.GET<GenresMovieList>('genre/movie/list'),
    getTvList: () => this.GET<GenresTVList>('genre/tv/list'),
  };

  public guestSession = {
    getRatedMovies: (id: ID, opts?: GuestSessionOpts) =>
      this.GET<GuestSessionRatedMovies>(`guest_session/${id}/rated/movies`, opts),
    getRatedTvShows: (id: ID, opts?: GuestSessionOpts) =>
      this.GET<GuestSessionRatedShows>(`guest_session/${id}/rated/tv`, opts),
    getRatedTvEpisodes: (id: ID, opts?: GuestSessionOpts) =>
      this.GET<GuestSessionRatedEpisodes>(`guest_session/${id}/rated/tv/episodes`, opts),
  };

  public keywords = {
    getById: (id: ID) => this.GET<Keyword>(`keyword/${id}`),
    getMovies: (id: ID, opts?: KeywordsOpts) => this.GET<KeywordMovies>(`keyword/${id}/movies`, opts),
  };

  public lists = {
    getById: (id: ID) => this.GET<List>(`list/${id}`),
    getStatusById: (id: ID, opts: ListItemStatusOpts) => this.GET<ListItemStatus>(`list/${id}/item_status`, opts),
    addList: ({ name, description, session_id }: AddListOpts) =>
      this.POST<AddListResponse>(`list`, { name, description, language: this.language }, { session_id }),
    addMovie: (id: ID, session_id: string, media_id: string) =>
      this.POST<ErrorResponse>(`list/${id}/add_item`, { media_id }, { session_id }),
    removeItem: (id: ID, session_id: string, media_id: string) =>
      this.POST<ErrorResponse>(`list/${id}/remove_item`, { media_id }, { session_id }),
    clearList: (id: ID, session_id: string, confirm: boolean) =>
      this.POST<ErrorResponse>(`list/${id}/clear`, {}, { session_id, confirm }),
    deleteList: (id: ID, session_id: string) => this.DELETE<ErrorResponse>(`list/${id}`, {}, { session_id }),
  };

  public movies = {
    getById: (id: ID, opts?: MoviesOpts) => this.GET<Movie>(`movie/${id}`, opts),
    getAccountStates: (id: ID, opts: AccountSateOpts) => this.GET<AccountState>(`movie/${id}/account_states`, opts),
    getAccountStatesGuest: (id: ID, opts: AccountSateGuestOpts) =>
      this.GET<AccountState>(`movie/${id}/account_states`, opts),
    getAlternativeTitles: (id: ID, opts: AlternativeTitlesOpts) =>
      this.GET<AlternativeTitles>(`movie/${id}/alternative_titles`, opts),
    getChanges: (id: ID, opts?: MovieChangesOpts) => this.GET<MovieChanges>(`movie/${id}/changes`, opts),
    getCredits: (id: ID) => this.GET<Credits>(`movie/${id}/credits`),
    getExternalIds: (id: ID) => this.GET<ExternalIds>(`movie/${id}/external_ids`),
    getImages: (id: ID, opts?: MovieImagesOpts) => this.GET<Images>(`movie/${id}/images`, opts),
    getKeywords: (id: ID) => this.GET<MovieKeywords>(`movie/${id}/keywords`),
    getReleases: (id: ID) => this.GET<MovieReleaseDates>(`movie/${id}/release_dates`),
    getVideos: (id: ID) => this.GET<MovieVideos>(`movie/${id}/videos`),
    getTranslations: (id: ID) => this.GET<Translations>(`movie/${id}/translations`),
    getRecommendations: (id: ID, opts?: PageOpts) => this.GET<Movies>(`movie/${id}/recommendations`, opts),
    getSimilarMovies: (id: ID, opts?: PageOpts) => this.GET<Movies>(`movie/${id}/similar`, opts),
    getReviews: (id: ID, opts?: PageOpts) => this.GET<MovieReviews>(`movie/${id}/reviews`, opts),
    getLists: (id: ID, opts?: PageOpts) => this.GET<MovieLists>(`movie/${id}/lists`, opts),
    getLatest: (id: ID) => this.GET<Movie>(`movie/${id}/latest`),
    getNowPlaying: (opts?: UpcomingOpts) => this.GET<Movies>('movie/now_playing', opts),
    getPopular: (opts?: UpcomingOpts) => this.GET<Movies>('movie/popular', opts),
    getTopRated: (opts?: UpcomingOpts) => this.GET<Movies>('movie/top_rated', opts),
    getUpcoming: (opts?: UpcomingOpts) => this.GET<Movies>('movie/upcoming', opts),
    rate: (id: ID, rate: number, session_id?: string) =>
      this.POST<ErrorResponse>(`movie/${id}/rating`, { value: rate }, { session_id }),
    rateGuest: (id: ID, rate: number, guest_session_id?: string) =>
      this.POST<ErrorResponse>(`movie/${id}/rating`, { value: rate }, { guest_session_id }),
    removeRate: (id: ID, session_id?: string) => this.DELETE<ErrorResponse>(`movie/${id}/rating`, {}, { session_id }),
    removeRateGuest: (id: ID, guest_session_id?: string) =>
      this.DELETE<ErrorResponse>(`movie/${id}/rating`, {}, { guest_session_id }),
  };

  public networks = {
    getById: (id: ID) => this.GET<Network>(`network/${id}`),
    getAlternativeNames: (id: ID) => this.GET<NetworkAlternativeNames>(`network/${id}/alternative_names`),
    getImages: (id: ID) => this.GET<NetworkImages>(`network/${id}/images`),
  };

  public trending = {
    getTrending: (media_type: MediaType, time_window: TimeWindow) =>
      this.GET<Movies>(`/trending/${media_type}/${time_window}`),
  };

  public people = {
    getById: (id: ID, opts?: PeopleOpts) => this.GET<Person>(`person/${id}`, opts),
    getChanges: (id: ID, opts?: PeopleChangesOpts) => this.GET<PeopleChanges>(`person/${id}/changes`, opts),
    getMovieCredits: (id: ID) => this.GET<Credits>(`person/${id}/movie_credits`),
    getTvCredits: (id: ID) => this.GET<Credits>(`person/${id}/tv_credits`),
    getCredits: (id: ID) => this.GET<Credits>(`person/${id}/combined_credits`),
    getExternalIds: (id: ID) => this.GET<ExternalIds>(`person/${id}/external_ids`),
    getImages: (id: ID) => this.GET<ProfileImages>(`person/${id}/images`),
    getTaggedImages: (id: ID, opts?: PageOpts) => this.GET<TaggedImages>(`person/${id}/tagged_images`, opts),
    getTranslations: (id: ID) => this.GET<Translations>(`person/${id}/tagged_images`),
    getLatest: () => this.GET<Person>('person/latest'),
    getPopular: (opts?: PageOpts) => this.GET<PopularPeople>('person/popular', opts),
  };

  public reviews = {
    getById: (id: ID) => this.GET<Review>(`review/${id}`),
  };

  public search = {
    getCompanies: (opts?: SearchOpts) => this.GET<Companies>('search/company', opts),
    getCollections: (opts?: SearchOpts) => this.GET<Collections>('search/collection', opts),
    getKeywords: (opts?: SearchOpts) => this.GET<Keywords>('search/keyword', opts),
    getMovies: (opts?: SearchMoviesOpts) => this.GET<Movies>('search/movie', opts),
    getMulti: (opts?: SearchPeopleOpts) => this.GET<MultiResults>('search/multi', opts),
    getPeople: (opts?: SearchPeopleOpts) => this.GET<People>('search/person', opts),
    getShows: (opts?: SearchShowsOpts) => this.GET<Shows>('search/tv', opts),
  };

  public tv = {
    getById: (id: ID, opts?: TVOpts) => this.GET<Show>(`tv/${id}`, opts),
    getAccountStates: (id: ID, opts?: AccountSateOpts) => this.GET<AccountState>(`tv/${id}/account_states`, opts),
    getAccountStatesGuest: (id: ID, opts?: AccountSateGuestOpts) =>
      this.GET<AccountState>(`tv/${id}/account_states`, opts),
    getAlternativeTitles: (id: ID, opts?: AlternativeTitlesOpts) =>
      this.GET<AlternativeTitles>(`tv/${id}/alternative_titles`, opts),
    getChanges: (id: ID, opts?: ChangesOpts) => this.GET<TVChanges>(`tv/${id}/changes`, opts),
    getContentRatings: (id: ID) => this.GET<Ratings>(`tv/${id}/content_ratings`),
    getCredits: (id: ID) => this.GET<Credits>(`tv/${id}/credits`),
    getEpisodeGroups: (id: ID) => this.GET<EpisodeGroups>(`tv/${id}/episode_groups`),
    getExternalIds: (id: ID) => this.GET<ExternalIds>(`tv/${id}/external_ids`),
    getImages: (id: ID) => this.GET<Images>(`tv/${id}/images`),
    getKeywords: (id: ID) => this.GET<Keywords>(`tv/${id}/keywords`),
    getRecommendations: (id: ID, opts?: PageOpts) => this.GET<Shows>(`tv/${id}/recommendations`, opts),
    getReviews: (id: ID, opts?: PageOpts) => this.GET<MovieReviews>(`tv/${id}/reviews`, opts),
    getScreenedTheatrically: (id: ID) => this.GET<ScreenedTheatrically>(`tv/${id}/screened_theatrically`),
    getSimilar: (id: ID, opts?: PageOpts) => this.GET<Shows>(`tv/${id}/similar`, opts),
    getTranslations: (id: ID) => this.GET<Translations>(`tv/${id}/translations`),
    getVideos: (id: ID) => this.GET<MovieVideos>(`tv/${id}/videos`),
    getLatest: () => this.GET<Show>('tv/latest'),
    getAiringToday: (opts?: PageOpts) => this.GET<Shows>('tv/airing_today', opts),
    getOnTheAir: (opts?: PageOpts) => this.GET<Shows>('tv/on_the_air', opts),
    getPopular: (opts?: PageOpts) => this.GET<Shows>('tv/popular', opts),
    getTopRated: (opts?: PageOpts) => this.GET<Shows>('tv/top_rated', opts),
    rate: (id: ID, rate: number, session_id: string) =>
      this.POST<ErrorResponse>(`tv/${id}/rating`, { value: rate }, { session_id }),
    rateGuest: (id: ID, rate: number, guest_session_id: string) =>
      this.POST<ErrorResponse>(`tv/${id}/rating`, { value: rate }, { guest_session_id }),
    removeRate: (id: ID, session_id: string) => this.DELETE<ErrorResponse>(`tv/${id}/rating`, {}, { session_id }),
    removeRateGuest: (id: ID, guest_session_id: string) =>
      this.DELETE<ErrorResponse>(`tv/${id}/rating`, {}, { guest_session_id }),
  };

  public tvSeasons = {
    getById: (id: ID, season: number, opts?: SeasonOpts) =>
      this.GET<SeasonWithEpisodes>(`tv/${id}/season/${season}`, opts),
    getChanges: (id: ID, opts?: ChangesOpts) => this.GET<SeasonChanges>(`tv/season/${id}/changes`, opts),
    getAccountStates: (id: ID, season: number, opts?: AccountSateOpts) =>
      this.GET<SeasonAccountStates>(`tv/${id}/season/${season}/account_states`, opts),
    getAccountStatesGuest: (id: ID, season: number, opts?: AccountSateGuestOpts) =>
      this.GET<SeasonAccountStates>(`tv/${id}/season/${season}/account_states`, opts),
    getCredits: (id: ID, season: number) => this.GET<Credits>(`tv/${id}/season/${season}/credits`),
    getExternalIds: (id: ID, season: number) => this.GET<ExternalIds>(`tv/${id}/season/${season}/external_ids`),
    getImages: (id: ID, season: number) => this.GET<Images>(`tv/${id}/season/${season}/images`),
    getVideos: (id: ID, season: number) => this.GET<MovieVideos>(`tv/${id}/season/${season}/videos`),
  };

  public tvEpisodes = {
    getById: (id: ID, season: number, episode: number, opts?: EpisodeOpts) =>
      this.GET<EpisodeWithExtras>(`tv/${id}/season/${season}/episode/${episode}`, opts),
    getChanges: (id: ID, opts?: ChangesOpts) => this.GET<SeasonChanges>(`tv/episode/${id}/changes`, opts),
    getAccountStates: (id: ID, season: number, episode: number, session_id: string) =>
      this.GET<AccountState>(`tv/${id}/season/${season}/episode/${episode}/account_states`, { session_id }),
    getAccountStatesGuest: (id: ID, season: number, episode: number, guest_session_id: string) =>
      this.GET<AccountState>(`tv/${id}/season/${season}/episode/${episode}/account_states`, { guest_session_id }),
    getCredits: (id: ID, season: number, episode: number) =>
      this.GET<Credits>(`tv/${id}/season/${season}/episode/${episode}/credits`),
    getExternalIds: (id: ID, season: number, episode: number) =>
      this.GET<ExternalIds>(`tv/${id}/season/${season}/episode/${episode}/external_ids`),
    getImages: (id: ID, season: number, episode: number) =>
      this.GET<StillImages>(`tv/${id}/season/${season}/episode/${episode}/images`),
    getTranslations: (id: ID, season: number, episode: number) =>
      this.GET<Translations>(`tv/${id}/season/${season}/episode/${episode}/translations`),
    getVideos: (id: ID, season: number, episode: number) =>
      this.GET<MovieVideos>(`tv/${id}/season/${season}/episode/${episode}/videos`),
    rate: (id: ID, season: number, episode: number, rate: number, session_id: string) =>
      this.POST<ErrorResponse>(`tv/${id}/season/${season}/episode/${episode}/rating`, { value: rate }, { session_id }),
    rateGuest: (id: ID, season: number, episode: number, rate: number, guest_session_id: string) =>
      this.POST<ErrorResponse>(
        `tv/${id}/season/${season}/episode/${episode}/rating`,
        { value: rate },
        { guest_session_id }
      ),
    removeRate: (id: ID, season: number, episode: number, session_id: string) =>
      this.DELETE<ErrorResponse>(`tv/${id}/season/${season}/episode/${episode}/rating`, {}, { session_id }),
    removeRateGuest: (id: ID, season: number, episode: number, guest_session_id: string) =>
      this.DELETE<ErrorResponse>(`tv/${id}/season/${season}/episode/${episode}/rating`, {}, { guest_session_id }),
  };

  public tvEpisodeGroups = {
    getById: (id: ID) => this.GET<EpisodeGroup>(`tv/episode_group/${id}`),
  };
}
