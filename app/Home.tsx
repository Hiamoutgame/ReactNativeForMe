import { fetchCurrentWeather, formatTemperature, getWeatherIconUrl } from "@/common/apis/weather";
import { WeatherApiResponse } from "@/constants/weather";
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const backgroundImage = require("../assets/weather-img/sky-cloud-blue-background.jpg");

export default function HomePage() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<WeatherApiResponse | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSearch() {
        const keyword = city.trim();
        console.log(keyword);
        const weatherAppConfig = process.env.WEATHER_APP_KEY;
        console.log(weatherAppConfig);
        if (!keyword) {
            setError("Vui lòng nhập tên thành phố.");
            setWeather(null);
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const result = await fetchCurrentWeather(keyword);
            setWeather(result);
        } catch (searchError) {
            setWeather(null);
            setError(searchError instanceof Error ? searchError.message : "Không thể tìm thời tiết.");
        } finally {
            setIsLoading(false);
        }
    }

    function openDetail() {
        if (!weather?.name) {
            return;
        }

        router.push({ pathname: "/weather/[city]", params: { city: weather.name } });
    }

    const condition = weather?.weather[0];
    const iconUrl = getWeatherIconUrl(condition?.icon);

    return (
        <ImageBackground source={backgroundImage} style={styles.screen} imageStyle={styles.backgroundImage}>
            <SafeAreaView style={styles.screen}>
                <View style={styles.overlay}>
                    <View style={styles.header}>
                        <Text style={styles.eyebrow}>OpenWeather Live</Text>
                        <Text style={styles.title}>Weather App</Text>
                        <Text style={styles.subtitle}>Nhập tên thành phố để xem nhiệt độ, tình trạng và biểu tượng thời tiết.</Text>
                    </View>

                    <View style={styles.searchCard}>
                        <TextInput
                            placeholder="Ví dụ: Ho Chi Minh, Tokyo..."
                            placeholderTextColor="#94a3b8"
                            value={city}
                            onChangeText={setCity}
                            style={styles.input}
                            returnKeyType="search"
                            autoCapitalize="words"
                            onSubmitEditing={handleSearch}
                        />
                        <Pressable onPress={handleSearch} style={styles.searchButton} disabled={isLoading}>
                            {isLoading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.searchButtonText}>Tìm</Text>}
                        </Pressable>
                    </View>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    {weather ? (
                        <Pressable onPress={openDetail} style={styles.weatherCard}>
                            <View style={styles.cardTopRow}>
                                <View>
                                    <Text style={styles.cityName}>{weather.name}, {weather.sys.country}</Text>
                                    <Text style={styles.condition}>{condition?.description ?? "Đang cập nhật"}</Text>
                                </View>
                                {iconUrl ? <Image source={{ uri: iconUrl }} style={styles.weatherIcon} /> : null}
                            </View>

                            <Text style={styles.temperature}>{formatTemperature(weather.main.temp)}</Text>
                            <View style={styles.metricsRow}>
                                <Text style={styles.metric}>Cảm giác {formatTemperature(weather.main.feels_like)}</Text>
                                <Text style={styles.metric}>Độ ẩm {weather.main.humidity}%</Text>
                            </View>
                            <Text style={styles.detailHint}>Bấm vào thành phố để xem chi tiết →</Text>
                        </Pressable>
                    ) : (
                        <View style={styles.emptyCard}>
                            <Text style={styles.emptyIcon}>☁️</Text>
                            <Text style={styles.emptyText}>Dữ liệu thời tiết sẽ xuất hiện ở đây sau khi bạn tìm kiếm.</Text>
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.9,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 24,
        backgroundColor: "rgba(12, 74, 110, 0.25)",
    },
    header: {
        marginBottom: 24,
    },
    eyebrow: {
        color: "#fde68a",
        fontSize: 13,
        fontWeight: "800",
        letterSpacing: 1.8,
        textAlign: "center",
        textTransform: "uppercase",
    },
    title: {
        color: "#ffffff",
        fontSize: 42,
        fontWeight: "900",
        marginTop: 8,
        textAlign: "center",
        textShadowColor: "rgba(15, 23, 42, 0.45)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
    },
    subtitle: {
        color: "rgba(255, 255, 255, 0.92)",
        fontSize: 16,
        lineHeight: 23,
        marginTop: 10,
        textAlign: "center",
    },
    searchCard: {
        minHeight: 64,
        borderRadius: 22,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 18,
        paddingRight: 8,
        shadowColor: "#0f172a",
        shadowOpacity: 0.18,
        shadowRadius: 18,
        elevation: 6,
    },
    input: {
        flex: 1,
        color: "#0f172a",
        fontSize: 16,
        minHeight: 54,
    },
    searchButton: {
        minWidth: 78,
        minHeight: 48,
        borderRadius: 16,
        backgroundColor: "#f97316",
        alignItems: "center",
        justifyContent: "center",
    },
    searchButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "800",
    },
    errorText: {
        color: "#fecaca",
        fontSize: 14,
        fontWeight: "700",
        marginTop: 12,
        textAlign: "center",
    },
    weatherCard: {
        marginTop: 22,
        borderRadius: 32,
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        padding: 22,
        shadowColor: "#0f172a",
        shadowOpacity: 0.22,
        shadowRadius: 20,
        elevation: 8,
    },
    cardTopRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cityName: {
        color: "#0f172a",
        fontSize: 24,
        fontWeight: "900",
    },
    condition: {
        color: "#64748b",
        fontSize: 16,
        marginTop: 4,
        textTransform: "capitalize",
    },
    weatherIcon: {
        width: 92,
        height: 92,
    },
    temperature: {
        color: "#f97316",
        fontSize: 72,
        fontWeight: "900",
        marginTop: 4,
    },
    metricsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    metric: {
        color: "#0f172a",
        backgroundColor: "#e0f2fe",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: "800",
        overflow: "hidden",
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    detailHint: {
        color: "#0284c7",
        fontSize: 14,
        fontWeight: "800",
        marginTop: 18,
    },
    emptyCard: {
        alignItems: "center",
        marginTop: 22,
        borderRadius: 28,
        backgroundColor: "rgba(15, 23, 42, 0.35)",
        padding: 24,
    },
    emptyIcon: {
        fontSize: 42,
    },
    emptyText: {
        color: "#ffffff",
        fontSize: 15,
        lineHeight: 22,
        marginTop: 10,
        textAlign: "center",
    },
});
