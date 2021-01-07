// Import libraries
import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

// Import constants
import Colors from '../constants/Colors';

const ImgPicker = props => {
  const [pickedImage, setPickedImage] = useState();

  const verfifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.MEDIA_LIBRARY
    );

    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'OK' }]
      );
      return false;
    }
        
    return true;
  }

  const takeImageHandler = async () => {
    const hasPermission = await verfifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5
    });

    if (!image.cancelled) {
      setPickedImage(image.uri);
      props.onImageTaken(image.uri);
    }
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {
          !pickedImage ?
          <Text>No image picked yet.</Text> :
        <Image style={styles.image} source={{uri: pickedImage}} />
        }
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImgPicker;
