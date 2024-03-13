import { Dimensions, StyleSheet, Text, View } from "react-native"
import { white } from "../../globals/colors"
import { scaledVal } from "../../globals/utilities"
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
        justifyContent:'center',
        alignItems:'center'
    },
    txt_message:
    {
        color: white,
        fontSize: scaledVal(15)
    }
})