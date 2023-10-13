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
const MementoBottomSheet = () => {
  return (
    <>
     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <BottomSheet
            visible={openMomentoBottomSheet}
            onClose={CLoseMomentoBottomSheet}>
            <ScrollView nestedScrollEnabled={true}>
              <View style={newStyle.mainapp}>
                <>
                  <View style={styles.headerForMomentoBottom}>
                    <Text style={styles.text}>Momento</Text>
                  </View>
                  <View style={styles.header}>
                    <Text style={styles.textForBottomSheet}>Select Image</Text>
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
                <Text style={inputForm.label}>Your Momento Name</Text>
                <TextInput
                  style={inputForm.input}
                  value={momentoName}
                  onChangeText={momentoNameHadler}
                  placeholder="Your Momento Name"
                />
                <Text style={inputForm.label}>Your Momento Description</Text>
                <TextInput
                  style={inputForm.input}
                  value={momentoDesc}
                  onChangeText={momentoDescHandler}
                  placeholder="Momento Description"
                  keyboardType="email-address"
                />
                <View style={styles.containerToogle}>
                  <Text style={{color: 'white', fontSize: 16}}>
                    Share with Everyone
                  </Text>
                  <Switch
                    value={switchOn}
                    onValueChange={() => {
                      setSwitchOn(!switchOn);
                    }}
                  />
                </View>
                <View style={styles.containerToogle}>
                  <Text style={{color: 'white', fontSize: 16}}>
                    Share with Friends
                  </Text>
                  <Switch
                    value={switchOn1}
                    onValueChange={() => {
                      setSwitchOn1(!switchOn1);
                    }}
                  />
                </View>
                <View style={styles.containerToogle}>
                  <Text style={{color: 'white', fontSize: 16}}>
                    Keep it to yourself
                  </Text>
                  <Switch
                    value={switchOn2}
                    onValueChange={() => {
                      setSwitchOn2(!switchOn2);
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() =>
                    mintCNFT(
                      'momento',
                      true,
                      'https://zn6kci2g7vgxltorxyntlc6x2rzbqx6bw7jjlzxw3h2khtw7k6ka.arweave.net/y3yhI0b9TXXN0b4bNYvX1HIYX8G30pXm9tn0o87fV5Q',
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
                        <Text style={{color: 'black', fontSize: 18}}>
                          Mint CFT as Momento
                        </Text>
                      </View>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
            <TouchableOpacity onPress={CLoseMomentoBottomSheet}>
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
        </View></>
  )
}

export default MementoBottomSheet