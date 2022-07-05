import { StyleSheet, Text, View, TouchableOpacity, Item , SafeAreaView, ScrollView, CheckBox} from "react-native";
import React, { useState, useEffect } from "react";


export default function Reception({ navigation }) {
    
    const Camera = () =>{
        navigation.navigate('Camera');
    }

    return (
        <ScrollView>
        <View>
            <View>
                <Text style={styles.input}>Message</Text>
                    
                <TouchableOpacity onPress={Camera} style={styles.photo}><Text></Text></TouchableOpacity>
            </View>
        
        </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    input: {
      marginTop: 55,
      textAlign: "center",
      color: "pink",
      fontWeight: "bold",
      fontSize: 20,
    },

    photo: {
        height: 80,
        width: 80,
        borderRadius: 50,
        borderWidth: 6,
        borderColor: '#e693ac',
        alignSelf: 'flex-end',
      },
  });
