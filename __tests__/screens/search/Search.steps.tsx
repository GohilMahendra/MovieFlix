import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native"
import Search from "../../../src/screens/search/Search"
import MovieCard from "../../../src/components/movies/MovieCard";

const mockNavigate = jest.fn()
const mockGoBack = jest.fn()
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: mockNavigate,
        goBack: mockGoBack
    }),
}));

jest.mock("../../../src/apis/MovieApi", () => {
    const { apiSerachResultResponse } = require("../../mocks/MockData")
    return {
        searchMovies: jest.fn().mockResolvedValue(apiSerachResultResponse)
    }
})

jest.useFakeTimers()

describe("search screen ...",()=>{
    beforeEach(()=>{
        render(
            <Search/>
        )
    })

    it("i can search the word in input",async()=>{
        const input = screen.getByTestId("input_search")
        jest.runAllTimers()
        await act(async()=>{
            fireEvent(input,"changeText","og")
        })
        jest.advanceTimersByTime(1000)
        const list = screen.getByTestId("list_search")
          await waitFor(async()=>{
            expect(list.props.data.length).toBe(20)
        })
    })

    it("I can press on the result will call navigate to other screen",async()=>{

        const input = screen.getByTestId("input_search")
        jest.runAllTimers()
        await act(async()=>{
            fireEvent(input,"changeText","og")
        })
        jest.advanceTimersByTime(500)
        await waitFor(async()=>{
            const allCards = screen.root.findAllByType(MovieCard);

            const card = allCards[0]
            await act(async()=>{
                card.props.onMoviePress(100)
            })
            expect(mockNavigate).toHaveBeenCalled()
        })
    })

    it("I can go back by pressing back button",()=>{
        const back_btn = screen.getByTestId("btn_goBack")
        fireEvent(back_btn,"press")
        expect(mockGoBack).toHaveBeenCalled()
    })
})