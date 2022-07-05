import React, { useState } from "react";
import {Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from "react-native";

export default function Connexion({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {

    fetch("http://snapi.epitech.eu:8000/connection", {

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
          navigation.navigate("Camera")
      }


        if(response.status == 401){
            Alert.alert('INCONNU','ya pas wsh');
        }

        return response.json();

    })
    .then((response) => console.log(response))

    .catch(function (error) {
        console.log( "There has been a problem with your fetch operation: " + error.message);
    });

};

return (
    <View>
      <Text style={styles.input}> Connexion</Text>

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

        <TouchableOpacity style={styles.button}
        onPress={handleSubmit}>
          <Text style={styles.text}>Connecte Toi</Text>
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
