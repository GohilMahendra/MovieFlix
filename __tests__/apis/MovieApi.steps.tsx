import MockAdapter from "axios-mock-adapter"
import axios from "axios";
import { BASE_URL } from "../../src/globals/constants";
import { apiResponseMovie, apiResponseNowPlaying, apiResponseNowPlaying2, apiSerachResultResponse } from "../mocks/MockData";
import { fetchMovieDetails, fetchMovies, searchMovies } from "../../src/apis/MovieApi";
describe("Movie Api unit tests", () => {
    let mockAxios: MockAdapter
    beforeAll(() => {
        mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
        mockAxios.reset();
    });

    afterAll(() => {
        mockAxios.restore();
    });

    it("It can fetch movies for page 1 successfully", async () => {
        mockAxios.onGet(`${BASE_URL}movie/now_playing?language=en-US&page=1`).reply(200, apiResponseNowPlaying);
        const response = await fetchMovies("now_playing")
        expect(response).toEqual(apiResponseNowPlaying)
    })

    it("It will throw error if any issue found",async()=>{
        const errorMessage = "Failed to fetch movies";
        const category = "now_playing"
        mockAxios.onGet(`${BASE_URL}movie/${category}?language=en-US&page=1`).reply(500, { error: errorMessage });
        await expect(fetchMovies("now_playing")).rejects.toThrow("Error: Request failed with status code 500");
    })

    it("It can can fetch more now playing for page 2 also", async () => {
        mockAxios.onGet(`${BASE_URL}movie/now_playing?language=en-US&page=2`).reply(200, apiResponseNowPlaying2);
        const response = await fetchMovies("now_playing", 2)
        expect(response).toEqual(apiResponseNowPlaying2)
    })

    it("It can can fetch the search result from api", async () => {
        mockAxios.onGet(`${BASE_URL}search/movie?query=die&include_adult=false&language=en-US&page=1`).reply(200, apiSerachResultResponse);
        const response = await searchMovies("die")
        expect(response).toEqual(apiSerachResultResponse)
    })
    it("It can can throw error if anything happens with sevrer", async () => {
        const errorMessage = "Failed to fetch movies";
        mockAxios.onGet(`${BASE_URL}search/movie?query=die&include_adult=false&language=en-US&page=1`).reply(500,  { error: errorMessage });
        await expect(searchMovies("die")).rejects.toThrow("Error: Request failed with status code 500");
    })

    it("I can fetch the movie details with help of movie id",async()=>{
        const movieId = 1094556
        mockAxios.onGet(`${BASE_URL}movie/${movieId}?language=en-US`).reply(200, apiResponseMovie);
        const response = await fetchMovieDetails(movieId)
        expect(response).toEqual(apiResponseMovie)
    })

})