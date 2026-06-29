import { useNavigation } from "@react-navigation/native";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

// Keep the native splash screen visible while the app initializes
ExpoSplashScreen.preventAutoHideAsync();

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, "SplashScreen">;

export default function SplashScreen() {
    const navigation = useNavigation<SplashScreenNavigationProp>();

    const onLayoutReady = useCallback(async () => {
        // Hide the native splash once our custom splash screen is rendered
        await ExpoSplashScreen.hideAsync();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            // Replace so user can't go back to splash
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainTabs' as any }], // Using as any here temporarily to bypass complex param typing for tabs if needed, though MainTabs is in RootStackParamList
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container} onLayout={onLayoutReady}>
            {/* Replace with your logo */}
            {/* <Image source={require("../../assets/images/logo.png")} style={styles.logo} /> */}

            <Text style={styles.title}>Hotstar Demo</Text>
            <Text style={styles.subtitle}>Streaming made simple</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: "contain",
        marginBottom: 20,
    },
    title: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "700",
    },
    subtitle: {
        color: "#aaa",
        fontSize: 14,
        marginTop: 8,
    },
});
