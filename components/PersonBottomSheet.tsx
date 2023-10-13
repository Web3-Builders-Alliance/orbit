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
const PersonBottomSheet = () => {
  return (
   <>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <BottomSheet
            visible={openBottomSheetmarker}
            onClose={closeBottomSheetMarker}>
            <ScrollView nestedScrollEnabled={true}>
              <View style={newStyle.mainapp}>
                {isit ? (
                  <>
                    <Image
                      source={{
                        uri: eventData[0].img,
                      }}
                      style={newStyle.logoPointer}
                    />
                  </>
                ) : (
                  <>
                    <ActivityIndicator size={'large'} color="white" />
                  </>
                )}
              </View>
              <View style={newStyle.detailBox}>
                <ScrollView>
                  <Text style={newStyle.text}>
                    {isit ? (
                      eventData[0].name
                    ) : (
                      <ActivityIndicator size={'small'} color="white" />
                    )}
                  </Text>
                  <Text style={newStyle.subtext}>
                    {isit ? (
                      eventData[0].desc
                    ) : (
                      <ActivityIndicator size={'small'} color="white" />
                    )}
                  </Text>

                  <Text style={newStyle.subtext}>
                    Time :{' '}
                    {isit ? (
                      eventData[0].time
                    ) : (
                      <ActivityIndicator size={'small'} color="white" />
                    )}
                  </Text>
                </ScrollView>

                <>
                  {transferLoading ? (
                    <>
                      <ActivityIndicator size={'small'} color="white" />
                    </>
                  ) : (
                    <>
                      <TouchableOpacity onPress={() => transferCNFT(mint)}>
                        <View
                          style={{
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 15,
                            height: 45,
                            marginLeft: 16,
                            marginRight: 16,
                            marginTop: 35,
                            marginBottom: 20,
                          }}>
                          <Text style={{color: 'black', fontSize: 18}}>
                            Book Ticket
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </>
                  )}
                </>
              </View>
            </ScrollView>
            <TouchableOpacity onPress={closeBottomSheetMarker}>
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

export default PersonBottomSheet