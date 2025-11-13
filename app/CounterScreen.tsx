import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useCounter } from "./useCounter";

export default function CounterScreen() {
  const { count, increment, decrement, reset } = useCounter(5);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter App</Text>

      <View style={styles.counterContainer}>
        <TouchableOpacity style={styles.buttonCircle} onPress={decrement}>
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.countText}>{count}</Text>

        <TouchableOpacity style={styles.buttonCircle} onPress={increment}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={reset}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 40,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 30,
  },
  buttonCircle: {
    backgroundColor: "#007AFF",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
  countText: {
    fontSize: 48,
    fontWeight: "800",
    color: "#222",
  },
  resetButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  resetText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
