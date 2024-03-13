import { renderHook } from "@testing-library/react-hooks"
import { act, render } from "@testing-library/react-native"
import useSearch from "../../../src/hooks/search/useSearch"

jest.mock("../../../src/apis/MovieApi",()=>{
    const { apiSerachResultResponse } = require("../../mocks/MockData")
    return{
        searchMovies: jest.fn().mockResolvedValue(apiSerachResultResponse)
    }
})
describe("useSearch hooks ...",()=>{
    it("search will be called on change of search term",async()=>{
        const { result } = renderHook(()=>useSearch())
    
        await act(async()=>{
            result.current.setSearchTerm("die")
        })

        expect(result.current.movies.length).toBe(20)
    })
})