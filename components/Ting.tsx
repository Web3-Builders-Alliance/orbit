import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  ScrollView
} from 'react-native';
import {Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import BottomSheet from './BottomSheet';
import { TouchableOpacity } from 'react-native';


export default function Ting() {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  return (
    <>
      <SafeAreaView>
       
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Button title="Open Bottom Sheet" onPress={openBottomSheet} /> */}
      <BottomSheet visible={bottomSheetVisible} onClose={closeBottomSheet}>
      <ScrollView>
      <View style={newStyle.mainapp}>
        <Image
          source={{
            uri: "https://picsum.photos/200"
          }}
          style={newStyle.logo}
        />
      </View>

      <View >
        <Text style={newStyle.text}>User</Text>
        <Text style={newStyle.subtext}>Wallet Address : </Text>
        <Text style={newStyle.subtext}>
          BZBT4C6UsEeow9ebLRymhtTtZj9sYDw3WkwZHHbFg2YY
        </Text>
        <Text style={newStyle.subtext}>Friends : 10</Text>
        <Text style={newStyle.subtext}>Joined : 2 May 23</Text>
      </View>
      </ScrollView>
        <Button title="Close" onPress={closeBottomSheet} />
      </BottomSheet>
    </View>
  
        
        <View style={styles.app}>
          <View
            style={[
              styles.container,
              {
                flexDirection: 'row',
              },
            ]}>
            <View style={{flex: 6}}>
              <Text style={styles.text}>Gm User , its Orbit</Text>
            </View>
            <View style={{flex: 1.5}}>
              <Image
                source={{
                  uri: 'https://picsum.photos/201',
                }}
                style={styles.logoim}
              />
            </View>
          </View>
          <View style={styles.header}>
            <Text style={styles.text}>Friends</Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <View
              style={[
                styles.container,
                {
                  flexDirection: 'column',
                },
              ]}>
                <TouchableOpacity onPress={openBottomSheet}>
              <View style={{flex: 1.5}}>
                <Image
                  source={{
                    uri: 'https://picsum.photos/200',
                  }}  
                  style={styles.logoim}
                />
              </View>
              <View style={{flex: 6}}>
                <Text style={{marginLeft: 20, marginTop: 10}}>User1</Text>
              </View>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.container,
                {
                  flexDirection: 'column',
                },
              ]}>
              <View style={{flex: 1.5}}>
                <Image
                  source={{
                    uri: 'https://picsum.photos/202',
                  }}
                  style={styles.logoim}
                />
              </View>
              <View style={{flex: 6}}>
                <Text style={{marginLeft: 20, marginTop: 10}}>User1</Text>
              </View>
            </View>
            <View
              style={[
                styles.container,
                {
                  flexDirection: 'column',
                },
              ]}>
              <View style={{flex: 1.5}}>
                <Image
                  source={{
                    uri: 'https://picsum.photos/203',
                  }}
                  style={styles.logoim}
                />
              </View>
              <View style={{flex: 6}}>
                <Text style={{marginLeft: 20, marginTop: 10}}>User1</Text>
              </View>
            </View>
            <View
              style={[
                styles.container,
                {
                  flexDirection: 'column',
                },
              ]}>
              <View style={{flex: 1.5}}>
                <Image
                  source={{
                    uri: 'https://picsum.photos/204',
                  }}
                  style={styles.logoim}
                />
              </View>
              <View style={{flex: 6}}>
                <Text style={{marginLeft: 20, marginTop: 10}}>User1</Text>
              </View>
            </View>
            <View
              style={[
                styles.container,
                {
                  flexDirection: 'column',
                },
              ]}>
              <View style={{flex: 1.5}}>
                <Image
                  source={{
                    uri: 'https://picsum.photos/204',
                  }}
                  style={styles.logoim}
                />
              </View>
              <View style={{flex: 6}}>
                <Text style={{marginLeft: 20, marginTop: 10}}>User1</Text>
              </View>
            </View>
          </View>
          <View style={styles.header}>
            <Text style={styles.text}>Discover</Text>
          </View>

          <View style={styles.mapcontainer}>
            <MapView
              style={styles.mapStyle}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              customMapStyle={mapStyle}>
              <Marker
                draggable
                coordinate={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                }}
                onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
                title={'Test Marker'}
                description={'This is a description of the marker'}
              />
               <Marker
                draggable
                coordinate={{
                  latitude: 37.78824,
                  longitude: -122.4322,
                }}
                onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
                title={'Test Marker'}
                description={'This is a description of the marker'}
              />
            </MapView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];

const styles = StyleSheet.create({
  app: {},
  logo: {
    height: 80,
  },
  header: {
    paddingTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'left',
    color: 'white',
  },
  text: {
    fontWeight: 'bold',
    lineHeight: 30,
    fontSize: 26,
    textAlign: 'left',
    color: 'white',
  },
  link: {
    color: '#1B95E0',
  },
  code: {
    fontFamily: 'monospace, monospace',
  },
  container: {
    paddingTop: 10,
  },
  tinyLogo: {
    width: 70,
    height: 70,
    marginLeft: 50,
    borderRadius: 50,
    marginTop: 50,
  },
  logoim: {
    width: 65,
    height: 65,
    marginLeft: 10,
    borderRadius: 50,
  },
  containerimp: {
    flex: 1,
    padding: 2,
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 200,
  },
  mapcontainer: {
    height: 300,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 200,
  },
});


const newStyle = StyleSheet.create({
  mainapp: {
    marginTop: 20,
    marginLeft: 20
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  detailBox: {
    height: 250,
    width: "maxWidth",
    backgroundColor: "black",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30
  },
  text: {
    color: "black",
    marginLeft: 25,
    marginTop: 20,
    fontSize: 40
  },
  subtext: {
    color: "black",
    marginLeft: 30,
    marginTop: 10,
    fontSize: 20
  }
});
