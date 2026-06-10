import { Link } from 'expo-router';
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';


export default function NotFoundScreen() {
    return (
        <ImageBackground
            source={require('../assets/weather-img/404.jpg')}
            style={styles.background} >
            <SafeAreaView style={styles.overlay}>
                <View style={styles.content}>
                    <Text style={styles.title}>Oops!</Text>

                    <Text style={styles.description}>
                        Trang bạn tìm không tồn tại hoặc đã bị di chuyển.
                    </Text>

                    <Link href="/Home" style={styles.button}>
                        Go back Home
                    </Link>
                </View>
            </SafeAreaView>
        </ImageBackground >
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    title: {
        color: '#ffffff',
        fontSize: 44,
        fontWeight: '800',
        textAlign: 'center',
    },
    description: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 28,
    },
    button: {
        minHeight: 52,
        minWidth: 180,
        borderRadius: 18,
        overflow: 'hidden',
        backgroundColor: '#f59e0b',
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 22,
    },
});
