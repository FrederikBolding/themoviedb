import { AccountOpts, AccountSateGuestOpts, AccountSateOpts, AddListOpts, ChangesOpts, DiscoverOpts, ListItemStatusOpts, MovieChangesOpts, MovieImagesOpts, PageOpts, PeopleChangesOpts, SearchMoviesOpts, SearchOpts, SearchPeopleOpts, SearchShowsOpts, UpcomingOpts, AlternativeTitlesOpts, FindOpts, KeywordsOpts, AccountSortedOpts, GuestSessionOpts } from './interfaces/opts-interfaces';
import { ErrorResponse, ID, Images, MediaType, MultiResults, ProfileImages, StillImages, TaggedImages, TimeWindow, Translations } from './interfaces/generic';
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
import { AccountState, AlternativeTitles, ExternalIds, Movie, MovieChanges, MovieKeywords, MovieLists, MovieReleaseDates, MovieReviews, Movies, MovieVideos } from './interfaces/movies';
import { GuestSessionRatedEpisodes, GuestSessionRatedMovies, GuestSessionRatedShows } from './interfaces/guest-sessions';
import { EpisodeGroup, EpisodeGroups, Episodes, EpisodeWithExtras, Ratings, ScreenedTheatrically, SeasonAccountStates, SeasonChanges, SeasonWithEpisodes, Show, Shows, TVChanges } from './interfaces/tv';
export default class TheMovieDB {
    private api_key;
    private base_uri;
    private images_uri;
    private timeout;
    private language;
    constructor(api_key: string, base_uri?: string);
    private generateQuery;
    getImage: ({ size, file }: {
        size: string;
        file: string;
    }) => string;
    private client;
    private GET;
    private POST;
    private DELETE;
    account: {
        getInformation: (opts: AccountOpts) => Promise<Account>;
        getLists: (id: ID, opts?: AccountOpts | undefined) => Promise<Lists>;
        getFavoritesMovies: (id: ID, opts?: AccountSortedOpts | undefined) => Promise<Movies>;
        getFavoritesTvShows: (id: ID, opts?: AccountSortedOpts | undefined) => Promise<Shows>;
        getRatedMovies: (id: ID, opts?: AccountSortedOpts | undefined) => Promise<Movies>;
        getRatedTvShows: (id: ID, opts?: AccountSortedOpts | undefined) => Promise<Shows>;
        getRatedTvEpisodes: (id: ID, opts?: AccountSortedOpts | undefined) => Promise<Episodes>;
        getMovieWatchlist: (id: ID, opts?: AccountSortedOpts | undefined) => Promise<Movies>;
        getTvShowsWatchlist: (id: ID, opts?: AccountSortedOpts | undefined) => Promise<Shows>;
        addFavorite: (id: ID, session_id: string, media_type: MediaType, media_id: number, favorite: boolean) => Promise<ErrorResponse>;
        addToWatchlist: (id: ID, session_id: string, media_type: MediaType, media_id: number, watchlist: boolean) => Promise<ErrorResponse>;
    };
    authentication: {
        generateGuestSession: () => Promise<GuestSession>;
        generateToken: () => Promise<Token>;
        createSession: (request_token: string) => Promise<Session>;
        createSessionWithLogin: (username: string, password: string, request_token: string) => Promise<Token>;
        createSessionV4: (access_token: string) => Promise<Session>;
    };
    certifications: {
        getMovieList: () => Promise<MovieCertifications>;
        getTvList: () => Promise<TVCertifications>;
    };
    changes: {
        getMovieChanges: (opts?: ChangesOpts | undefined) => Promise<Changes>;
        getTvChanges: (opts?: ChangesOpts | undefined) => Promise<Changes>;
        getPersonChanges: (opts: ChangesOpts) => Promise<Changes>;
    };
    collections: {
        getDetails: (id: ID) => Promise<Collection>;
        getImages: (id: ID) => Promise<Images>;
        getTranslations: (id: ID) => Promise<Translations>;
    };
    companies: {
        getDetails: (id: ID) => Promise<Company>;
        getAlternativeNames: (id: ID) => Promise<CompanyAlternativeNames>;
        getImages: (id: ID) => Promise<CompanyImages>;
    };
    configurations: {
        getConfiguration: () => Promise<Configuration>;
        getCountries: () => Promise<Countries>;
        getJobs: () => Promise<Jobs>;
        getLanguages: () => Promise<Languages>;
        getPrimaryTranslations: () => Promise<PrimaryTranslations>;
        getTimezones: () => Promise<Timezones>;
    };
    credits: {
        getDetails: (id: ID) => Promise<Credit>;
    };
    discover: {
        getMovies: (opts?: DiscoverOpts | undefined) => Promise<Movies>;
        getTvShows: (opts?: DiscoverOpts | undefined) => Promise<Shows>;
    };
    find: {
        getById: (id: ID, opts: FindOpts) => Promise<Found>;
    };
    genres: {
        getMovieList: () => Promise<GenresMovieList>;
        getTvList: () => Promise<GenresTVList>;
    };
    guestSession: {
        getRatedMovies: (id: ID, opts?: GuestSessionOpts | undefined) => Promise<GuestSessionRatedMovies>;
        getRatedTvShows: (id: ID, opts?: GuestSessionOpts | undefined) => Promise<GuestSessionRatedShows>;
        getRatedTvEpisodes: (id: ID, opts?: GuestSessionOpts | undefined) => Promise<GuestSessionRatedEpisodes>;
    };
    keywords: {
        getById: (id: ID) => Promise<Keyword>;
        getMovies: (id: ID, opts?: KeywordsOpts | undefined) => Promise<KeywordMovies>;
    };
    lists: {
        getById: (id: ID) => Promise<List>;
        getStatusById: (id: ID, opts: ListItemStatusOpts) => Promise<ListItemStatus>;
        addList: ({ name, description, session_id }: AddListOpts) => Promise<AddListResponse>;
        addMovie: (id: ID, session_id: string, media_id: string) => Promise<ErrorResponse>;
        removeItem: (id: ID, session_id: string, media_id: string) => Promise<ErrorResponse>;
        clearList: (id: ID, session_id: string, confirm: boolean) => Promise<ErrorResponse>;
        deleteList: (id: ID, session_id: string) => Promise<ErrorResponse>;
    };
    movies: {
        getById: (id: ID, opts?: import("./interfaces/opts-interfaces").AppendToResponse | undefined) => Promise<Movie>;
        getAccountStates: (id: ID, opts: AccountSateOpts) => Promise<AccountState>;
        getAccountStatesGuest: (id: ID, opts: AccountSateGuestOpts) => Promise<AccountState>;
        getAlternativeTitles: (id: ID, opts: AlternativeTitlesOpts) => Promise<AlternativeTitles>;
        getChanges: (id: ID, opts?: MovieChangesOpts | undefined) => Promise<MovieChanges>;
        getCredits: (id: ID) => Promise<Credits>;
        getExternalIds: (id: ID) => Promise<ExternalIds>;
        getImages: (id: ID, opts?: MovieImagesOpts | undefined) => Promise<Images>;
        getKeywords: (id: ID) => Promise<MovieKeywords>;
        getReleases: (id: ID) => Promise<MovieReleaseDates>;
        getVideos: (id: ID) => Promise<MovieVideos>;
        getTranslations: (id: ID) => Promise<Translations>;
        getRecommendations: (id: ID, opts?: PageOpts | undefined) => Promise<Movies>;
        getSimilarMovies: (id: ID, opts?: PageOpts | undefined) => Promise<Movies>;
        getReviews: (id: ID, opts?: PageOpts | undefined) => Promise<MovieReviews>;
        getLists: (id: ID, opts?: PageOpts | undefined) => Promise<MovieLists>;
        getLatest: (id: ID) => Promise<Movie>;
        getNowPlaying: (opts?: UpcomingOpts | undefined) => Promise<Movies>;
        getPopular: (opts?: UpcomingOpts | undefined) => Promise<Movies>;
        getTopRated: (opts?: UpcomingOpts | undefined) => Promise<Movies>;
        getUpcoming: (opts?: UpcomingOpts | undefined) => Promise<Movies>;
        rate: (id: ID, rate: number, session_id?: string | undefined) => Promise<ErrorResponse>;
        rateGuest: (id: ID, rate: number, guest_session_id?: string | undefined) => Promise<ErrorResponse>;
        removeRate: (id: ID, session_id?: string | undefined) => Promise<ErrorResponse>;
        removeRateGuest: (id: ID, guest_session_id?: string | undefined) => Promise<ErrorResponse>;
    };
    networks: {
        getById: (id: ID) => Promise<Network>;
        getAlternativeNames: (id: ID) => Promise<NetworkAlternativeNames>;
        getImages: (id: ID) => Promise<NetworkImages>;
    };
    trending: {
        getTrending: (media_type: MediaType, time_window: TimeWindow) => Promise<Movies>;
    };
    people: {
        getById: (id: ID, opts?: import("./interfaces/opts-interfaces").AppendToResponse | undefined) => Promise<Person>;
        getChanges: (id: ID, opts?: PeopleChangesOpts | undefined) => Promise<PeopleChanges>;
        getMovieCredits: (id: ID) => Promise<Credits>;
        getTvCredits: (id: ID) => Promise<Credits>;
        getCredits: (id: ID) => Promise<Credits>;
        getExternalIds: (id: ID) => Promise<ExternalIds>;
        getImages: (id: ID) => Promise<ProfileImages>;
        getTaggedImages: (id: ID, opts?: PageOpts | undefined) => Promise<TaggedImages>;
        getTranslations: (id: ID) => Promise<Translations>;
        getLatest: () => Promise<Person>;
        getPopular: (opts?: PageOpts | undefined) => Promise<PopularPeople>;
    };
    reviews: {
        getById: (id: ID) => Promise<Review>;
    };
    search: {
        getCompanies: (opts?: SearchOpts | undefined) => Promise<Companies>;
        getCollections: (opts?: SearchOpts | undefined) => Promise<Collections>;
        getKeywords: (opts?: SearchOpts | undefined) => Promise<Keywords>;
        getMovies: (opts?: SearchMoviesOpts | undefined) => Promise<Movies>;
        getMulti: (opts?: SearchPeopleOpts | undefined) => Promise<MultiResults>;
        getPeople: (opts?: SearchPeopleOpts | undefined) => Promise<People>;
        getShows: (opts?: SearchShowsOpts | undefined) => Promise<Shows>;
    };
    tv: {
        getById: (id: ID, opts?: import("./interfaces/opts-interfaces").AppendToResponse | undefined) => Promise<Show>;
        getAccountStates: (id: ID, opts?: import("./interfaces/opts-interfaces").SessionId | undefined) => Promise<AccountState>;
        getAccountStatesGuest: (id: ID, opts?: AccountSateGuestOpts | undefined) => Promise<AccountState>;
        getAlternativeTitles: (id: ID, opts?: AlternativeTitlesOpts | undefined) => Promise<AlternativeTitles>;
        getChanges: (id: ID, opts?: ChangesOpts | undefined) => Promise<TVChanges>;
        getContentRatings: (id: ID) => Promise<Ratings>;
        getCredits: (id: ID) => Promise<Credits>;
        getEpisodeGroups: (id: ID) => Promise<EpisodeGroups>;
        getExternalIds: (id: ID) => Promise<ExternalIds>;
        getImages: (id: ID) => Promise<Images>;
        getKeywords: (id: ID) => Promise<Keywords>;
        getRecommendations: (id: ID, opts?: PageOpts | undefined) => Promise<Shows>;
        getReviews: (id: ID, opts?: PageOpts | undefined) => Promise<MovieReviews>;
        getScreenedTheatrically: (id: ID) => Promise<ScreenedTheatrically>;
        getSimilar: (id: ID, opts?: PageOpts | undefined) => Promise<Shows>;
        getTranslations: (id: ID) => Promise<Translations>;
        getVideos: (id: ID) => Promise<MovieVideos>;
        getLatest: () => Promise<Show>;
        getAiringToday: (opts?: PageOpts | undefined) => Promise<Shows>;
        getOnTheAir: (opts?: PageOpts | undefined) => Promise<Shows>;
        getPopular: (opts?: PageOpts | undefined) => Promise<Shows>;
        getTopRated: (opts?: PageOpts | undefined) => Promise<Shows>;
        rate: (id: ID, rate: number, session_id: string) => Promise<ErrorResponse>;
        rateGuest: (id: ID, rate: number, guest_session_id: string) => Promise<ErrorResponse>;
        removeRate: (id: ID, session_id: string) => Promise<ErrorResponse>;
        removeRateGuest: (id: ID, guest_session_id: string) => Promise<ErrorResponse>;
    };
    tvSeasons: {
        getById: (id: ID, season: number, opts?: import("./interfaces/opts-interfaces").AppendToResponse | undefined) => Promise<SeasonWithEpisodes>;
        getChanges: (id: ID, opts?: ChangesOpts | undefined) => Promise<SeasonChanges>;
        getAccountStates: (id: ID, season: number, opts?: import("./interfaces/opts-interfaces").SessionId | undefined) => Promise<SeasonAccountStates>;
        getAccountStatesGuest: (id: ID, season: number, opts?: AccountSateGuestOpts | undefined) => Promise<SeasonAccountStates>;
        getCredits: (id: ID, season: number) => Promise<Credits>;
        getExternalIds: (id: ID, season: number) => Promise<ExternalIds>;
        getImages: (id: ID, season: number) => Promise<Images>;
        getVideos: (id: ID, season: number) => Promise<MovieVideos>;
    };
    tvEpisodes: {
        getById: (id: ID, season: number, episode: number, opts?: import("./interfaces/opts-interfaces").AppendToResponse | undefined) => Promise<EpisodeWithExtras>;
        getChanges: (id: ID, opts?: ChangesOpts | undefined) => Promise<SeasonChanges>;
        getAccountStates: (id: ID, season: number, episode: number, session_id: string) => Promise<AccountState>;
        getAccountStatesGuest: (id: ID, season: number, episode: number, guest_session_id: string) => Promise<AccountState>;
        getCredits: (id: ID, season: number, episode: number) => Promise<Credits>;
        getExternalIds: (id: ID, season: number, episode: number) => Promise<ExternalIds>;
        getImages: (id: ID, season: number, episode: number) => Promise<StillImages>;
        getTranslations: (id: ID, season: number, episode: number) => Promise<Translations>;
        getVideos: (id: ID, season: number, episode: number) => Promise<MovieVideos>;
        rate: (id: ID, season: number, episode: number, rate: number, session_id: string) => Promise<ErrorResponse>;
        rateGuest: (id: ID, season: number, episode: number, rate: number, guest_session_id: string) => Promise<ErrorResponse>;
        removeRate: (id: ID, season: number, episode: number, session_id: string) => Promise<ErrorResponse>;
        removeRateGuest: (id: ID, season: number, episode: number, guest_session_id: string) => Promise<ErrorResponse>;
    };
    tvEpisodeGroups: {
        getById: (id: ID) => Promise<EpisodeGroup>;
    };
}
