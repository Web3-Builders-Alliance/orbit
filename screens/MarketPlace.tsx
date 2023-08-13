import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

const MarketPlace = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Find Screen (MarketPlace)</Text>
      <Button title="Click Here" />
    </View>
  );
};

export default MarketPlace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc',
  },
});
