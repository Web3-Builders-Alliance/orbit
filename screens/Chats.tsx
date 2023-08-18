import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

const Chats = ({}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headertext}>Chats</Text>

        <View style={bottomstyles.container}>
          <View style={bottomstyles.buttonContainer}>
            <View></View>
            <TouchableOpacity>
              <Image
                source={{
                  uri: 'https://picsum.photos/200',
                }}
                style={styles.logo}
              />
            </TouchableOpacity>
          </View>
          <View style={bottomstyles.buttonContainer}>
            <View style={styles.container}>
              <Text style={styles.text}>Ben</Text>
              <Text style={styles.subtext}>Hi! There Im using Orbit</Text>
              
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    marginTop: 10,
    fontSize: 20,
    marginLeft: -80,
    backgroundColor: 'black',
  },
  subtext: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
    marginLeft: -80,
    backgroundColor: 'black',
  },
  headertext: {
    color: 'white',
    marginTop: 20,
    fontSize: 20,
    marginLeft: 20,
    backgroundColor: 'black',
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 15,
    margin: 5,
  },
});

const bottomstyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  buttonContainer: {
    flex: 1,
    margin: 5,
    color: 'white',
  },
});
