import {render, screen} from '@testing-library/react-native';
import MovieCardShimmer from '../../../src/components/shimmers/MovieCardShimmer';
import MovieListShimmer from '../../../src/components/shimmers/MovieListShimmer';

describe('MovieListShimmer...', () => {
  beforeAll(() => {
    render(<MovieListShimmer />);
  });

  it('Shimmer will render 12 items successfuly', async () => {
    const list = screen.getByTestId('MovieListShimmer_List');
    expect(list.props.data.length).toBe(12);
  });
});
