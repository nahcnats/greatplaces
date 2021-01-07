// Import libraries
import React, { useLayoutEffect, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

// Import components
import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import PlaceItem from '../components/PlaceItem';

// Import redux actions
import * as placesActions from '../store/places-action';

const PlacesListScreen = props => {
  const places = useSelector(state => state.places.places);

  const dispatch = useDispatch();

  // useLayoutEffect to do repaint layout related changes. Keep it separate from useEffect
  // for state changes.
  useLayoutEffect(() => {
    // Mount PlacesListScreen

    // Dynamically set the title header
    props.navigation.setOptions({
      headerTitle: 'All Places',
       headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Add Place'
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
             onPress={() => {
               props.navigation.navigate('NewPlace');
             }}
          />
        </HeaderButtons>
      ),
    });

    return () => {
      // unmount
    }
  }, [props.navigation]); // Excute when navigation invoke

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData =>
        <PlaceItem
          image={ itemData.item.imageUri }
          title={ itemData.item.title }
          address={ itemData.item.address }
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id
            });
          }}
        />
      }
    />
  );
}

const styles = StyleSheet.create({

});

export default PlacesListScreen;
