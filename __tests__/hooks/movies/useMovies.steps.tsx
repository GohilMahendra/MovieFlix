import { renderHook } from "@testing-library/react-hooks"
import useMovies from "../../../src/hooks/movies/useMovies"
import { act } from "@testing-library/react-native"

jest.mock("../../../src/apis/MovieApi",()=>{
    const { apiResponseNowPlaying } = require("../../mocks/MockData")
    return{
        fetchMovies: jest.fn().mockResolvedValue(apiResponseNowPlaying)
    }
})

describe("useMovies hooks",()=>{
  it("Should fetch initial movies",async()=>{
    const {result,waitForNextUpdate} = renderHook(()=>useMovies())
    await waitForNextUpdate();
    expect(result.current.movies.length).toBe(20)
  })
  it("Should fetch next batch of  movies",async()=>{
    const {result,waitForNextUpdate} = renderHook(()=>useMovies())
    await waitForNextUpdate();
    expect(result.current.movies.length).toBe(20)
    await act(async()=>{
      result.current.getMoreMovies()
    })
    expect(result.current.movies.length).toBe(40)
  })
  it("Should fetch on change of category of movies",async()=>{
    const {result,waitForNextUpdate} = renderHook(()=>useMovies())
    await waitForNextUpdate();
    await act(async()=>{
      result.current.setCategory("now_playing")
    })
    expect(result.current.movies.length).toBe(20)
  })
})