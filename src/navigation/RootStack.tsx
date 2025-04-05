import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/splash/SplashScreen';
import Movies from '../screens/movies/Movies';
import Search from '../screens/search/Search';
import MovieDetails from '../screens/movies/MovieDetails';
import WatchList from '../screens/movies/WatchList';

// This file contains only navigation boilerplate with no external logic.
// No unit tests are required for this.
// Assumption: React Navigation's built-in features are already well tested.
export type RootStackType = {
  SplashScreen: undefined;
  Movies: undefined;
  Search: undefined;
  MovieDetails: {
    movie_id: number;
  };
  WatchList: undefined;
};

const RootStack = () => {
  const RootStackNavigation = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <RootStackNavigation.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStackNavigation.Screen
          name="SplashScreen"
          component={SplashScreen}
        />
        <RootStackNavigation.Screen name="Movies" component={Movies} />
        <RootStackNavigation.Screen name="Search" component={Search} />
        <RootStackNavigation.Screen
          name="MovieDetails"
          component={MovieDetails}
        />
        <RootStackNavigation.Screen name="WatchList" component={WatchList} />
      </RootStackNavigation.Navigator>
    </NavigationContainer>
  );
};
export default RootStack;
