import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native"
import SplashScreen from "../screens/splash/SplashScreen";
import Movies from "../screens/movies/Movies";
export type RootStackType =
{
    SplashScreen:undefined,
    Movies:undefined
}

const RootStack = () =>
{
    const RootStackNavigation = createNativeStackNavigator()
    return(
        <NavigationContainer>
            <RootStackNavigation.Navigator>
                <RootStackNavigation.Screen
                name="SplashScreen"
                component={SplashScreen}
                />
                 <RootStackNavigation.Screen
                name="Movies"
                component={Movies}
                />
            </RootStackNavigation.Navigator>
        </NavigationContainer>
    )
}
export default RootStack