import { render, screen } from "@testing-library/react-native";
import SplashScreen from "../../../src/screens/splash/SplashScreen";

const mockNavigate = jest.fn();
const mockReplace = jest.fn();
const mockDispatch = jest.fn()
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    dispatch: mockDispatch
  }),
}));

jest.useFakeTimers();

describe("SplashScreen ...",()=>{
    beforeEach(()=>{
        render(
            <SplashScreen/>
        )
    })
    it("renders the splashscreen",()=>{
        const container = screen.findByTestId("view_container")
        expect(container).toBeTruthy()
    })
    it("it will navigate to movie screen after 3 seconds",()=>{
        jest.advanceTimersByTime(3000)
        expect(mockNavigate).toHaveBeenCalled()
    })
})