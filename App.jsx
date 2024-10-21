import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import axios from 'axios';
import ZoomAction from './src/components/ZoomAction';
import TextShowdata from './src/components/TextShowdata';
import LoadingText from './src/components/LoadingText';
import MapViewWrapper from './src/components/MapviewWrapper';

MapLibreGL.setAccessToken(null);
MapLibreGL.setConnected(true);

export default function App() {
  const initialLocation = [100.523186, 13.736717];
  const [hasPermission, setHasPermission] = useState(false);
  const [location, setLocation] = useState([0, 0]);
  const [mapData, setMapData] = useState({
    type: 'FeatureCollection',
    features: [],
  });
  const [zoomLevel, setZoomLevel] = useState(5);
  const [center, setCenter] = useState(initialLocation);
  const [limit] = useState(1000);
  const [offset, setOffset] = useState(0);
  const [totalFetched, setTotalFetched] = useState(0);
  const [numberMatched, setNumberMatched] = useState(0);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'We need access to your location to show it on the map.',
            buttonPositive: 'OK',
          },
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        setHasPermission(true);
      }
    };
    requestPermissions();
  }, []);

  const UserLocation = useCallback(locationUpdate => {
    const { coords } = locationUpdate;
    setLocation([coords.longitude, coords.latitude]);
  }, []);

  const fetchNumberMatched = async () => {
    try {
      const apikey =
        'bLNytlxTHZINWGt1GIRQBUaIlqz9X45XykLD83UkzIoN6PFgqbH7M7EDbsdgKVwC';
      const response = await axios.get(
        'https://v2k-dev.vallarismaps.com/core/api/features/1.1/collections/658cd4f88a4811f10a47cea7/items',
        {
          params: {
            api_key: apikey,
            limit: 1,
          },
        },
      );
      setNumberMatched(response.data.numberMatched);
    } catch (error) {
      console.error(error);
      Alert.alert('Error fetch numberMatched');
    }
  };

  const getData = async () => {
    try {
      const apikey =
        'bLNytlxTHZINWGt1GIRQBUaIlqz9X45XykLD83UkzIoN6PFgqbH7M7EDbsdgKVwC';
      if (totalFetched >= numberMatched) {
        return;
      }

      const remaining = numberMatched - totalFetched;
      const currentLimit = remaining < limit ? remaining : limit;

      const result = await axios.get(
        'https://v2k-dev.vallarismaps.com/core/api/features/1.1/collections/658cd4f88a4811f10a47cea7/items',
        {
          params: {
            api_key: apikey,
            limit: currentLimit,
            offset,
          },
        },
      );

      const newFeatures = result.data.features.map(feature => ({
        type: 'Feature',
        properties: {
          id: feature.id,
          ct_en: feature.properties.ct_en,
        },
        geometry: {
          type: 'Point',
          coordinates: feature.geometry.coordinates,
        },
      }));

      setMapData(prevData => ({
        ...prevData,
        features: [...prevData.features, ...newFeatures],
      }));

      const newTotalFetched = totalFetched + result.data.features.length;
      setTotalFetched(newTotalFetched);

      if (newTotalFetched < numberMatched) {
        setOffset(prevOffset => prevOffset + limit);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error fetch data.');
    }
  };

  const onRegionDidChange = e => {
    const { zoomLevel: newZoomLevel, centerCoordinate: newCenter } = e.properties;
    setZoomLevel(newZoomLevel);
    setCenter(newCenter);
  };

  useEffect(() => {
    console.log("fetchNumberMatched");
    fetchNumberMatched();
  }, []);

  useEffect(() => {
    console.log('getdata');
    if (numberMatched > 0 && totalFetched < numberMatched) {
      getData();
    }
  }, [offset, numberMatched]);

  const MapData = useMemo(() => mapData, [mapData]);

  return (
    <View style={styles.page}>
      <MapViewWrapper
        mapData={MapData}
        center={center}
        zoomLevel={zoomLevel}
        onRegionDidChange={onRegionDidChange}
        UserLocation={UserLocation}
      />
      <TextShowdata numberMatched={numberMatched} totalFetched={totalFetched} />
      <ZoomAction
        setZoomLevel={setZoomLevel}
        setCenter={setCenter}
        location={location}
        hasPermission={hasPermission}
      />
      <LoadingText numberMatched={numberMatched} totalFetched={totalFetched} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
