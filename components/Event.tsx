import React from 'react'
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Button,
    ScrollView,
    FlatList,
    PermissionsAndroid,
    TextInput,
    Alert,
    Linking,
    ActivityIndicator,
    Slider,
  } from 'react-native';
const Event = () => {
  return (
    <>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <BottomSheet
            visible={openHostBottomSheet}
            onClose={CloseHostBOttomSheet}>
            <ScrollView nestedScrollEnabled={true}>
              <View style={newStyle.mainapp}>
                <>
                  <View style={styles.headerForMomentoBottom}>
                    <Text style={styles.text}>Host Events</Text>
                  </View>
                  <View style={styles.header}>
                    <Text style={styles.textForBottomSheet}>
                      Select Event Image
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => choosePhotoFromLibrary()}>
                    <View style={styles.header}>
                      {image ? (
                        <>
                          <Image
                            source={{
                              uri: image,
                            }}
                            style={newStyle.logoPointerForMomento}
                          />
                        </>
                      ) : (
                        <>
                          <Image
                            source={require('../img/image.png')}
                            style={newStyle.logoPointerForMomento}
                          />
                        </>
                      )}
                    </View>
                  </TouchableOpacity>
                </>
              </View>
              <View style={newStyle.mainapp}>
                <View style={styles.header}>
                  <Text style={styles.textForBottomSheet}>Location</Text>
                </View>
              </View>
              <View style={styles.mapcontainerForMomento}>
                <MapView
                  zoomEnabled={true}
                  showsUserLocation={true}
                  followsUserLocation={true}
                  style={styles.mapStyle}
                  initialRegion={{
                    latitude: 28.56116880061382,
                    longitude: 77.29191947094775,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421,
                  }}
                  customMapStyle={mapStyle}>
                  <Marker
                    draggable
                    coordinate={{
                      latitude: 28.56116880061382,
                      longitude: 77.29191947094775,
                    }}
                    onDragEnd={
                      e =>
                        setLatLngforMomento(
                          JSON.stringify(e.nativeEvent.coordinate.latitude),
                          JSON.stringify(e.nativeEvent.coordinate.longitude),
                        )
                      // alert(JSON.stringify(e.nativeEvent.coordinate))
                    }
                    title={'Test Marker'}
                    description={
                      'This is a description of the marker'
                    }></Marker>
                </MapView>
              </View>
              <View style={inputForm.container}>
                <Text style={inputForm.label}>Name</Text>
                <TextInput
                  style={inputForm.input}
                  value={eventName}
                  onChangeText={eventNameHandler}
                  placeholder="Event Name"
                />
                <Text style={inputForm.label}>Description</Text>
                <TextInput
                  style={inputForm.input}
                  value={eventDesc}
                  onChangeText={eventDescHandler}
                  placeholder="Event Description"
                />
                <Text style={inputForm.label}>Time</Text>
                <TextInput
                  style={inputForm.input}
                  value={time_for_event}
                  onChangeText={timeHandlerForTime}
                  placeholder="Time"
                />
                <TouchableOpacity
                  onPress={() =>
                    mintCNFT(
                      'event',
                      false,
                      'https://zwgnkp42wmmlnt23rcb5tfu67nkle5cffcgcufwot7yun2owmuta.arweave.net/zYzVP5qzGLbPW4iD2Zae-1SydEUojCoWzp_xRunWZSY',
                    )
                  }>
                  {loading ? (
                    <>
                      <View
                        style={{
                          marginBottom: 10,
                        }}>
                        <ActivityIndicator size="small" color="white" />
                      </View>
                    </>
                  ) : (
                    <>
                      <View
                        style={{
                          backgroundColor: 'white',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 15,
                          height: 45,
                        }}>
                        <Text style={{color: 'black', fontSize: 18}}>Done</Text>
                      </View>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
            <TouchableOpacity onPress={CloseHostBOttomSheet}>
              <View
                style={{
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  height: 45,
                }}>
                <Text style={{color: 'black', fontSize: 18}}>Close</Text>
              </View>
            </TouchableOpacity>
          </BottomSheet>
        </View>
    </>
  )
}

export default Event