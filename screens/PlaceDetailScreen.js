import React, { useLayoutEffect, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

// Import redux actions
import * as placesActions from '../store/places-action';

import MapPreview from '../components/MapPreview';

import Colors from '../constants/Colors';

const PlaceDetailScreen = props => {
  const { placeId } = props.route.params;
  const selectedPlace = useSelector(state => state.places.places.find(place => place.id === placeId));

  // useLayoutEffect to do repaint layout related changes. Keep it separate from useEffect
  // for state changes.
  useLayoutEffect(() => {
    // Mount PlaceDetailScreen

    // Dynamically set the title header
    props.navigation.setOptions({
      headerTitle: selectedPlace.title,
    });

    return () => {
      // unmount
    }
  }, [props.navigation]); // Excute when navigation invoke

  const selectedLocation = {
    lat: selectedPlace.lat,
    lng: selectedPlace.lng
  }

  const showMapHandler = () => {
    props.navigation.navigate(
      'Map',
      {
        readonly: true,
        initialLocation: selectedLocation
      }
    );
  }

  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <Image source={{uri: selectedPlace.imageUri}} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{ selectedPlace.address }</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={selectedLocation}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc'
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary,
    textAlign: 'center'
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});

export default PlaceDetailScreen;
