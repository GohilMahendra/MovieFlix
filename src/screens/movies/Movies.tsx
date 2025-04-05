import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {black, primary, white} from '../../globals/colors';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import useMovies from '../../hooks/movies/useMovies';
import {Category, Movie, MovieCategory} from '../../types/Movies';
import {TouchableOpacity} from 'react-native';
import MovieCard from '../../components/movies/MovieCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackType} from '../../navigation/RootStack';
import {scaledVal} from '../../globals/utilities';
import {APP_NAME} from '../../globals/constants';
import {useCallback, useRef} from 'react';
import MovieCardShimmer from '../../components/shimmers/MovieCardShimmer';
import MovieListShimmer from '../../components/shimmers/MovieListShimmer';
const {height} = Dimensions.get('screen');
const Movies = () => {
  const {loading, movies, category, setCategory, getMoreMovies} = useMovies();
  const list_ref = useRef<FlatList | null>(null);
  const categories: Category[] = [
    {
      label: 'Now Playing',
      value: 'now_playing',
    },
    {
      label: 'Popular',
      value: 'popular',
    },
    {
      label: 'Top Rated',
      value: 'top_rated',
    },
    {
      label: 'Upcoming',
      value: 'upcoming',
    },
  ];
  const navigation = useNavigation<NavigationProp<RootStackType, 'Movies'>>();
  const renderMovies = useCallback((movie: Movie, index: number) => {
    return (
      <MovieCard
        testID={'card_movie' + index.toString()}
        movie={movie}
        onMoviePress={(movie_id: number) =>
          navigation.navigate('MovieDetails', {
            movie_id: movie_id,
          })
        }
      />
    );
  }, []);

  const changeCategory = (selected_category: MovieCategory) => {
    list_ref.current?.scrollToOffset({animated: true, offset: 0});
    setCategory(selected_category as MovieCategory);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View />
        <Text style={styles.txtHeader}>{APP_NAME}</Text>
        <View style={styles.btnContainer}>
          <FontAwesome5
            onPress={() => navigation.navigate('WatchList')}
            name="heart"
            style={{
              marginRight: scaledVal(10),
            }}
            color={white}
            size={20}
          />
          <Fontisto
            onPress={() => navigation.navigate('Search')}
            name="search"
            color={white}
            size={20}
          />
        </View>
      </View>
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((type, index) => {
            return (
              <TouchableOpacity
                key={`category_key${type.value}`}
                testID={type.value}
                onPress={() => changeCategory(type.value)}
                style={[
                  styles.tab,
                  {
                    backgroundColor: category == type.value ? white : black,
                  },
                ]}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: category == type.value ? black : white,
                  }}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {loading ? (
        <MovieListShimmer />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                setCategory(category);
              }}
            />
          }
          testID={'list_movies'}
          ref={ref => (list_ref.current = ref)}
          data={movies}
          extraData={category}
          numColumns={3}
          onEndReached={() => getMoreMovies()}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => renderMovies(item, index)}
        />
      )}
    </SafeAreaView>
  );
};
export default Movies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black,
  },

  header: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
  },
  txtHeader: {
    fontWeight: '800',
    fontSize: scaledVal(20),
    color: primary,
    marginLeft: scaledVal(20),
    textAlign: 'center',
  },
  tab: {
    padding: scaledVal(10),
    margin: scaledVal(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaledVal(5),
    borderColor: white,
    borderWidth: 0.2,
  },
  btnContainer: {
    flexDirection: 'row',
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: height / 2 - scaledVal(20),
  },
});
