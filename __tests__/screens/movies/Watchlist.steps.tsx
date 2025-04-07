import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import WatchList from '../../../src/screens/movies/WatchList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WatchlistData} from '../../mocks/WatchlistMockData';
import MovieCard from '../../../src/components/movies/MovieCard';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useFocusEffect: jest.fn(),
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
  useIsFocused: jest.fn(() => true),
}));

describe('Watchlist section', () => {
  beforeAll(async () => {
    await AsyncStorage.setItem(
      'watchlist_movies',
      JSON.stringify(WatchlistData),
    );
  });

  beforeEach(() => {
    render(<WatchList />);
  });

  it('Movie should be rendered succesfully from the  movied id passed as params', async () => {
    await waitFor(async () => {
      const list = screen.getByTestId('list_watchlist');
      expect(list.props.data.length).toBe(6);
    });
  });

  it('I can go back by pressing the back button', () => {
    const back_btn = screen.getByTestId('btn_goBack');
    fireEvent(back_btn, 'press');
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('MovieCard receives correct props and calls navigation on press', async () => {
    const cards = await waitFor(() => screen.findAllByTestId(/card_movie/));

    await act(async () => {
      fireEvent.press(cards[0]);
    });

    expect(mockNavigate).toHaveBeenCalled();
  });
});
