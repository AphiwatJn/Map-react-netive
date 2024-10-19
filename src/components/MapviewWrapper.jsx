import React from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';
import {
    StyleSheet,
} from 'react-native';

const MapViewWrapper = React.memo(({ mapData, center, zoomLevel, onRegionDidChange, UserLocation }) => {
  return (
    <MapLibreGL.MapView
      style={styles.map}
      logoEnabled={false}
      scrollEnabled={true}
      rotateEnabled={false}
      onRegionDidChange={onRegionDidChange}
      styleURL="https://api.maptiler.com/maps/d2f4e871-4bf5-47fe-b56b-e94fa489a844/style.json?key=hLy7oyNS4rlUSXJNxYNr"
    >
      <MapLibreGL.Camera
        centerCoordinate={center}
        zoomLevel={zoomLevel}
        minZoomLevel={2}
        maxZoomLevel={20}
      />
    
      <MapLibreGL.UserLocation visible={true} onUpdate={UserLocation} />

      {mapData && mapData.features.length > 0 && (
        <MapLibreGL.ShapeSource
          id="pointSource"
          shape={mapData}
          cluster={true}
          clusterRadius={100}
          clusterMaxZoom={14}
        >
          <MapLibreGL.SymbolLayer
            id="pointCount"
            style={layerStyles.clusterCount}
          />
          <MapLibreGL.CircleLayer
            id="clusteredPoints"
            belowLayerID="pointCount"
            filter={['has', 'point_count']}
            style={layerStyles.clusteredPoints}
          />
          <MapLibreGL.CircleLayer
            id="singlePoint"
            filter={['!', ['has', 'point_count']]}
            style={layerStyles.singlePoint}
          />
        </MapLibreGL.ShapeSource>
      )}
    </MapLibreGL.MapView>
  );
});

const styles = StyleSheet.create({
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

const layerStyles = {
  singlePoint: {
    circleColor: 'green',
    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
    circleRadius: 7,
  },
  clusteredPoints: {
    circleColor: [
      'step',
      ['get', 'point_count'],
      '#2ecc71',
      100,
      '#3498db',
      500,
      '#f1c40f',
      1000,
      '#e74c3c',
    ],
    circleRadius: ['step', ['get', 'point_count'], 25, 100, 35, 500, 45],
    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
  },
  clusterCount: {
    textField: ['format', ['concat', ['get', 'point_count'], '\n'], {}],
    textSize: 15,
    textPitchAlignment: 'map',
    textColor: '#000000',
  },
};

export default MapViewWrapper;
