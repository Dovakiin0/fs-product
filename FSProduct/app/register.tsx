import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Text } from "../components/Themed";
import { Button, TextInput } from "react-native-paper";
import useAuth from "../hooks/useAuth";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { current, authenticated, register, loading } = useAuth();

  useEffect(() => {
    if (current && authenticated) {
      router.replace("/(tabs)/product");
    }
  }, [current, authenticated]);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Password does not match");
      return;
    }
    register({ username, email, password, confirm_password: confirmPassword });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Create New Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          label="Username"
          mode="outlined"
          onChangeText={setUsername}
        // You can handle text input here
        />
        <TextInput
          keyboardType="email-address"
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          label="Email"
          mode="outlined"
          onChangeText={setEmail}
        // You can handle text input here
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter Your Password"
          value={password}
          label="Password"
          mode="outlined"
          onChangeText={setPassword}
        // You can handle text input here
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          label="Confirm Password"
          mode="outlined"
          onChangeText={setConfirmPassword}
        // You can handle text input here
        />
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleRegister}
          loading={loading}
        >
          Register
        </Button>
        <Text>
          Have an account?{" "}
          <Link href="/" replace>
            <Text style={styles.link}>Login</Text>
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

export default Register;
