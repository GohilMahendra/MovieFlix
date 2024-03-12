import { SafeAreaView,ScrollView,View,Image, Text, Dimensions, RefreshControl, StyleSheet } from "react-native"
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
const { height,width } = Dimensions.get("window")
const MovieDetails = () =>
{

    const [movie,setMovie] = useState<Movie | null>(null)
    const [loading,setLoading] = useState<boolean>(false)
    const route = useRoute<RouteProp<RootStackType,"MovieDetails">>()
    const navigation = useNavigation<NavigationProp<RootStackType,"MovieDetails">>()
    const { movie_id } = route.params

    const getMovie = async() =>
    {
        try
        {
            setLoading(true)
            const response: Movie = await fetchMovieDetails(movie_id)
            setMovie(response)
            setLoading(false)
        }
        catch(err)
        {
            console.log(err)
            setLoading(false)
        }
    }
    useEffect(()=>{
        getMovie()
    },[movie_id])

    return(
        <SafeAreaView style={{flex:1,backgroundColor:black}}>
            <View style={{
                padding: scaledVal(10),
                justifyContent:'space-between',
                flexDirection:"row",
                alignItems:"center"
            }}>
                <Fontisto 
                onPress={()=>navigation.goBack()}
                name="angle-left"
                color={white}
                size={scaledVal(15)}
                />
                <View/>
            </View>
            <ScrollView 
            refreshControl={
                <RefreshControl
                tintColor={white}
                refreshing={loading}
                onRefresh={()=>getMovie()}
                />
            }
            style={{
                flex:1,
                padding: scaledVal(10)
            }}>
               {
                movie && 
                <View style={{
                    flex:1,
                }}>
                    <View>
                    <Image
                    source={{uri:`${MEDIA_BASE_URL + movie.poster_path}` }}
                    style={{
                        width:"100%",
                        height: height/2
                    }}
                    />
                    </View>
            
                    <Text style={{
                        color: white,
                        alignSelf:"center",
                        textAlign:"center",
                        textDecorationLine:"underline",
                        fontWeight:"bold",
                        fontSize: scaledVal(25)
                    }}>{movie.title}</Text>
                     <View style={{
                        flexDirection:"row",
                        alignSelf:'flex-end',
                        alignItems:'center',
                        marginVertical:scaledVal(10)
                    }}>
                        <FontAwesome5
                        name={"star"}
                        solid
                        size={scaledVal(20)}
                        color={"gold"}
                        />
                        <Text style={{
                            fontSize: scaledVal(20),
                            color: white,
                            marginLeft: scaledVal(10)
                        }}>{movie.vote_average.toFixed(1)}</Text>
                    </View>
                    <View style={{
                        flexDirection:"row",
                        marginVertical:scaledVal(10)
                    }}>
                        <Text style={{
                            fontSize: scaledVal(15),
                            color: white
                        }}>Release Date: </Text>
                        <Text style={{
                            fontSize: scaledVal(15),
                            color: white,
                        }}>{movie.release_date}</Text>
                    </View>
                      <Text style={{
                        color: white,
                        fontWeight:'bold',
                        fontSize: scaledVal(20)
                    }}>Summary:</Text>
                     <Text style={{
                        color: white,
                        fontSize: scaledVal(15)
                    }}>{movie.overview}</Text>
                </View>
               }

            </ScrollView>
        </SafeAreaView>
    )
}
export default MovieDetails

const styles = StyleSheet.create({

})