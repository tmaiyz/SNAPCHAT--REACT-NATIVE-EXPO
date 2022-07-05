import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function Inscription({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    fetch("http://snapi.epitech.eu:8000/inscription", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        console.log(response.status);

        if(response.status == 200){
            navigation.navigate('Connexion');
        }

        if (response.status == 422) {
          Alert.alert(
            "ERROR",
            "email has already been taken or remplissez tout les champs"
          );
        }

        return response.json();
      })
      .then((response) => {
        console.log(response);
        // navigation.navigate("Connexion");
      })

      .catch(function (error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  };

  return (
    <View>
      <Text style={styles.input}> Inscription</Text>

      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.text}>Inscris toi </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 100,
    textAlign: "center",
    color: "pink",
    fontWeight: "bold",
    fontSize: 20,
  },

  button: {
    marginTop: 300,
    backgroundColor: "pink",
    padding: 19,
    textAlign: "center",
  },

  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});
