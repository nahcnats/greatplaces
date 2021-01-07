// Import libraries
import React, { useLayoutEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
  StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';

// Import components
import ImgPicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

// Import redux actions
import * as placesActions from '../store/places-action';

// Import constants
import Colors from '../constants/Colors';

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  // useLayoutEffect to do repaint layout related changes. Keep it separate from useEffect
  // for state changes.
  useLayoutEffect(() => {
    // Mount NewPlaceScreen

    // Dynamically set the title header
    props.navigation.setOptions({
      headerTitle: 'New Place',
    });

    return () => {
      // unmount
    }
  }, [props.navigation]); // Excute when navigation invoke

  const titleChangeHandler = text => {
    setTitleValue(text);
  }

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
  }

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation));
    props.navigation.goBack();
  }

  const locationPickedHandler = useCallback(location => {
    setSelectedLocation(location);
  }, []);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue }
        />
        <ImgPicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          route={props.route}
          onLocationPicked={locationPickedHandler} />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    fontFamily: 'open-sans',
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;
