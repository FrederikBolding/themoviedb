"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var xmlhttprequest_1 = require("xmlhttprequest");
var TheMovieDB = /** @class */ (function () {
    function TheMovieDB(api_key, base_uri) {
        var _this = this;
        if (base_uri === void 0) { base_uri = 'http://api.themoviedb.org/3/'; }
        this.api_key = api_key;
        this.base_uri = base_uri;
        this.images_uri = 'http://image.tmdb.org/t/p/';
        this.timeout = 5000;
        this.language = 'en-US';
        this.generateQuery = function (opts) {
            if (opts === void 0) { opts = {}; }
            var query = "?api_key=" + _this.api_key + "&language=" + _this.language;
            return __spreadArrays([query], Object.entries(opts).map(function (_a) {
                var k = _a[0], v = _a[1];
                return k + "=" + v;
            })).join('&');
        };
        this.getImage = function (_a) {
            var size = _a.size, file = _a.file;
            return _this.images_uri + size + '/' + file;
        };
        this.client = function (_a, success, error) {
            var url = _a.url, _b = _a.method, method = _b === void 0 ? 'GET' : _b, _c = _a.status, status = _c === void 0 ? 200 : _c, body = _a.body, _d = _a.options, options = _d === void 0 ? {} : _d;
            var xhr = new xmlhttprequest_1.XMLHttpRequest();
            xhr.ontimeout = function () {
                error('{"status_code":408,"status_message":"Request timed out"}');
            };
            xhr.open(method, _this.base_uri + url + _this.generateQuery(options), true);
            if (method === 'POST') {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Accept', 'application/json');
            }
            xhr.timeout = _this.timeout;
            xhr.onload = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === status) {
                        success(xhr.responseText);
                    }
                    else {
                        error(xhr.responseText);
                    }
                }
                else {
                    error(xhr.responseText);
                }
            };
            xhr.onerror = function () {
                error(xhr.responseText);
            };
            if (method === 'POST') {
                xhr.send(JSON.stringify(body));
            }
            else {
                xhr.send(null);
            }
        };
        this.GET = function (url, options) {
            if (options === void 0) { options = {}; }
            return new Promise(function (res, rej) {
                _this.client({ url: url, options: options }, function (v) { return res(JSON.parse(v)); }, function (e) { return rej(JSON.parse(e)); });
            });
        };
        this.POST = function (url, body, options) {
            if (options === void 0) { options = {}; }
            return new Promise(function (res, rej) {
                _this.client({ url: url, options: options, status: 201, method: 'POST', body: body }, function (v) { return res(JSON.parse(v)); }, function (e) { return rej(JSON.parse(e)); });
            });
        };
        this.DELETE = function (url, body, options) {
            if (options === void 0) { options = {}; }
            return new Promise(function (res, rej) {
                _this.client({ url: url, options: options, status: 204, method: 'DELETE', body: body }, function (v) { return res(JSON.parse(v)); }, function (e) { return rej(JSON.parse(e)); });
            });
        };
        this.account = {
            getInformation: function (opts) { return _this.GET('account', opts); },
            getLists: function (id, opts) { return _this.GET("account/" + id + "/lists", opts); },
            getFavoritesMovies: function (id, opts) { return _this.GET("account/" + id + "/favorite/movies", opts); },
            getFavoritesTvShows: function (id, opts) { return _this.GET("account/" + id + "/favorite/tv?", opts); },
            getRatedMovies: function (id, opts) { return _this.GET("account/" + id + "/rated/movies", opts); },
            getRatedTvShows: function (id, opts) { return _this.GET("account/" + id + "/rated/tv", opts); },
            getRatedTvEpisodes: function (id, opts) {
                return _this.GET("account/" + id + "rated/tv/episodes", opts);
            },
            getMovieWatchlist: function (id, opts) { return _this.GET("account/" + id + "/watchlist/movies", opts); },
            getTvShowsWatchlist: function (id, opts) { return _this.GET("account/" + id + "/watchlist/tv", opts); },
            addFavorite: function (id, session_id, media_type, media_id, favorite) {
                return _this.POST("account/" + id + "/favorite", { media_type: media_type, media_id: media_id, favorite: favorite }, { session_id: session_id });
            },
            addToWatchlist: function (id, session_id, media_type, media_id, watchlist) {
                return _this.POST("account/" + id + "/watchlist", { media_type: media_type, media_id: media_id, watchlist: watchlist }, { session_id: session_id });
            },
        };
        this.authentication = {
            generateGuestSession: function () { return _this.GET('authentication/guest_session/new'); },
            generateToken: function () { return _this.GET('authentication/token/new'); },
            createSession: function (request_token) { return _this.POST('authentication/session/new', { request_token: request_token }); },
            createSessionWithLogin: function (username, password, request_token) {
                return _this.POST('authentication/token/validate_with_login', { username: username, password: password, request_token: request_token });
            },
            createSessionV4: function (access_token) { return _this.POST('authentication/session/new', { access_token: access_token }); },
        };
        this.certifications = {
            getMovieList: function () { return _this.GET('certification/movie/list'); },
            getTvList: function () { return _this.GET('certification/tv/list'); },
        };
        this.changes = {
            getMovieChanges: function (opts) { return _this.GET('movie/changes', opts); },
            getTvChanges: function (opts) { return _this.GET('tv/changes', opts); },
            getPersonChanges: function (opts) { return _this.GET('person/changes', opts); },
        };
        this.collections = {
            getDetails: function (id) { return _this.GET("collection/" + id); },
            getImages: function (id) { return _this.GET("collection/" + id + "/images"); },
            getTranslations: function (id) { return _this.GET("collection/" + id + "/translations"); },
        };
        this.companies = {
            getDetails: function (id) { return _this.GET("company/" + id); },
            getAlternativeNames: function (id) { return _this.GET("company/" + id + "/alternative_names"); },
            getImages: function (id) { return _this.GET("company/" + id + "/images"); },
        };
        this.configurations = {
            getConfiguration: function () { return _this.GET('configuration'); },
            getCountries: function () { return _this.GET('configuration/countries'); },
            getJobs: function () { return _this.GET('configuration/jobs'); },
            getLanguages: function () { return _this.GET('configuration/languages'); },
            getPrimaryTranslations: function () { return _this.GET('configuration/primary_translations'); },
            getTimezones: function () { return _this.GET('configuration/timezones'); },
        };
        this.credits = { getDetails: function (id) { return _this.GET("credit/" + id); } };
        this.discover = {
            getMovies: function (opts) { return _this.GET('discover/movie', opts); },
            getTvShows: function (opts) { return _this.GET('discover/tv', opts); },
        };
        this.find = { getById: function (id, opts) { return _this.GET("find/" + id, opts); } };
        this.genres = {
            getMovieList: function () { return _this.GET('genre/movie/list'); },
            getTvList: function () { return _this.GET('genre/tv/list'); },
        };
        this.guestSession = {
            getRatedMovies: function (id, opts) {
                return _this.GET("guest_session/" + id + "/rated/movies", opts);
            },
            getRatedTvShows: function (id, opts) {
                return _this.GET("guest_session/" + id + "/rated/tv", opts);
            },
            getRatedTvEpisodes: function (id, opts) {
                return _this.GET("guest_session/" + id + "/rated/tv/episodes", opts);
            },
        };
        this.keywords = {
            getById: function (id) { return _this.GET("keyword/" + id); },
            getMovies: function (id, opts) { return _this.GET("keyword/" + id + "/movies", opts); },
        };
        this.lists = {
            getById: function (id) { return _this.GET("list/" + id); },
            getStatusById: function (id, opts) { return _this.GET("list/" + id + "/item_status", opts); },
            addList: function (_a) {
                var name = _a.name, description = _a.description, session_id = _a.session_id;
                return _this.POST("list", { name: name, description: description, language: _this.language }, { session_id: session_id });
            },
            addMovie: function (id, session_id, media_id) {
                return _this.POST("list/" + id + "/add_item", { media_id: media_id }, { session_id: session_id });
            },
            removeItem: function (id, session_id, media_id) {
                return _this.POST("list/" + id + "/remove_item", { media_id: media_id }, { session_id: session_id });
            },
            clearList: function (id, session_id, confirm) {
                return _this.POST("list/" + id + "/clear", {}, { session_id: session_id, confirm: confirm });
            },
            deleteList: function (id, session_id) { return _this.DELETE("list/" + id, {}, { session_id: session_id }); },
        };
        this.movies = {
            getById: function (id, opts) { return _this.GET("movie/" + id, opts); },
            getAccountStates: function (id, opts) { return _this.GET("movie/" + id + "/account_states", opts); },
            getAccountStatesGuest: function (id, opts) {
                return _this.GET("movie/" + id + "/account_states", opts);
            },
            getAlternativeTitles: function (id, opts) {
                return _this.GET("movie/" + id + "/alternative_titles", opts);
            },
            getChanges: function (id, opts) { return _this.GET("movie/" + id + "/changes", opts); },
            getCredits: function (id) { return _this.GET("movie/" + id + "/credits"); },
            getExternalIds: function (id) { return _this.GET("movie/" + id + "/external_ids"); },
            getImages: function (id, opts) { return _this.GET("movie/" + id + "/images", opts); },
            getKeywords: function (id) { return _this.GET("movie/" + id + "/keywords"); },
            getReleases: function (id) { return _this.GET("movie/" + id + "/release_dates"); },
            getVideos: function (id) { return _this.GET("movie/" + id + "/videos"); },
            getTranslations: function (id) { return _this.GET("movie/" + id + "/translations"); },
            getRecommendations: function (id, opts) { return _this.GET("movie/" + id + "/recommendations", opts); },
            getSimilarMovies: function (id, opts) { return _this.GET("movie/" + id + "/similar", opts); },
            getReviews: function (id, opts) { return _this.GET("movie/" + id + "/reviews", opts); },
            getLists: function (id, opts) { return _this.GET("movie/" + id + "/lists", opts); },
            getLatest: function (id) { return _this.GET("movie/" + id + "/latest"); },
            getNowPlaying: function (opts) { return _this.GET('movie/now_playing', opts); },
            getPopular: function (opts) { return _this.GET('movie/popular', opts); },
            getTopRated: function (opts) { return _this.GET('movie/top_rated', opts); },
            getUpcoming: function (opts) { return _this.GET('movie/upcoming', opts); },
            rate: function (id, rate, session_id) {
                return _this.POST("movie/" + id + "/rating", { value: rate }, { session_id: session_id });
            },
            rateGuest: function (id, rate, guest_session_id) {
                return _this.POST("movie/" + id + "/rating", { value: rate }, { guest_session_id: guest_session_id });
            },
            removeRate: function (id, session_id) { return _this.DELETE("movie/" + id + "/rating", {}, { session_id: session_id }); },
            removeRateGuest: function (id, guest_session_id) {
                return _this.DELETE("movie/" + id + "/rating", {}, { guest_session_id: guest_session_id });
            },
        };
        this.networks = {
            getById: function (id) { return _this.GET("network/" + id); },
            getAlternativeNames: function (id) { return _this.GET("network/" + id + "/alternative_names"); },
            getImages: function (id) { return _this.GET("network/" + id + "/images"); },
        };
        this.trending = {
            getTrending: function (media_type, time_window) {
                return _this.GET("/trending/" + media_type + "/" + time_window);
            },
        };
        this.people = {
            getById: function (id, opts) { return _this.GET("person/" + id, opts); },
            getChanges: function (id, opts) { return _this.GET("person/" + id + "/changes", opts); },
            getMovieCredits: function (id) { return _this.GET("person/" + id + "/movie_credits"); },
            getTvCredits: function (id) { return _this.GET("person/" + id + "/tv_credits"); },
            getCredits: function (id) { return _this.GET("person/" + id + "/combined_credits"); },
            getExternalIds: function (id) { return _this.GET("person/" + id + "/external_ids"); },
            getImages: function (id) { return _this.GET("person/" + id + "/images"); },
            getTaggedImages: function (id, opts) { return _this.GET("person/" + id + "/tagged_images", opts); },
            getTranslations: function (id) { return _this.GET("person/" + id + "/tagged_images"); },
            getLatest: function () { return _this.GET('person/latest'); },
            getPopular: function (opts) { return _this.GET('person/popular', opts); },
        };
        this.reviews = {
            getById: function (id) { return _this.GET("review/" + id); },
        };
        this.search = {
            getCompanies: function (opts) { return _this.GET('search/company', opts); },
            getCollections: function (opts) { return _this.GET('search/collection', opts); },
            getKeywords: function (opts) { return _this.GET('search/keyword', opts); },
            getMovies: function (opts) { return _this.GET('search/movie', opts); },
            getMulti: function (opts) { return _this.GET('search/multi', opts); },
            getPeople: function (opts) { return _this.GET('search/person', opts); },
            getShows: function (opts) { return _this.GET('search/tv', opts); },
        };
        this.tv = {
            getById: function (id, opts) { return _this.GET("tv/" + id, opts); },
            getAccountStates: function (id, opts) { return _this.GET("tv/" + id + "/account_states", opts); },
            getAccountStatesGuest: function (id, opts) {
                return _this.GET("tv/" + id + "/account_states", opts);
            },
            getAlternativeTitles: function (id, opts) {
                return _this.GET("tv/" + id + "/alternative_titles", opts);
            },
            getChanges: function (id, opts) { return _this.GET("tv/" + id + "/changes", opts); },
            getContentRatings: function (id) { return _this.GET("tv/" + id + "/content_ratings"); },
            getCredits: function (id) { return _this.GET("tv/" + id + "/credits"); },
            getEpisodeGroups: function (id) { return _this.GET("tv/" + id + "/episode_groups"); },
            getExternalIds: function (id) { return _this.GET("tv/" + id + "/external_ids"); },
            getImages: function (id) { return _this.GET("tv/" + id + "/images"); },
            getKeywords: function (id) { return _this.GET("tv/" + id + "/keywords"); },
            getRecommendations: function (id, opts) { return _this.GET("tv/" + id + "/recommendations", opts); },
            getReviews: function (id, opts) { return _this.GET("tv/" + id + "/reviews", opts); },
            getScreenedTheatrically: function (id) { return _this.GET("tv/" + id + "/screened_theatrically"); },
            getSimilar: function (id, opts) { return _this.GET("tv/" + id + "/similar", opts); },
            getTranslations: function (id) { return _this.GET("tv/" + id + "/translations"); },
            getVideos: function (id) { return _this.GET("tv/" + id + "/videos"); },
            getLatest: function () { return _this.GET('tv/latest'); },
            getAiringToday: function (opts) { return _this.GET('tv/airing_today', opts); },
            getOnTheAir: function (opts) { return _this.GET('tv/on_the_air', opts); },
            getPopular: function (opts) { return _this.GET('tv/popular', opts); },
            getTopRated: function (opts) { return _this.GET('tv/top_rated', opts); },
            rate: function (id, rate, session_id) {
                return _this.POST("tv/" + id + "/rating", { value: rate }, { session_id: session_id });
            },
            rateGuest: function (id, rate, guest_session_id) {
                return _this.POST("tv/" + id + "/rating", { value: rate }, { guest_session_id: guest_session_id });
            },
            removeRate: function (id, session_id) { return _this.DELETE("tv/" + id + "/rating", {}, { session_id: session_id }); },
            removeRateGuest: function (id, guest_session_id) {
                return _this.DELETE("tv/" + id + "/rating", {}, { guest_session_id: guest_session_id });
            },
        };
        this.tvSeasons = {
            getById: function (id, season, opts) {
                return _this.GET("tv/" + id + "/season/" + season, opts);
            },
            getChanges: function (id, opts) { return _this.GET("tv/season/" + id + "/changes", opts); },
            getAccountStates: function (id, season, opts) {
                return _this.GET("tv/" + id + "/season/" + season + "/account_states", opts);
            },
            getAccountStatesGuest: function (id, season, opts) {
                return _this.GET("tv/" + id + "/season/" + season + "/account_states", opts);
            },
            getCredits: function (id, season) { return _this.GET("tv/" + id + "/season/" + season + "/credits"); },
            getExternalIds: function (id, season) { return _this.GET("tv/" + id + "/season/" + season + "/external_ids"); },
            getImages: function (id, season) { return _this.GET("tv/" + id + "/season/" + season + "/images"); },
            getVideos: function (id, season) { return _this.GET("tv/" + id + "/season/" + season + "/videos"); },
        };
        this.tvEpisodes = {
            getById: function (id, season, episode, opts) {
                return _this.GET("tv/" + id + "/season/" + season + "/episode/" + episode, opts);
            },
            getChanges: function (id, opts) { return _this.GET("tv/episode/" + id + "/changes", opts); },
            getAccountStates: function (id, season, episode, session_id) {
                return _this.GET("tv/" + id + "/season/" + season + "/episode/" + episode + "/account_states", { session_id: session_id });
            },
            getAccountStatesGuest: function (id, season, episode, guest_session_id) {
                return _this.GET("tv/" + id + "/season/" + season + "/episode/" + episode + "/account_states", { guest_session_id: guest_session_id });
            },
            getCredits: function (id, season, episode) {
                return _this.GET("tv/" + id + "/season/" + season + "/episode/" + episode + "/credits");
            },
            getExternalIds: function (id, season, episode) {
                return _this.GET("tv/" + id + "/season/" + season + "/episode/" + episode + "/external_ids");
            },
            getImages: function (id, season, episode) {
                return _this.GET("tv/" + id + "/season/" + season + "/episode/" + episode + "/images");
            },
            getTranslations: function (id, season, episode) {
                return _this.GET("tv/" + id + "/season/" + season + "/episode/" + episode + "/translations");
            },
            getVideos: function (id, season, episode) {
                return _this.GET("tv/" + id + "/season/" + season + "/episode/" + episode + "/videos");
            },
            rate: function (id, season, episode, rate, session_id) {
                return _this.POST("tv/" + id + "/season/" + season + "/episode/" + episode + "/rating", { value: rate }, { session_id: session_id });
            },
            rateGuest: function (id, season, episode, rate, guest_session_id) {
                return _this.POST("tv/" + id + "/season/" + season + "/episode/" + episode + "/rating", { value: rate }, { guest_session_id: guest_session_id });
            },
            removeRate: function (id, season, episode, session_id) {
                return _this.DELETE("tv/" + id + "/season/" + season + "/episode/" + episode + "/rating", {}, { session_id: session_id });
            },
            removeRateGuest: function (id, season, episode, guest_session_id) {
                return _this.DELETE("tv/" + id + "/season/" + season + "/episode/" + episode + "/rating", {}, { guest_session_id: guest_session_id });
            },
        };
        this.tvEpisodeGroups = {
            getById: function (id) { return _this.GET("tv/episode_group/" + id); },
        };
    }
    return TheMovieDB;
}());
exports.default = TheMovieDB;
