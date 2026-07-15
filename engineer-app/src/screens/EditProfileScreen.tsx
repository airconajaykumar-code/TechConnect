import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTasks } from "../TaskContext";

export default function EditProfileScreen({ navigation }: any) {
  const { engineer, updateEngineer } = useTasks();
  const [name, setName] = useState(engineer.name);
  const [phone, setPhone] = useState(engineer.phone);
  const [profession, setProfession] = useState(engineer.profession);

  function handleSave() {
    if (!name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }
    if (phone.replace(/[\s+\-()]/g, "").length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }
    if (!profession.trim()) {
      Alert.alert("Error", "Profession is required");
      return;
    }

    updateEngineer({ name: name.trim(), phone: phone.trim(), profession: profession.trim() });
    Alert.alert("✅ Saved", "Profile updated successfully");
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.save}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#9CA3AF"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="+91 98765 43210"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Profession</Text>
          <TextInput
            style={styles.input}
            value={profession}
            onChangeText={setProfession}
            placeholder="e.g. CCTV Technician"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF7ED" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingTop: 60,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  cancel: { fontSize: 16, color: "#6B7280", fontWeight: "500" },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#1F2937" },
  save: { fontSize: 16, color: "#2563EB", fontWeight: "700" },
  content: { padding: 16 },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 4,
  },
});
