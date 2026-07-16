import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTasks } from "../TaskContext";

export default function ProfileScreen({ navigation }: any) {
  const { tasks, engineer } = useTasks();
  const completedTasks = tasks.filter((t) => t.status === "completed");
  const totalEarnings = completedTasks.reduce((sum, t) => sum + t.engineerPayout, 0);
  const activeTasks = tasks.filter((t) => t.status === "in_progress" || t.status === "assigned");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Text style={styles.editBtn}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{engineer.name.charAt(0)}</Text>
          </View>
          <Text style={styles.name}>{engineer.name}</Text>
          <Text style={styles.profession}>{engineer.profession}</Text>
          <Text style={styles.phone}>{engineer.phone}</Text>
          {"location" in engineer && <Text style={styles.location}>📍 {(engineer as any).location}</Text>}
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{tasks.length}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{activeTasks.length}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{completedTasks.length}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        <View style={styles.earningsCard}>
          <Text style={styles.sectionTitle}>💰 Earnings Summary</Text>
          <View style={styles.earnRow}>
            <Text style={styles.earnLabel}>Total Earned</Text>
            <Text style={styles.earnValue}>₹{totalEarnings}</Text>
          </View>
          <View style={styles.earnRow}>
            <Text style={styles.earnLabel}>Pending Payout</Text>
            <Text style={[styles.earnValue, { color: "#F59E0B" }]}>
              ₹{tasks
                .filter((t) => t.status !== "completed" && t.status !== "cancelled")
                .reduce((sum, t) => sum + t.engineerPayout, 0)}
            </Text>
          </View>
          <View style={styles.earnRow}>
            <Text style={styles.earnLabel}>Rating</Text>
            <Text style={styles.earnValue}>★ {engineer.rating}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Text style={styles.row}>📱 {engineer.phone}</Text>
          <Text style={styles.row}>👷 {engineer.profession}</Text>
        </View>
      </View>
    </View>
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
  back: { fontSize: 16, color: "#2563EB", fontWeight: "600" },
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#1F2937" },
  editBtn: { fontSize: 16, color: "#2563EB", fontWeight: "700" },
  content: { padding: 16 },
  profileCard: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: { fontSize: 32, fontWeight: "800", color: "#2563EB" },
  name: { fontSize: 22, fontWeight: "800", color: "#1F2937" },
  profession: { fontSize: 14, color: "#2563EB", marginTop: 4 },
  phone: { fontSize: 14, color: "#6B7280", marginTop: 2 },
  location: { fontSize: 13, color: "#9CA3AF", marginTop: 4 },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: { fontSize: 18, fontWeight: "800", color: "#1F2937" },
  statLabel: { fontSize: 12, color: "#6B7280", marginTop: 4 },
  earningsCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1F2937", marginBottom: 12 },
  earnRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  earnLabel: { fontSize: 14, color: "#4B5563" },
  earnValue: { fontSize: 14, fontWeight: "700", color: "#1F2937" },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: { fontSize: 14, color: "#4B5563", marginBottom: 8 },
});
