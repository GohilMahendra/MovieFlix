import {  StyleSheet, Text, View } from "react-native"
import { black, primary } from "../../globals/colors"
import { useEffect } from "react"
import { NavigationProp, StackActions, useNavigation } from "@react-navigation/native"
import { RootStackType } from "../../navigation/RootStack"
import { scaledVal } from "../../globals/utilities"
import { APP_NAME } from "../../globals/constants"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
const SplashScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackType, "Movies">>()
    const letters = APP_NAME.split("")
    const animations = letters.map(() => useSharedValue(-100));
    const createAnimatedStyle = (animatedValue: any) => {
        return useAnimatedStyle(() => {
            return {
                transform: [{ translateY: animatedValue.value }],
            };
        });
    };

    useEffect(() => {
        setTimeout(() => {
            const resetAction = StackActions.replace("Movies")
            navigation.dispatch(resetAction)
        }, 3000);
    }, [])

    useEffect(() => {
        const animationDelay = 100;
        const timeouts: ReturnType<typeof setTimeout>[] = []
        letters.forEach((letter, index) => {
            const timeoutId = setTimeout(() => {
                animations[index].value = withSpring(0, { damping: 10, stiffness: 100 }); // Fall animation for each letter
            }, animationDelay * index);

            timeouts.push(timeoutId)
        });
        return () => {
            timeouts.forEach((timeoutId) => clearTimeout(timeoutId))
        }
    }, [])

    return (
        <View
            testID={"view_container"}
            style={styles.container}
        >
           <Animated.View style={[styles.titleContainer]}>
                {APP_NAME.split("").map((letter, index) => (
                    <Animated.Text key={index} style={[styles.txt_title, createAnimatedStyle(animations[index])]}>
                        {letter}
                    </Animated.Text>
                ))}
            </Animated.View>
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
    titleContainer:
    {
        flexDirection: "row",
        padding: 10,

    },
    txt_title:
    {
        color: primary,
        fontSize: scaledVal(35),
        fontWeight: "bold"
    }

})