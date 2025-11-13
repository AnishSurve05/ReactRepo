// UserListScreen.tsx
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFetchData } from "./useFetchData";

export default function UserListScreen() {
  const router = useRouter();
  const { data, loading, error } = useFetchData(
    "https://jsonplaceholder.typicode.com/users"
  );
  const [search, setSearch] = useState("");

  // Filter users by username
  const filteredUsers = useMemo(() => {
    if (!data) return [];
    return data.filter((user: any) =>
      user.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading users...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👥 User Directory</Text>

      {/* 🔍 Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by username..."
        placeholderTextColor="#9CA3AF"
        value={search}
        onChangeText={setSearch}
      />

      {/* 🧑‍💻 User List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No users found.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push(`/UserDetailScreen?username=${item.username}`)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.info}>@{item.username}</Text>
            <Text style={styles.info}>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  info: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#4B5563",
    fontSize: 16,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 16,
    marginTop: 20,
  },
});
