import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

const MarketPlace = ({}) => {
  return (
    <View style={styles.container}>
      <Text style = {styles.text}>No Trade Initiated by You !!</Text>
      
    </View>
  );
};

export default MarketPlace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  text : {
    fontSize : 16
  }
});
