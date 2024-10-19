import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';

function ZoomAction({ setZoomLevel, setCenter, location, hasPermission }) {
  const PressLocation = useCallback(() => {
    setZoomLevel(8);
    setCenter(location);
  }, [setZoomLevel, setCenter, location]);

  const ZoomIn = useCallback(() => {
    setZoomLevel(prev => prev + 1);
  }, [setZoomLevel]);

  const ZoomOut = useCallback(() => {
    setZoomLevel(prev=> (prev> 1 ? prev - 1 : prev)); 
  }, [setZoomLevel]);

  return (
    <View style={styles.container}>
      <Button
        size="lg"
        onPress={ZoomIn}
        buttonStyle={styles.button}
        icon={
          <Icon
            name="add" 
            type="material" 
            color="white" 
            size={24}
          />
        }
      />
      <Button
        size="lg"
        onPress={ZoomOut}
        buttonStyle={styles.button}
        icon={
          <Icon
            name="remove" 
            type="material" 
            color="white" 
            size={24} 
          />
        }
      />
      {hasPermission && (
        <Button
          radius={'lg'}
          type="solid"
          size={'lg'}
          onPress={PressLocation}
          buttonStyle={styles.locationButton}
          icon={
            <Icon name="my-location" type="Ionicons" color="#2089DC" size={30} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
  button: {
    marginBottom: 10,
  },
  locationButton: {
    backgroundColor: 'white',
  },
});

export default ZoomAction;
