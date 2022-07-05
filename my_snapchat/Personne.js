import { StyleSheet, Text, View, TouchableOpacity,ScrollView, selected} from "react-native";
import React, { useState, useEffect } from "react";
import Checkbox from 'expo-checkbox';
export default function Personne() {

    const [email, setEmail] = useState([]);
    const [isChecked, setChecked] = useState(false);

    useEffect(() => {
        getEmail();
    }, []);

    const getEmail = () => {
        fetch("http://snapi.epitech.eu:8000/all", {
            method: "GET",
            headers: {
            "token": "ohcu932SPYNuARbBprkcwzb4"
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((response) => {
            setEmail(response.data);
        })
        .catch(function (error) {
            console.log(
                "There has been a problem with your fetch operation: " +
                error.message
            );
        });
    }

    const handleSubmit = () => {
      
    }

    return (
        <ScrollView>
        <View>
            <View>
                <Text style={styles.input} >Amis</Text>
                {
                email.map(user => {
                return(    <View key={user.email}>
                        <TouchableOpacity style={styles.buttonUsers}>
                        <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#e693ac' : undefined}
                        />
                        
                        <Text style={styles.users}>             
                                {user.email}
                            </Text>
                        </TouchableOpacity>
                    </View> 
                )})
                }
                <TouchableOpacity onPress={handleSubmit} style={styles.button}><Text style={styles.text}>Envoyer</Text></TouchableOpacity>
                    
                <View></View>
            </View>
        
        </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    buttonUsers:{
        marginTop : 25,
        height : 50,
        width: "90%",
        borderRadius: 12,
        backgroundColor:'pink',
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '5%'
    },
    input: {
      marginTop: 55,
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

    users:{
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    }
  });
