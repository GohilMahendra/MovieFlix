import { SafeAreaView, TouchableOpacity, ScrollView, View, Image, Text, RefreshControl, StyleSheet, Alert, Dimensions } from "react-native"
import { scaledVal } from "../../globals/utilities"
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { black, white } from "../../globals/colors";
import { useEffect, useState } from "react";
import { Movie } from "../../types/Movies";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackType } from "../../navigation/RootStack";
import { fetchMovieDetails } from "../../apis/MovieApi";
import { MEDIA_BASE_URL } from "../../globals/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
const { height } = Dimensions.get("screen")
const MovieDetails = () => {
    const [movie, setMovie] = useState<Movie | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const route = useRoute<RouteProp<RootStackType, "MovieDetails">>()
    const navigation = useNavigation<NavigationProp<RootStackType, "MovieDetails">>()
    const [isInwatchlist, setIsInWatchList] = useState<boolean>(false)
    const { movie_id } = route.params

    const getWatchListStatus = async () => {
        const watchlistMovies = await AsyncStorage.getItem("watchlist_movies")
        const parsedMovies = (watchlistMovies) ? JSON.parse(watchlistMovies) : []
        const currentMovie = parsedMovies.find((child: Movie) => child.id === movie!.id)
        console.log("this movie is in watch list")
        if (currentMovie) {
            setIsInWatchList(true)
        }
    }

    const toggleWatchlist = async () => {
        if (!movie)
            return

        const watchlistMovies = await AsyncStorage.getItem("watchlist_movies")
        const parsedMovies: Movie[] = (watchlistMovies) ? JSON.parse(watchlistMovies) : []
        const isAlreadyThere = parsedMovies.findIndex((child: Movie) => child.id == movie.id)
        if (isAlreadyThere != -1) {
            parsedMovies.splice(isAlreadyThere, 1)
            setIsInWatchList(false)
        }
        else {
            parsedMovies.push(movie)
            setIsInWatchList(true)
        }

        await AsyncStorage.setItem("watchlist_movies", JSON.stringify(parsedMovies))
    }

    const getMovie = async () => {
        try {
            setLoading(true)
            const response: Movie = await fetchMovieDetails(movie_id)
            setMovie(response)
            setLoading(false)
        }
        catch (err) {
            Alert.alert("Error", err as string)
            setLoading(false)
        }
    }
    useEffect(() => {
        if (movie)
            getWatchListStatus()
    }, [movie])
    useEffect(() => {
        getMovie()
    }, [movie_id])

    return (
        <SafeAreaView style={styles.container}>
            {
                loading &&
                <ActivityIndicator
                    color={white}
                    size={"large"}
                    style={styles.loader}
                />
            }
            <View style={styles.header}>
                <Fontisto
                    testID={"btn_goBack"}
                    onPress={() => navigation.goBack()}
                    name="angle-left"
                    color={white}
                    size={scaledVal(15)}
                />
                <View />
            </View>
            <ScrollView
                testID={"scroll_fullScreen"}
                refreshControl={
                    <RefreshControl
                        tintColor={white}
                        refreshing={loading}
                        onRefresh={() => getMovie()}
                    />
                }
                style={styles.movieContainer}>
                {
                    movie &&
                    <View style={styles.innerMovieContainer}>
                        <View>
                            <Image
                                source={{ uri: `${MEDIA_BASE_URL + movie.poster_path}` }}
                                style={styles.imgPoster}
                            />
                        </View>
                        <Text testID={"txt_title"} style={styles.txt_title}>{movie.title}</Text>
                        <TouchableOpacity
                            testID={"btn_addToWatchlist"}
                            onPress={() => toggleWatchlist()}
                            style={[styles.btnToggleWatchlist, { backgroundColor: (isInwatchlist) ? black : white }]}>
                            <Text style={[styles.txtWatchlist, { color: (isInwatchlist) ? white : black }]}>{
                                isInwatchlist ?
                                    "remove from the watch list"
                                    : "+ Add to watch list"
                            }</Text>

                        </TouchableOpacity>
                        <View style={styles.ratingContainer}>
                            <FontAwesome5
                                name={"star"}
                                solid
                                size={scaledVal(20)}
                                color={"gold"}
                            />
                            <Text style={styles.txtRate}>{movie.vote_average.toFixed(1)}</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.txtDateTitle}>Release Date: </Text>
                            <Text style={styles.txtDate}>{movie.release_date}</Text>
                        </View>
                        <Text style={styles.txtOverview}>{movie.overview}</Text>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}
export default MovieDetails

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: black
    },
    header:
    {
        padding: scaledVal(10),
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: "center"
    },
    movieContainer:
    {
        flex: 1,
        padding: scaledVal(10)
    },
    imgPoster:
    {
        width: "100%",
        aspectRatio: 1,
        height: "auto"
    },
    txt_title:
    {
        color: white,
        marginVertical: 10,
        fontWeight: "bold",
        fontSize: scaledVal(25)
    },
    btnToggleWatchlist:
    {
        padding: scaledVal(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.2,
        borderColor: white,
        borderRadius: scaledVal(5),
    },
    ratingContainer:
    {
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: scaledVal(10)
    },
    innerMovieContainer:
    {
        flex: 1,
    },
    txtRate:
    {
        fontSize: scaledVal(20),
        color: white,
        marginLeft: scaledVal(10)
    },
    txtWatchlist:
    {
        fontSize: scaledVal(15),
    },
    dateContainer:
    {
        flexDirection: "row",
        marginVertical: scaledVal(10)
    },
    txtDateTitle:
    {
        fontSize: scaledVal(15),
        color: white
    },
    txtDate:
    {
        fontSize: scaledVal(15),
        color: white,
    },
    txtOverview:
    {
        color: white,
        fontSize: scaledVal(15)
    },
    loader:
    {
        position: "absolute",
        alignSelf: 'center',
        marginTop: height / 2 - scaledVal(20)
    }
})