import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Fallback: use emoji/text icons so component works without SVG transformer.
export default function Navbar({ routes }) {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    // Allow caller to override route names via `routes` prop. Defaults chosen
    // from project screen filenames: HomeScreen, BucketlistScreen, DetailScreen, WelcomeScreen.
    const {
        home = 'Home',
        cart = 'cart',
        notifications = 'Notifications',
        profile = 'Profile',
    } = routes || {};

    function navigateTo(routeName) {
        if (!routeName) return;
        try {
            navigation.navigate(routeName);
        } catch (err) {
            // navigation.navigate can throw if route doesn't exist; fail silently
            // so the app doesn't crash. You may want to log this in dev.
            // console.warn('Navigation error', err);
        }
    }

    // merge dynamic inset padding so the bar doesn't overlap device safe areas
    const containerStyle = [
        styles.container,
        { paddingBottom: Math.max(10, insets.bottom) },
    ];

    return (
        <View style={containerStyle}>
            <TouchableOpacity
                accessibilityLabel="home-button"
                style={styles.button}
                onPress={() => navigateTo(home)}
            >
                <Text style={styles.icon}>🏠</Text>
            </TouchableOpacity>

            <TouchableOpacity
                accessibilityLabel="cart-button"
                style={styles.button}
                onPress={() => navigateTo(cart)}
            >
                <Text style={styles.icon}>🛒</Text>
            </TouchableOpacity>

            <TouchableOpacity
                accessibilityLabel="notifications-button"
                style={styles.button}
                onPress={() => navigateTo(notifications)}
            >
                <Text style={styles.icon}>🔔</Text>
            </TouchableOpacity>

            <TouchableOpacity
                accessibilityLabel="profile-button"
                style={styles.button}
                onPress={() => navigateTo(profile)}
            >
                <Text style={styles.icon}>😊</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        backgroundColor: '#04746aff',
        // small elevation/shadow so the bar sits above content
      
    },
    button: {
        padding: 6,
    },
    icon: {
        fontSize: 24,
    },
});