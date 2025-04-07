import axios from 'axios';
import {BASE_URL} from '../globals/constants';
import {MovieCategory} from '../types/Movies';
import {API_TOKEN} from '../globals/secrets';

export const fetchMovies = async (
  movie_category: MovieCategory,
  page: number = 1,
) => {
  try {
    const quary =
      BASE_URL + `movie/${movie_category}?language=en-US&page=${page}`;

    const response = await axios.get(quary, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (response.data) {
      return response.data;
    } else {
      throw new Error(response.data);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const searchMovies = async (searchTerm: string) => {
  try {
    const quary = `${BASE_URL}search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`;
    const response = await axios.get(quary, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    if (response.data) {
      return response.data;
    } else {
      throw new Error(response.data);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchMovieDetails = async (movie_id: number) => {
  try {
    const quary = `${BASE_URL}movie/${movie_id}?language=en-US`;
    const response = await axios.get(quary, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    if (response.data) {
      return response.data;
    } else {
      throw new Error(response.data);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
