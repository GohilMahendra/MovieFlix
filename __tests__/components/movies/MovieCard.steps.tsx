import { fireEvent, render, screen } from "@testing-library/react-native"
import MovieCard from "../../../src/components/movies/MovieCard"
import { apiResponseMovie } from "../../mocks/MockData"

describe("Movie Card componenents",()=>{
    const mockPress = jest.fn()
    beforeEach(()=>{
        render(
            <MovieCard
            movie={apiResponseMovie}
            onMoviePress={mockPress}
            />
        )
    })

    it("i can press on the compoennts and will on press",()=>{
        const btn_movie = screen.getByTestId("btn_navigate")
        fireEvent(btn_movie,"press")
        expect(mockPress).toHaveBeenCalled()

    })
})