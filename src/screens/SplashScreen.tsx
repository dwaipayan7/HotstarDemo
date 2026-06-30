import { COLORS } from "@/constants/colors";
import { RootStackParamList } from "@/navigation/MainTabNavigator";
import SCText from "@/utils/CustomText";
import { globalStyles } from "@/utils/globalStyles";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";




ExpoSplashScreen.preventAutoHideAsync();

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, "SplashScreen">;

export default function SplashScreen() {
    const navigation = useNavigation<SplashScreenNavigationProp>();

    const onLayoutReady = useCallback(async () => {

        await ExpoSplashScreen.hideAsync();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {

            navigation.reset({
                index: 0,
                routes: [{ name: 'MainTabs' as any }],
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container} onLayout={onLayoutReady}>

            <View style={{ ...globalStyles.row, gap: 5 }}>

                <SCText color={COLORS.white} style={{
                    fontSize: 28,
                    fontWeight: 'bold'
                }}>Hotstar</SCText>
                <Feather name="star" size={25} color={'gold'} />
            </View>
            <SCText color={COLORS.white} >Streaming the future...</SCText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.neutralColor,
        alignItems: "center",
        justifyContent: "center",
        gap: 5
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: "contain",
        marginBottom: 20,
    },

    subtitle: {
        color: "#aaa",
        fontSize: 14,
        marginTop: 8,
    },
});
