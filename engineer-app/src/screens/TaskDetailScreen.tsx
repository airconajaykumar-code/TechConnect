import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from "react-native";
import { useTasks } from "../TaskContext";
import type { Task } from "../data";

function getWhatsAppLink(phone: string, task: Task) {
  const msg = encodeURIComponent(
    `📋 *New Task Assigned!*\n\n` +
    `*Title:* ${task.title}\n` +
    `*Customer:* ${task.customerName}\n` +
    `*Phone:* ${task.customerPhone}\n` +
    `*Address:* ${task.customerAddress}\n\n` +
    `Please start the work. ✅`
  );
  return `https://wa.me/${phone.replace(/[\s+\-()]/g, "")}?text=${msg}`;
}

const STATUS_BTN: { label: string; key: Task["status"]; color: string }[] = [
  { label: "Start Work", key: "in_progress", color: "#6366F1" },
  { label: "Mark Completed", key: "completed", color: "#10B981" },
];

export default function TaskDetailScreen({ route, navigation }: any) {
  const { tasks, updateTaskStatus } = useTasks();
  const task = tasks.find((t: Task) => t.id === route.params.taskId) as Task;

  if (!task) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Task Details</Text>
          <View style={{ width: 60 }} />
        </View>
        <View style={styles.content}>
          <Text style={styles.errorText}>Task not found</Text>
        </View>
      </View>
    );
  }

  function handleCall() {
    Linking.openURL(`tel:${task.customerPhone}`);
  }

  function handleWhatsApp() {
    const url = getWhatsAppLink(task.customerPhone, task);
    Linking.openURL(url).catch(() => Alert.alert("Error", "WhatsApp not installed"));
  }

  function handleStatusUpdate(status: Task["status"]) {
    const label = status.replace("_", " ");
    Alert.alert(
      "Update Status",
      `Mark task as "${label}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            updateTaskStatus(task.id, status);
            Alert.alert("✅ Success", `Task marked as ${label}`);
            navigation.goBack();
          },
        },
      ]
    );
  }

  const commission = task.amount - task.engineerPayout;
  const adminShare = Math.round(commission * 0.5);
  const platformFee = commission - adminShare;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
          <View style={[styles.badge, {
            backgroundColor:
              task.status === "completed" ? "#D1FAE5" :
              task.status === "cancelled" ? "#FEE2E2" :
              task.status === "in_progress" ? "#E0E7FF" :
              "#FEF3C7"
          }]}>
            <Text style={[styles.badgeText, {
              color:
                task.status === "completed" ? "#10B981" :
                task.status === "cancelled" ? "#EF4444" :
                task.status === "in_progress" ? "#6366F1" :
                "#F59E0B"
            }]}>
              {task.status.replace("_", " ")}
            </Text>
          </View>
          {task.completedAt && (
            <Text style={styles.completedDate}>
              Completed on: {new Date(task.completedAt).toLocaleDateString("en-IN")}
            </Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Customer Details</Text>
          <Text style={styles.info}>👤 {task.customerName}</Text>
          <Text style={styles.info}>📞 {task.customerPhone}</Text>
          <Text style={styles.info}>📍 {task.customerAddress}</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#10B981" }]} onPress={handleCall}>
              <Text style={styles.actionText}>📞 Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#25D366" }]} onPress={handleWhatsApp}>
              <Text style={styles.actionText}>📱 WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>💰 Amount Sharing Details</Text>
          <View style={styles.amtRow}>
            <Text style={styles.amtLabel}>Total Paid by Customer</Text>
            <Text style={styles.amtValue}>₹{task.amount}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.amtRow}>
            <Text style={styles.amtLabel}>Your Payout (Engineer)</Text>
            <Text style={[styles.amtValue, { color: "#10B981", fontWeight: "800" }]}>₹{task.engineerPayout}</Text>
          </View>
          <View style={styles.amtRow}>
            <Text style={styles.amtLabel}>Admin Commission</Text>
            <Text style={[styles.amtValue, { color: "#2563EB" }]}>₹{commission}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.amtRow}>
            <Text style={styles.amtLabel}>Platform Fee</Text>
            <Text style={[styles.amtValue, { color: "#6B7280" }]}>₹{platformFee}</Text>
          </View>
          <View style={styles.amtRow}>
            <Text style={styles.amtLabel}>Referral Share</Text>
            <Text style={[styles.amtValue, { color: "#6B7280" }]}>₹{adminShare}</Text>
          </View>
        </View>

        {task.status !== "completed" && task.status !== "cancelled" && (
          <View style={styles.statusActions}>
            {STATUS_BTN.map((btn) => {
              if (task.status === "pending" && btn.key === "completed") return null;
              if (task.status === "assigned" && btn.key === "completed") return null;
              if (task.status === "in_progress" && btn.key === "in_progress") return null;
              return (
                <TouchableOpacity
                  key={btn.key}
                  style={[styles.statusBtn, { backgroundColor: btn.color }]}
                  onPress={() => handleStatusUpdate(btn.key)}
                >
                  <Text style={styles.statusBtnText}>{btn.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
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
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#1F2937" },
  content: { padding: 16 },
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
  title: { fontSize: 20, fontWeight: "800", color: "#1F2937" },
  description: { fontSize: 14, color: "#6B7280", marginTop: 8, lineHeight: 20 },
  badge: { alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginTop: 12 },
  badgeText: { fontSize: 12, fontWeight: "600", textTransform: "capitalize" },
  completedDate: { fontSize: 12, color: "#10B981", marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1F2937", marginBottom: 12 },
  info: { fontSize: 14, color: "#4B5563", marginBottom: 4 },
  actions: { flexDirection: "row", gap: 12, marginTop: 12 },
  actionBtn: { flex: 1, borderRadius: 10, padding: 12, alignItems: "center" },
  actionText: { color: "white", fontWeight: "600", fontSize: 14 },
  amtRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  amtLabel: { fontSize: 14, color: "#4B5563" },
  amtValue: { fontSize: 14, fontWeight: "600", color: "#1F2937" },
  divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 8 },
  statusActions: { flexDirection: "row", gap: 12, marginTop: 8 },
  statusBtn: { flex: 1, borderRadius: 12, padding: 16, alignItems: "center" },
  statusBtnText: { color: "white", fontWeight: "700", fontSize: 15 },
  errorText: { fontSize: 16, color: "#EF4444", textAlign: "center", marginTop: 40 },
});
