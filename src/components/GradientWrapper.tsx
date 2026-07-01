import { COLORS } from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";

interface GradientWrapperProps {
    children: React.ReactNode;
    style?: ViewStyle;
    hideGlow?: boolean;
    gradientColors?: string[]
}

const GradientWrapper = ({
    children,
    style,
    hideGlow = false,
    gradientColors
}: GradientWrapperProps) => {
    return (
        <LinearGradient
            colors={gradientColors ?? COLORS.gardientColors}
            locations={[0, 0.4, 0.75, 1]}
            style={[styles.container, style]}
        >
            {!hideGlow && <LinearGradient
                colors={[
                    "rgba(168,85,247,0.30)",
                    "rgba(168,85,247,0.10)",
                    "transparent",
                ]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.glow}
            />}

            {children}
        </LinearGradient>
    );
};

export default GradientWrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    glow: {
        position: "absolute",
        top: -120,
        alignSelf: "center",
        width: 350,
        height: 350,
        borderRadius: 999,
    },
});