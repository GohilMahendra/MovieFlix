import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Text,
  RefreshControl,
  Dimensions,
  Alert,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {scaledVal} from '../../globals/utilities';
import {black, white} from '../../globals/colors';
import {Movie} from '../../types/Movies';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackType} from '../../navigation/RootStack';
import {fetchMovieDetails} from '../../apis/MovieApi';
import {MEDIA_BASE_URL} from '../../globals/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('screen');

const MovieDetails = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const route = useRoute<RouteProp<RootStackType, 'MovieDetails'>>();
  const navigation =
    useNavigation<NavigationProp<RootStackType, 'MovieDetails'>>();
  const [isInwatchlist, setIsInWatchList] = useState(false);
  const {movie_id} = route.params;

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 200, 300], [1, 0.5, 0]),
      transform: [
        {
          scale: interpolate(scrollY.value, [0, 300], [1, 0.9]),
        },
      ],
    };
  });

  const getWatchListStatus = async () => {
    const watchlistMovies = await AsyncStorage.getItem('watchlist_movies');
    const parsedMovies = watchlistMovies ? JSON.parse(watchlistMovies) : [];
    const currentMovie = parsedMovies.find(
      (child: Movie) => child.id === movie?.id,
    );
    if (currentMovie) {
      setIsInWatchList(true);
    }
  };

  const toggleWatchlist = async () => {
    if (!movie) return;
    const watchlistMovies = await AsyncStorage.getItem('watchlist_movies');
    const parsedMovies: Movie[] = watchlistMovies
      ? JSON.parse(watchlistMovies)
      : [];
    const index = parsedMovies.findIndex(
      (child: Movie) => child.id == movie.id,
    );
    if (index !== -1) {
      parsedMovies.splice(index, 1);
      setIsInWatchList(false);
    } else {
      parsedMovies.push(movie);
      setIsInWatchList(true);
    }
    await AsyncStorage.setItem(
      'watchlist_movies',
      JSON.stringify(parsedMovies),
    );
  };

  const getMovie = async () => {
    try {
      setLoading(true);
      const response = await fetchMovieDetails(movie_id);
      setMovie(response);
      setLoading(false);
    } catch (err) {
      Alert.alert('Error', String(err));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movie) getWatchListStatus();
  }, [movie]);

  useEffect(() => {
    getMovie();
  }, [movie_id]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Fontisto
          testID={'MovieDetails_btnGoBack'}
          onPress={() => navigation.goBack()}
          name="angle-left"
          color={white}
          size={scaledVal(15)}
        />
        <View />
      </View>

      {movie && (
        <>
          <Animated.Image
            source={{uri: MEDIA_BASE_URL + movie.poster_path}}
            style={[styles.imgPoster, imageAnimatedStyle]}
            resizeMode="cover"
          />

          <Animated.ScrollView
            testID={'MovieDetails_ScrollFullScreen'}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={getMovie}
                tintColor={white}
              />
            }
            contentContainerStyle={styles.scrollContent}>
            <View style={styles.contentContainer}>
              <Text testID={'MovieDetails_txtTitle'} style={styles.txt_title}>
                {movie.title}
              </Text>
              <TouchableOpacity
                testID={'MovieDetails_btnToggleWatchList'}
                onPress={toggleWatchlist}
                style={[
                  styles.btnToggleWatchlist,
                  {backgroundColor: isInwatchlist ? 'transparent' : white},
                ]}>
                <Text
                  style={[
                    styles.txtWatchlist,
                    {color: isInwatchlist ? white : black},
                  ]}>
                  {isInwatchlist
                    ? 'Remove from the watch list'
                    : '+ Add to watch list'}
                </Text>
              </TouchableOpacity>

              <View style={styles.ratingContainer}>
                <FontAwesome5
                  name={'star'}
                  solid
                  size={scaledVal(20)}
                  color={'gold'}
                />
                <Text style={styles.txtRate}>
                  {movie.vote_average.toFixed(1)}
                </Text>
              </View>

              <View style={styles.dateContainer}>
                <Text style={styles.txtDateTitle}>Release Date: </Text>
                <Text style={styles.txtDate}>{movie.release_date}</Text>
              </View>

              <Text style={styles.txtOverview}>{movie.overview}</Text>
            </View>
          </Animated.ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black,
  },
  header: {
    padding: scaledVal(10),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  imgPoster: {
    width: '100%',
    aspectRatio: 2 / 3,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  scrollContent: {
    paddingTop: width / (2 / 3),
    paddingBottom: 150,
  },
  contentContainer: {
    paddingHorizontal: scaledVal(10),
  },
  txt_header_title: {
    color: white,
    fontWeight: 'bold',
    fontSize: scaledVal(20),
  },
  txt_title: {
    color: white,
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: scaledVal(25),
  },
  btnToggleWatchlist: {
    padding: scaledVal(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: white,
    borderRadius: scaledVal(5),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scaledVal(10),
  },
  txtRate: {
    fontSize: scaledVal(20),
    color: white,
    marginLeft: scaledVal(10),
  },
  txtWatchlist: {
    fontSize: scaledVal(15),
  },
  dateContainer: {
    flexDirection: 'row',
    marginVertical: scaledVal(10),
  },
  txtDateTitle: {
    fontSize: scaledVal(15),
    color: white,
  },
  txtDate: {
    fontSize: scaledVal(15),
    color: white,
  },
  txtOverview: {
    color: white,
    fontSize: scaledVal(15),
  },
});
