import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function LoadingText({ numberMatched, totalFetched }) {
  const percentageFetched =
    numberMatched > 0 ? (totalFetched / numberMatched) * 100 : 0;

  return (
    <View style={styles.container}>
      {percentageFetched < 100 && (
        <View style={styles.loading}>
          <Text style={styles.Text}>
            {`กำลังโหลดข้อมูล (${percentageFetched.toFixed(2)}%)`}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: '100%',
  },
  loading: {
    width: '100%', 
    marginVertical: 10,
    backgroundColor: "white",
    padding: 2,
    alignItems: 'center',
  },
  Text: {
    fontSize: 16,
    color: '#333',
  },
});

export default LoadingText;
