import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Edit app/index.tsx to edit this screen.</Text>
      <Text style={styles.Text}>hello, world!</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  Text: {
    color: "#ffffff"
  }
})
