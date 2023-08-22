import {PermissionsAndroid} from 'react-native'
import { useEffect, useState,  } from 'react';
import Geolocation from 'react-native-geolocation-service';

const useLocation = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [locationError, setLocationError] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Badaboom Location Permission',
          message:
            'Badaboom needs access to your location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      } else {
        alert('Please allow location permission');
        navigation.replace('home')
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCoordinates(
          // latitude: position.coords.latitude,
          // longitude: position.coords.longitude,
          // store position.coords.latitude and position.coords.longitude in your state array
          [position.coords.longitude, position.coords.latitude]
        );
      },
      (error) => {
          setLocationError({
          code: error.code,
          message: error.message,
        });
      },
      { enableHighAccuracy: true, timeout: 2000 }
    );
  };

  useEffect(() => {

    requestLocationPermission()

    return () => {
      Geolocation.stopObserving();
    };
  }, []);

  return { coordinates, locationError, getLocation };
};

export default useLocation;
