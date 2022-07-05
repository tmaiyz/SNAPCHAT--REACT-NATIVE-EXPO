import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [image, setImage] = useState(null);

  let camera = Camera;
  const [test, setTest] = useState(false);
  const [screen, setScreen] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Permission needed</Text>;
  }

  const __takePicture = async () => {
    if (!camera) return
    let photo = await camera.takePictureAsync()
    setTest(true);
    setScreen(photo);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if(!result.cancelled){
     setImage(result.uri);
     setScreen(result);
    }

  }

  const handleSubmit = () => {
    navigation.navigate('Personne');
    //stock photo et apres naviagte personne
  };

  const message = () => {
    navigation.navigate('Reception');
  }

  if (screen != null) {
    return (
      <View style={styles.container}>
        <Image style={{width: "100%", height: '100%'}} source={{uri: screen.uri}}/>
        <View style={styles.head}>
          <TouchableOpacity>
            <Text style={styles.cross} onPress={() => {
              setScreen(null);
            }}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.blockbtn}>
          <TouchableOpacity style={styles.edit}>
            <Text style={styles.txt}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.edit} onPress={handleSubmit}>
            <Text style={styles.txt}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
    
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={(r) => { camera = r }}>
          <View style={styles.block}>
            <View style={styles.display}> 
            <TouchableOpacity onPress={pickImage} style={styles.buttons}><Text style={styles.galery}>Gallery</Text>
             </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {
                setType(type === CameraType.back ? CameraType.front : CameraType.back);
              }}>
                <Text style={styles.text}> Flip </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={message}><Text style={styles.message}>Message</Text></TouchableOpacity>
              <TouchableOpacity style={styles.photo} onPress={__takePicture}><Text></Text></TouchableOpacity>             
            </View>
          </View>
        </Camera>
      </View>
    );

}

const styles = StyleSheet.create({
  display:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: "row",
  },
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    height: '90%',
    marginTop: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'column',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: 20,
  },
  button: {
    alignSelf: 'flex-start',
  },
  button: {
    alignContent: 'flex-end'
  },
  text: {
    fontSize: 18,
    color: '#e693ac',
    paddingLeft: "35%",
  },
  photo: {
    height: 80,
    width: 80,
    borderRadius: 50,
    borderWidth: 6,
    borderColor: '#e693ac',
    alignSelf: 'flex-end',
  },
  blockbtn: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    bottom: 80,
    width: '100%',
  },
  edit: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  txt: {
    color: '#e693ac',
    fontSize: '17px',
    fontWeight: 'bold',
  },
  head: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cross: {
    fontSize: 40,
    color: '#e693ac',
  },

  galery: {
    fontSize: 18,
    color: '#e693ac',
    paddingRight: "35%",
  },

  message:{
    fontSize: 18,
    color: '#e693ac',
    paddingRight: "35%"
  }
});
