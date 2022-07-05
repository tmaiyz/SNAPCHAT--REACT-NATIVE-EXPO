import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Image, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import Inscription from './Inscription';
import Connexion from './Connexion';
import Camera from './Camera';
import { LogBox } from 'react-native';
import Personne from './Personne';
import Reception from './Reception';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

function Accueil({ navigation }) {
  return (    
    <View style={styles.container}>
      <Image
        source={require('./img/logo.jpeg')} 
        style={{ width: 380, height: 850 }}
      />
      <View style={styles.column}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Connexion")}>
          <Text style={styles.text}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Inscription")}>
          <Text style={styles.text}>Inscription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 120,
  },
  button: {
    zIndex: 1,
    alignItems: 'center',
    backgroundColor: "#fff",
    width: 160,
    padding: 15,
    margin: 10,
    borderRadius: 25,
    borderColor: '#d6858b',
    borderWidth: 2,
  },
  text: {
    color: '#e693ac',
    fontSize: 17,
  }
});


const Stack = createNativeStackNavigator();

function App(){

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Accueil" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Accueil" component={Accueil}/>
        <Stack.Screen name="Inscription" component={Inscription}/>
        <Stack.Screen name="Connexion" component={Connexion} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Personne" component={Personne} />
        <Stack.Screen name="Reception" component={Reception} />
        
      </Stack.Navigator>
    </NavigationContainer>
  )

}
export default App
