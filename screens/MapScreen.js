import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';


const MapScreen = props => {
  // get route.params if true, otherwise set to null object
  const { initialLocation, readonly } = props.route.params ?? {};
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  // useLayoutEffect to do repaint layout related changes. Keep it separate from useEffect
  // for state changes.
  useLayoutEffect(() => {
    // Mount MapScreen

    if (readonly) {
      return;
    }

    // Dynamically set the title header
    props.navigation.setOptions({
      headerRight: () => (<TouchableOpacity onPress={savePickedLocationHandler} style={styles.headerButton}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>),
    });

    return () => {
      // unmount
    }
  }, [props.navigation, selectedLocation]); // Excute when navigation invoke

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectedLocationHandler = event => {
    if (readonly) {
      return;
    }

    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    })
  }

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    }
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }

    props.navigation.navigate('NewPlace', {mapPickedLocation: selectedLocation});
  }, [selectedLocation]);


  // useEffect(() => {
  //   props.navigation.setParams({ pickedLocation: selectedLocationHandler });
  // }, [savePickedLocationHandler]);

  return (
    <MapView style={styles.map} region={mapRegion} onPress={selectedLocationHandler}>
      {markerCoordinates ? <Marker title='Pick Location'  coordinate={markerCoordinates}></Marker> : null}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default MapScreen;
