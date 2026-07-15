import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";

export default function LoginScreen({ navigation }: any) {
  const [phone, setPhone] = useState("");
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    bounce.start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => bounce.stop();
  }, []);

  function handleLogin() {
    if (phone.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }
    navigation.replace("Tasks");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
          <View style={styles.logoContainer}>
            <View style={styles.logoGlow} />
            <View style={styles.logoInner}>
              <Text style={styles.logo}>🔧</Text>
            </View>
          </View>
        </Animated.View>
        <Text style={styles.title}>TechConnect</Text>
        <Text style={styles.subtitle}>Engineer App</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+91 98765 43210"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF7ED" },
  content: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  logoContainer: {
    position: "relative",
    width: 88,
    height: 88,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoGlow: {
    position: "absolute",
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(251, 146, 60, 0.2)",
    shadowColor: "#FB923C",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  logoInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FB923C",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FB923C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logo: { fontSize: 36 },
  title: { fontSize: 32, fontWeight: "800", color: "#1F2937" },
  subtitle: { fontSize: 16, color: "#6B7280", marginTop: 4 },
  form: { width: "100%", marginTop: 48 },
  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 8 },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
});
