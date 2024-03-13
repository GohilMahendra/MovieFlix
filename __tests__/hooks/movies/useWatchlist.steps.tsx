import { renderHook } from "@testing-library/react-hooks"
import useWatchlist from "../../../src/hooks/movies/useWatchlist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { WatchlistData } from "../../mocks/WatchlistMockData"

describe("useWatchlist hook ...",()=>{
    beforeEach(async()=>{
        await AsyncStorage.setItem("watchlist_movies",JSON.stringify(WatchlistData))
    })

    it("I can get the watchlist data from the backend",async()=>{
        const { result,waitForNextUpdate } = renderHook(()=>useWatchlist())
        await waitForNextUpdate()
        expect(result.current.movies.length).toBe(6)
    })

    it("it should handle Error in terms of no data",async()=>{
        await AsyncStorage.clear()
        const { result,waitForNextUpdate } = renderHook(()=>useWatchlist())
        await waitForNextUpdate()
        expect(result.current.movies.length).toBe(0)
    })
})