// UserDetailScreen.tsx
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useFetchData } from "./useFetchData";

export default function UserDetailScreen() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const { data, loading, error } = useFetchData(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
      </View>
    );

  const user = data.find((u: any) => u.username === username);

  if (!user)
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.username}>@{user.username}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>📧 Email:</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>📱 Phone:</Text>
        <Text style={styles.value}>{user.phone}</Text>

        <Text style={styles.label}>🌐 Website:</Text>
        <Text style={styles.value}>{user.website}</Text>

        <Text style={styles.label}>🏠 Address:</Text>
        <Text style={styles.value}>
          {user.address.suite},
          {user.address.street}, 
          {user.address.city},
          {user.address.zipcode}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  username: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontWeight: "600",
    color: "#374151",
    marginTop: 8,
  },
  value: {
    color: "#4B5563",
    fontSize: 15,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#4B5563",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 16,
  },
});
