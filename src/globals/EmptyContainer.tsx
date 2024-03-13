import { Dimensions, StyleSheet, Text, View } from "react-native"
import { white } from "./colors"
import { scaledVal } from "./utilities"
const { height,width } = Dimensions.get("screen")
const EmptyContainer = () =>
{
    return(
        <View testID={"container_empty"} style={styles.container}>
            <Text style={styles.txt_message}> No search results found !! </Text>
        </View>
    )
}
export default EmptyContainer
const styles = StyleSheet.create({
    container:
    {
        height: height,
        width: width,
        alignItems:'center'
    },
    txt_message:
    {
        marginTop: height/2.5,
        color: white,
        fontSize: scaledVal(15)
    }
})