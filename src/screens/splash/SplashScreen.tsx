import {  StyleSheet, Text, View } from "react-native"
import { black, primary } from "../../globals/colors"
import { useEffect } from "react"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackType } from "../../navigation/RootStack"
import { scaledVal } from "../../globals/utilities"
import { APP_NAME } from "../../globals/constants"
const SplashScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackType, "Movies">>()
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Movies")
        }, 3000);
    }, [])

    return (
        <View
            testID={"view_container"}
            style={styles.container}
        >
            <Text style={styles.txt_title}>{APP_NAME}</Text>
        </View>
    )
}
export default SplashScreen

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: black,
        justifyContent: "center",
        alignItems: "center"
    },
    txt_title:
    {
        color: primary,
        fontSize: scaledVal(35),
        fontWeight: "bold"
    }

})