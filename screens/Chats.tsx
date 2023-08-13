import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

const Chats = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Find Screen (Chats Screen)</Text>
      <Button title="Click Here" />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc',
  },
});
