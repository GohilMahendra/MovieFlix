import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native"
import Movies from "../../../src/screens/movies/Movies"
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
    const { apiResponseNowPlaying } = require("../../mocks/MockData")
    return {
        fetchMovies: jest.fn().mockResolvedValue(apiResponseNowPlaying)
    }
})

describe("Movies ...",()=>{
    beforeEach(() => {
            render(
                <Movies />
            );
    });

    it("Movie screen renders with pre selected now_playing",async()=>{
            const list = screen.getByTestId("list_movies")
            expect(list.props.data.length).toBe(20)
    })
    it("Movies can be loaded more once reach the end",async()=>{
        const list = screen.getByTestId("list_movies")
        expect(list.props.data.length).toBe(20)

        await act(async()=>{
            list.props.onEndReached();
        })

        expect(list.props.data.length).toBe(40)
    })

    it("i can select the popular video part",async()=>{
        const btn_popular = screen.getByTestId("popular")
        await act(async()=>{
            fireEvent(btn_popular,"press")
        })
    })

    it("I can press on item and will call navigation",async()=>{
        await waitFor(async()=>{
            const allCards = screen.root.findAllByType(MovieCard);
            expect(allCards.length).toBe(20);
    
            const card = allCards[0]
            await act(async()=>{
                card.props.onMoviePress(16)
            })
        })
        expect(mockNavigate).toHaveBeenCalled()
    })

})