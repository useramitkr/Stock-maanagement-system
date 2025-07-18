import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
    const router = useRouter();

    // Animated values for the circles
    const circle1Anim = useRef(new Animated.Value(0)).current;
    const circle2Anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animation for circle1
        Animated.loop(
            Animated.sequence([
                Animated.timing(circle1Anim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(circle1Anim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Animation for circle2
        Animated.loop(
            Animated.sequence([
                Animated.timing(circle2Anim, {
                    toValue: 1,
                    duration: 2000,
                    delay: 500, // Slight delay for a wave-like effect
                    useNativeDriver: true,
                }),
                Animated.timing(circle2Anim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    // Interpolate animation values for translation
    const circle1TranslateY = circle1Anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20], 
    });

    const circle2TranslateY = circle2Anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 20], 
    });

    return (
        <View style={styles.fullScreenContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#303742" />

            <View style={styles.blueBackground}>
                <View style={styles.circleContainer}>
                    <Animated.View style={[styles.circle1, { transform: [{ translateY: circle1TranslateY }] }]} />
                    <Animated.View style={[styles.circle2, { transform: [{ translateY: circle2TranslateY }] }]} />
                </View>

                <Text style={styles.appTitle}>INVENTORY</Text>
            </View>

            <View style={styles.whiteBottomSection}>
                <TouchableOpacity
                    style={styles.dashboardButton}
                    onPress={() => router.push('/screens/Todo')}
                >
                    <Text style={styles.dashboardButtonText}>Go to Dashboard</Text>
                </TouchableOpacity>
                <Text style={styles.bottomTagline}>"Manage Your Inventory Efficiently"</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#303742',
        height: '100%',
    },
    blueBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: height * 0.25,
    },
    circleContainer: {
        position: 'relative',
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    circle1: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        left: 0,
        top: 0,
    },
    circle2: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        right: 0,
        bottom: 0,
    },
    appTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: 5,
        marginTop: 20,
    },
    whiteBottomSection: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: height * 0.30,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    bottomTagline: {
        fontSize: 16,
        color: '#666',
        marginVertical: 10,
        textAlign: 'center',
    },
    dashboardButton: {
        backgroundColor: '#3e8a45ff',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 10,
        shadowColor: '#3e8a45ff',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        minWidth: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dashboardButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,
        textAlign: 'center',
    },
});
