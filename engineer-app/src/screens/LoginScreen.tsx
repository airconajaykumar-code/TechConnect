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
import { ENGINEERS } from "../data";
import { useTasks } from "../TaskContext";

export default function LoginScreen({ navigation }: any) {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [step, setStep] = useState<"phone" | "pin">("phone");
  const matchedEngineer = useRef<any>(null);
  const { setEngineer } = useTasks();
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

  function handlePhoneSubmit() {
    const cleaned = phone.replace(/\s+/g, "");
    const match = ENGINEERS.find(
      (e) => e.phone.replace(/\s+/g, "").includes(cleaned) || cleaned.includes(e.phone.replace(/\s+/g, ""))
    );
    if (!match) {
      Alert.alert("Access Denied", "This phone number is not registered with TechConnect.");
      return;
    }
    matchedEngineer.current = match;
    setStep("pin");
  }

  function handleLogin() {
    if (pin !== "1234") {
      Alert.alert("Wrong PIN", "Please enter the correct 4-digit PIN.");
      return;
    }
    const eng = matchedEngineer.current;
    if (eng) {
      setEngineer({
        name: eng.name,
        phone: eng.phone,
        profession: eng.profession,
        location: eng.location,
        totalTasks: 0,
        totalEarnings: 0,
        rating: 0,
      });
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
          {step === "phone" ? (
            <>
              <Text style={styles.label}>Registered Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="+91 88688 55921"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
              <TouchableOpacity style={styles.button} onPress={handlePhoneSubmit}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.label}>Enter 4-Digit PIN</Text>
              <TextInput
                style={styles.input}
                placeholder="1234"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                secureTextEntry
                maxLength={4}
                value={pin}
                onChangeText={setPin}
              />
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setStep("phone"); setPin(""); }}>
                <Text style={styles.backLink}>← Wrong number? Go back</Text>
              </TouchableOpacity>
            </>
          )}
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
    borderColor: "#D1E5DB",
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
  backLink: { color: "#2563EB", textAlign: "center", marginTop: 16, fontSize: 14 },
});
