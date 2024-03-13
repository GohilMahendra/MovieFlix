import { Dimensions, StyleSheet, Text, View } from "react-native"
import { scaledVal } from "../../globals/utilities"
import { white } from "../../globals/colors"
const { height,width } = Dimensions.get("screen")
const WatchListEmptyContainer = () =>
{
    return(
        <View style={styles.container}>
            <Text style={styles.txt_empty}>No Items In Your Watchlist!!</Text>
        </View>
    )
}
export default WatchListEmptyContainer
const styles = StyleSheet.create({
    container:
    {
        height: height,
        width: width,
        alignItems:'center'
    },
    txt_empty:
    {
        fontSize: scaledVal(15),
        color: white,
        marginTop: height/2.5
    },
})