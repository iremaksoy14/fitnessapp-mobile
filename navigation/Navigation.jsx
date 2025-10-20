import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSelector } from "react-redux";
import { selectHasProfile } from "../store";

import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import SettingsScreen from "../screens/SettingsScreen";
import EditWorkoutsScreen from "../screens/EditWorkoutsScreen";
import ExerciseDetailScreen from "../screens/ExerciseDetailScreen";
import TimerScreen from "../screens/ExerciseTimerScreen";
import { Ionicons } from "@expo/vector-icons";
import WorkoutTimerScreen from "../screens/WorkoutTimerScreen";
import WorkoutStepsScreen from "../screens/WorkoutStepsScreen";
import WorkoutComplete from "../screens/WorkoutComplete";
import DailyStep from "../screens/DailyStep";
import Profile from "../screens/Profile";
import EditProfileScreen from "../screens/EditProfileScreen";
import OnboardingScreen from "../screens/OnboardingScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Calendar") {
            iconName = "calendar-outline";
          } else if (route.name === "Edit Plan") {
            iconName = "create-outline";
          } else if (route.name === "DailyStep") {
            iconName = "footsteps-outline";
          } else if (route.name === "Settings") {
            iconName = "settings-outline";
          } else if (route.name === "Profile") {
            iconName = "man-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Kategoriler",
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: "Takvim",
        }}
      />
      {/* <Tab.Screen
        name="Edit Plan"
        component={EditWorkoutsScreen}
        options={{
          title: "Egzersiz Planla",
        }}
      /> */}
      <Tab.Screen
        name="DailyStep"
        component={DailyStep}
        options={{
          title: "Günlük Adım",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Ayarlar",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profil",
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const hasProfile = useSelector(selectHasProfile);

  return (
    <NavigationContainer>
      <Stack.Navigator>
      { hasProfile ? <>
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
        <Stack.Screen
          name="Timer"
          component={TimerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="WorkoutTimer" component={WorkoutTimerScreen} />

        <Stack.Screen name="WorkoutSteps" component={WorkoutStepsScreen} />
        <Stack.Screen
          name="WorkoutComplete"
          component={WorkoutComplete}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Profili Düzenle" }} />
      </> : <Stack.Screen name="Onboarding" component={OnboardingScreen} />}
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
