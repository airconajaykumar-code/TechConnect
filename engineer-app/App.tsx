import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TaskProvider } from "./src/TaskContext";
import LoginScreen from "./src/screens/LoginScreen";
import TasksScreen from "./src/screens/TasksScreen";
import TaskDetailScreen from "./src/screens/TaskDetailScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Tasks" component={TasksScreen} />
          <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}
