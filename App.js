// Import libraries
import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

// Import navigation
import PlacesNavigation from './navigation/PlacesNavigation';

// Import redux reducers
import placesReducer from './store/places-reducer';

// Import our database
import { init } from './helpers/db';

init().then(() => {
  console.log('Initialized database');
}).catch(err => {
  console.log('Initializing db failed.');
  console.log(err);
});

const rootReducer = combineReducers({
  places: placesReducer,
});

// TODO: Remove composeWithDevTools before production deployment
const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
  /*, composeWithDevTools()*/
);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts}
      onFinish={() => {
        setFontLoaded(true);
      }}
      onError={console.warn}
    />;
  }

  return (
    <Provider store={store}>
      <PlacesNavigation />
    </Provider>   
  );
}