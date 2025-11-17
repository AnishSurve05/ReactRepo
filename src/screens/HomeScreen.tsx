// src/screens/HomeScreen.tsx
import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/userSlice";
import { AppDispatch, RootState } from "../redux/store";

export default function HomeScreen() {
  const [id, setId] = useState("1");

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter UserID to Show User</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter user ID (1–10)"
        keyboardType="numeric"
        value={id}
        onChangeText={setId}
      />

      <Button title="Get User" onPress={() => dispatch(fetchUser(Number(id)))} />

      {loading && <Text style={styles.loading}>Loading...</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}

      {data && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Name: {data.name}</Text>
          <Text style={styles.resultText}>Email: {data.email}</Text>
          <Text style={styles.resultText}>Phone: {data.phone}</Text>
          <Text style={styles.resultText}>Company: {data.company.name}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  loading: { marginTop: 10, color: "blue" },
  error: { marginTop: 10, color: "red" },
  result: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 6,
  },
  resultText: { fontSize: 16, marginBottom: 5 },
});
