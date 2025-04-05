import React from 'react';
import {render, screen} from '@testing-library/react-native';
import MovieCardShimmer from '../../../src/components/shimmers/MovieCardShimmer';

describe('Movie card shimmer...', () => {
  beforeAll(() => {
    render(<MovieCardShimmer testID={'MockTestID'} />);
  });

  it('It will render movide card shimmer', () => {
    const parent_view = screen.getByTestId('MockTestIDMovieCardShimmer_view');
    expect(parent_view).toBeDefined();
  });
});
