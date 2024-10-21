import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-elements';

function TextShowdata() {
  return (
    <>
      <Card containerStyle={styles.container}>
        <Card.Title>จำนวนข้อมูล(ต่อจุด)</Card.Title>
        <Card.Divider />

        <View style={styles.rowContainer}>
          <View style={styles.row}>
            <View style={[styles.dot, {backgroundColor: '#e74c3c'}]} />
            <Text style={styles.fonts}> &gt; 1000</Text>
          </View>
          <Text style={styles.separator}>|</Text>

          <View style={styles.row}>
            <View style={[styles.dot, {backgroundColor: '#f1c40f'}]} />
            <Text style={styles.fonts}> &gt; 500</Text>
          </View>
          <Text style={styles.separator}>|</Text>

          <View style={styles.row}>
            <View style={[styles.dot, {backgroundColor: '#3498db'}]} />
            <Text style={styles.fonts}> &gt; 100</Text>
          </View>
          <Text style={styles.separator}>|</Text>

          <View style={styles.row}>
            <View style={[styles.dot, {backgroundColor: '#2ecc71'}]} />
            <Text style={styles.fonts}> &lt; 100 </Text>
          </View>
        </View>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    width: '90%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  fonts: {
    marginVertical: 5,
    fontSize: 16,
    color: '#333',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  separator: {
    fontSize: 20,
    marginHorizontal: 10,
    color: '#333',
  },
});

export default TextShowdata;
