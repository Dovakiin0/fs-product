import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Text } from "../components/Themed";
import { Button, TextInput } from "react-native-paper";
import { useAppDispatch } from "../hooks/useReducer";
import useAuth from "../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { current, authenticated, login } = useAuth();

  useEffect(() => {
    if (current && authenticated) {
      router.replace("/(tabs)/product");
    }
  }, [current, authenticated]);

  // You can define your login logic here
  function handleLogin() {
    login({ email, password });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Login to your Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          label="Email"
          mode="outlined"
          onChangeText={setEmail}
        // You can handle text input here
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          secureTextEntry={true}
          value={password}
          label="Password"
          mode="outlined"
          onChangeText={setPassword}
        // You can handle text input here
        />
        <Button mode="contained" style={styles.button} onPress={handleLogin}>
          Login
        </Button>
        <Text>
          Don't Have an account?{" "}
          <Link href="/register" replace>
            <Text style={styles.link}>Register</Text>
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: "100%",
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  link: {
    marginTop: 10,
    color: "lightblue",
    fontWeight: "bold",
  },
});

export default Login;
