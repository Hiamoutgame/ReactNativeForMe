import {
    fetchCurrentWeather,
    formatTemperature,
    formatTimeFromUnix,
    getBackgroundImage,
    getWindDirection,
} from "@/common/apis/weather";
import { WeatherApiResponse } from "@/constants/weather";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CityPage() {
    const { city } = useLocalSearchParams<{ city: string }>();
    const [weather, setWeather] = useState<WeatherApiResponse | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function loadWeatherDetail() {
            if (!city) {
                setError("Thiếu tên thành phố.");
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError("");

            try {
                const result = await fetchCurrentWeather(city);
                if (isMounted) {
                    setWeather(result);
                }
            } catch (detailError) {
                if (isMounted) {
                    setWeather(null);
                    setError(
                        detailError instanceof Error
                            ? detailError.message
                            : "Không thể tải chi tiết thời tiết.",
                    );
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadWeatherDetail();

        return () => {
            isMounted = false;
        };
    }, [city]);

    const condition = weather?.weather[0];
    const bgImage = getBackgroundImage(condition?.icon);

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <ImageBackground source={bgImage} style={styles.screen} imageStyle={styles.backgroundImage}>
                <SafeAreaView style={styles.screen}>
                    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                        <Pressable onPress={() => router.back()} style={styles.backButton}>
                            <Text style={styles.backButtonText}>← Quay lại</Text>
                        </Pressable>

                        {isLoading ? (
                            <View style={styles.centerCard}>
                                <ActivityIndicator color="#ffffff" size="large" />
                            </View>
                        ) : error ? (
                            <View style={styles.centerCard}>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : weather ? (
                            <>
                                <View style={styles.header}>
                                    <Text style={styles.headerLabel}>Thời tiết</Text>
                                    <Text style={styles.headerCity}>ở {weather.name.toUpperCase()}</Text>
                                </View>

                                <View style={styles.gridContainer}>
                                    <View style={styles.row}>
                                        <View style={[styles.cell, styles.borderRight, styles.borderBottom]}>
                                            <View style={styles.cellHeader}>
                                                <Text style={styles.cellTitle}>Temperature</Text>
                                                <Text style={styles.arrowIcon}>→</Text>
                                            </View>
                                            <Text style={styles.mainValue}>{formatTemperature(weather.main.temp)}</Text>
                                            <Text style={styles.subText}>Feels like {formatTemperature(weather.main.feels_like)}</Text>
                                            <View style={styles.minMaxRow}>
                                                <Text style={styles.subText}>Max {formatTemperature(weather.main.temp_max)}</Text>
                                                <Text style={styles.subText}>Min {formatTemperature(weather.main.temp_min)}</Text>
                                            </View>
                                        </View>

                                        <View style={[styles.cell, styles.borderBottom]}>
                                            <View style={styles.cellHeader}>
                                                <Text style={styles.cellTitle}>Wind</Text>
                                                <Text style={styles.arrowIcon}>→</Text>
                                            </View>
                                            <Text style={styles.mainValue}>
                                                {Math.round(weather.wind.speed)} <Text style={styles.unitText}>m/s</Text>
                                            </Text>
                                            <Text style={styles.subText}>{getWindDirection(weather.wind.deg)}</Text>
                                        </View>
                                    </View>

                                    <View style={[styles.forecastRow, styles.borderBottom]}>
                                        <View style={styles.forecastItem}>
                                            <Text style={styles.forecastIcon}>☁️</Text>
                                            <Text style={styles.forecastTemp}>{formatTemperature(weather.main.temp)}</Text>
                                            <Text style={styles.forecastTime}>Now</Text>
                                        </View>
                                        <View style={styles.forecastItem}>
                                            <Text style={styles.forecastIcon}>🌥️</Text>
                                            <Text style={styles.forecastTemp}>{formatTemperature(weather.main.temp - 1)}</Text>
                                            <Text style={styles.forecastTime}>Later</Text>
                                        </View>
                                    </View>

                                    <View style={styles.row}>
                                        <View style={[styles.cell, styles.borderRight]}>
                                            <View style={styles.cellHeader}>
                                                <Text style={styles.cellTitle}>Pressure</Text>
                                                <Text style={styles.arrowIcon}>→</Text>
                                            </View>
                                            <View style={styles.gaugeContainer}>
                                                <Text style={styles.mainValueSmall}>{weather.main.pressure}</Text>
                                                <Text style={styles.unitTextSmall}>hPa</Text>
                                            </View>
                                        </View>

                                        <View style={styles.cell}>
                                            <View style={styles.cellHeader}>
                                                <Text style={styles.cellTitle}>Sunset</Text>
                                                <Text style={styles.arrowIcon}>→</Text>
                                            </View>
                                            <View style={styles.sunsetContainer}>
                                                <Text style={styles.sunsetText}>Sunset at {formatTimeFromUnix(weather.sys.sunset, weather.timezone)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </>
                        ) : null}
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1 },
    backgroundImage: { opacity: 1 },
    content: { flexGrow: 1, padding: 24, backgroundColor: "rgba(0, 0, 0, 0.2)" },
    backButton: { marginBottom: 20 },
    backButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
    centerCard: { flex: 1, alignItems: "center", justifyContent: "center" },
    errorText: { color: "#ffffff", fontSize: 16 },
    header: { marginBottom: 40, marginTop: 20 },
    headerLabel: { color: "#ffffff", fontSize: 32, fontWeight: "700", letterSpacing: 1 },
    headerCity: { color: "#ffffff", fontSize: 32, fontWeight: "700", letterSpacing: 1 },
    gridContainer: { borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.3)", borderRadius: 24, overflow: "hidden", backgroundColor: "rgba(255, 255, 255, 0.1)" },
    row: { flexDirection: "row" },
    cell: { flex: 1, padding: 20, minHeight: 180, justifyContent: "space-between" },
    borderRight: { borderRightWidth: 1, borderColor: "rgba(255, 255, 255, 0.3)" },
    borderBottom: { borderBottomWidth: 1, borderColor: "rgba(255, 255, 255, 0.3)" },
    cellHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    cellTitle: { color: "#ffffff", fontSize: 16, fontWeight: "400" },
    arrowIcon: { color: "#ffffff", fontSize: 18, opacity: 0.8 },
    mainValue: { color: "#ffffff", fontSize: 56, fontWeight: "600" },
    mainValueSmall: { color: "#ffffff", fontSize: 36, fontWeight: "600", textAlign: "center" },
    unitText: { fontSize: 24, fontWeight: "400" },
    unitTextSmall: { color: "#ffffff", fontSize: 14, textAlign: "center", opacity: 0.8 },
    subText: { color: "#ffffff", fontSize: 13, opacity: 0.8, marginTop: 4 },
    minMaxRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8, paddingRight: 20 },
    forecastRow: { flexDirection: "row", padding: 20, justifyContent: "space-around", alignItems: "center" },
    forecastItem: { alignItems: "center" },
    forecastIcon: { fontSize: 28, marginBottom: 8 },
    forecastTemp: { color: "#ffffff", fontSize: 18, fontWeight: "600" },
    forecastTime: { color: "#ffffff", fontSize: 13, opacity: 0.8, marginTop: 4 },
    gaugeContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    sunsetContainer: { flex: 1, justifyContent: "flex-end" },
    sunsetText: { color: "#ffffff", fontSize: 13, opacity: 0.8 },
});
