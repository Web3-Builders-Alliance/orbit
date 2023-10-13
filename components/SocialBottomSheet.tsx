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
const SocialBottomSheet = () => {
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <BottomSheet
            visible={openSocialBottomSheet}
            onClose={CloseSocailBottomSheet}>
            <ScrollView nestedScrollEnabled={true}>
              <View style={newStyle.mainapp}>
                <>
                  <View style={styles.headerForMomentoBottom}>
                    <Text style={styles.text}>Social</Text>
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
                <Text style={inputForm.label}>Name</Text>
                <TextInput
                  style={inputForm.input}
                  value={socialName}
                  onChangeText={socialNameHandler}
                  placeholder="Name"
                />
                <Text style={inputForm.label}>Description</Text>
                <TextInput
                  style={inputForm.input}
                  value={socialDesc}
                  onChangeText={socialDescHandler}
                  placeholder="Description"
                  keyboardType="email-address"
                />
                <TouchableOpacity
                  onPress={() =>
                    mintCNFT(
                      'social',
                      true,
                      'https://kdpbrvc34pzksbyezxs4cuq45juqzza2vttfpr33ah4xid5g6ozq.arweave.net/UN4Y1Fvj8qkHBM3lwVIc6mkM5Bqs5lfHewH5dA-m87M',
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
                          Mint CFT to Warn People
                        </Text>
                      </View>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
            <TouchableOpacity onPress={CloseSocailBottomSheet}>
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

export default SocialBottomSheet