import {act, fireEvent, render, screen} from '@testing-library/react-native';
import MovieDetails from '../../../src/screens/movies/MovieDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Movie} from '../../../src/types/Movies';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
  useRoute: () => ({
    params: {
      movie_id: 1094556,
    },
  }),
}));

jest.mock('../../../src/apis/MovieApi', () => {
  const {apiResponseMovie} = require('../../mocks/MockData');
  return {
    fetchMovieDetails: jest.fn().mockResolvedValue(apiResponseMovie),
  };
});

describe('MovieDetails section', () => {
  beforeEach(async () => {
    render(<MovieDetails />);
  });

  it('Movie should be rendered succesfully from the  movied id passed as params', async () => {
    const parentView = screen.getByTestId('MovieDetails_ScrollFullScreen');
    await act(async () => {
      parentView.props.refreshControl.props.onRefresh();
    });
    const txt_title = screen.getByTestId('MovieDetails_txtTitle');
    expect(txt_title.children[0]).toBeDefined();
  });
  it('I can add to watchlist', async () => {
    const btn = await screen.findByTestId('MovieDetails_btnToggleWatchList');
    await act(async () => {
      fireEvent(btn, 'press');
    });

    const watchlist = await AsyncStorage.getItem('watchlist_movies');
    const parsedWatclist: Movie[] = JSON.parse(watchlist || '');
    expect(parsedWatclist.length).toBe(1);
  });

  it('I can go back by pressing the back button', async () => {
    const back_btn = screen.getByTestId('MovieDetails_btnGoBack');
    fireEvent(back_btn, 'press');
    expect(mockGoBack).toHaveBeenCalled();
  });
});
