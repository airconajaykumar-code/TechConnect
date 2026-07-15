import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useTasks } from "../TaskContext";
import type { Task } from "../data";

const STATUS_COLORS: Record<string, string> = {
  pending: "#F59E0B",
  assigned: "#3B82F6",
  in_progress: "#6366F1",
  completed: "#10B981",
  cancelled: "#EF4444",
};

function TaskCard({ task, onPress }: { task: Task; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={1}>{task.title}</Text>
        <View style={[styles.badge, { backgroundColor: STATUS_COLORS[task.status] + "20" }]}>
          <Text style={[styles.badgeText, { color: STATUS_COLORS[task.status] }]}>
            {task.status.replace("_", " ")}
          </Text>
        </View>
      </View>
      <Text style={styles.customer}>👤 {task.customerName}</Text>
      <Text style={styles.address} numberOfLines={1}>📍 {task.customerAddress}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.amount}>₹{task.amount}</Text>
        <Text style={styles.payout}>Your payout: ₹{task.yourPayout}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function TasksScreen({ navigation }: any) {
  const { tasks } = useTasks();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Tasks</Text>
          <Text style={styles.headerCount}>{tasks.length} task{tasks.length !== 1 ? "s" : ""}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.profileBtn}>Profile</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => navigation.navigate("TaskDetail", { taskId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>No tasks assigned yet</Text>
          </View>
        }
      />
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
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#1F2937" },
  headerCount: { fontSize: 13, color: "#9CA3AF", marginTop: 2 },
  profileBtn: { fontSize: 14, color: "#2563EB", fontWeight: "600" },
  list: { padding: 16 },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#1F2937", flex: 1, marginRight: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: "600", textTransform: "capitalize" },
  customer: { fontSize: 14, color: "#4B5563", marginTop: 8 },
  address: { fontSize: 13, color: "#9CA3AF", marginTop: 2 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#F3F4F6" },
  amount: { fontSize: 18, fontWeight: "800", color: "#2563EB" },
  payout: { fontSize: 13, color: "#6B7280", alignSelf: "flex-end" },
  empty: { alignItems: "center", marginTop: 60 },
  emptyIcon: { fontSize: 48 },
  emptyText: { fontSize: 16, color: "#9CA3AF", marginTop: 12 },
});
