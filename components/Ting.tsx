import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import {clusterApiUrl, Keypair, Transaction, Connection} from '@solana/web3.js';
import {BsFillPersonFill} from 'react-icons/bs';
import {Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import BottomSheet from './BottomSheet';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native';
import DisconnectButton from './DisconnectButton';
import Geoloaction from 'react-native-geolocation-service';
import * as bs58 from 'bs58';

export default function Ting() {
  const [shyft, setShyft] = useState([]);
  const [personData, setPersonData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [openBottomSheetmarker, setBottomSheetMarker] = useState(false);
  const [isit, setisit] = useState(false);
  const [personisit, setPeronisit] = useState(false);
  const [users, setusers] = useState([]);
  const [encoded_transaction, setEncodeTranaction]: any = useState([]);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geoloaction.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const openBottomSheetMarker = () => {
    setBottomSheetMarker(true);
  };

  const closeBottomSheetMarker = () => {
    setBottomSheetMarker(false);
  };

  const getData = () => {
    const array: any[] = [];
    firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documnetSnapshot => {
          //console.log(documnetSnapshot.data())
          array.push(documnetSnapshot.data());
        });
        setusers(array);
        console.log(users);
      });
  };

  const allAllNFTs = () => {
    var myHeaders = new Headers();
    myHeaders.append('x-api-key', 'HI_eHFd0SX8ykSDW');

    var requestOptions: any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://api.shyft.to/sol/v1/nft/read_all?network=mainnet-beta&address=44n5CYX18L6p4VxVECE9ZNYrAGB9GKD477b78kPNq5Su',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => setShyft(result.result))
      .catch(error => console.log('error', error));

    console.log(shyft);
  };

  const getDataForBottomSheet = (Lat: number, Lng: number) => {
    setisit(false);
    const array: any[] = [];
    firestore()
      .collection('Users')
      .where('Lat', '==', Lat)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.exists) {
            //console.log(documentSnapshot.data());
            array.push(documentSnapshot.data());
          } else {
            console.log('Data not found');
          }
        });
        setEventData(array);
        console.log(eventData);
        setisit(true);
      });
    openBottomSheetMarker();
  };

  const ching = (Lat: number, Lng: number) => {
    setPeronisit(false);
    const array: any[] = [];
    firestore()
      .collection('Users')
      .where('Lat', '==', Lat)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.exists) {
            //console.log(documentSnapshot.data());
            array.push(documentSnapshot.data());
          } else {
            console.log('Data not found');
          }
        });
        setPersonData(array);
        console.log(personData);
        setPeronisit(true);
      });
    openBottomSheet();
  };

  const signTransaction = async (
    encodedTransaction: string,
    fromPrivateKey: string,
  ) => {
    try {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const feePayer = Keypair.fromSecretKey(bs58.decode(fromPrivateKey));
      const recoveredTransaction = Transaction.from(
        Buffer.from(encodedTransaction, 'base64'),
      );
      recoveredTransaction.partialSign(feePayer);
      const txnSignature = await connection.sendRawTransaction(
        recoveredTransaction.serialize(),
      );
      console.log(txnSignature);
      console.log("DONe")
    } catch (error) {
      console.log(error);
    }
  };

  const signTransactionv2 = async (
    encodedTransaction: string,
    fromPrivateKey: string,
    mint: string,
  ) => {
    try {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const feePayer = Keypair.fromSecretKey(bs58.decode(fromPrivateKey));
      const recoveredTransaction = Transaction.from(
        Buffer.from(encodedTransaction, 'base64'),
      );
      recoveredTransaction.partialSign(feePayer);
      const txnSignature = await connection.sendRawTransaction(
        recoveredTransaction.serialize(),
      );
      console.log(txnSignature);
      console.log(`Mint : ${mint}`);
      setTimeout(()=>{
        transferCNFT(mint)
      },1500)
    } catch (error) {
      console.log(error);
    }
  };

  const mintCNFT = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('x-api-key', 'HI_eHFd0SX8ykSDW');

    var raw = JSON.stringify({
      network: 'devnet',
      wallet_address: '2JSg1MdNqRg9z4RP7yiE2NV86fux2BNtF3pSDjhoi767',
      max_depth_size_pair: {
        max_depth: 14,
        max_buffer_size: 64,
      },
      canopy_depth: 10,
    });

    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://api.shyft.to/sol/v1/nft/compressed/create_tree',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => setEncodeTranaction(result))
      .catch(error => console.log('error', error));

    console.log(encoded_transaction.result.encoded_transaction);
    console.log(encoded_transaction.result.tree);

    setTimeout(() => {
      signTransaction(
        encoded_transaction.result.encoded_transaction,
        '/',
      );
    }, 500);
    setTimeout(() => {
      finalCFTMint();
    }, 1000);
  };

  const finalCFTMint = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('x-api-key', 'HI_eHFd0SX8ykSDW');

    var raw = JSON.stringify({
      network: 'devnet',
      creator_wallet: '2JSg1MdNqRg9z4RP7yiE2NV86fux2BNtF3pSDjhoi767',
      metadata_uri:
        'https://gateway.pinata.cloud/ipfs/QmYmUb5MHZwYovnQg9qANTJUi7R8VaE5CetfssczaSWn5K',
      merkle_tree: encoded_transaction.result.tree,
      max_supply: 1,
      is_mutable: true,
    });

    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.shyft.to/sol/v1/nft/compressed/mint', requestOptions)
      .then(response => response.json())
      .then(result =>
        signTransactionv2(
          result.result.encoded_transaction,
          '/',
          result.result.mint,
        ),
      )
      .catch(error => console.log('error', error));
  };

  const transferCNFT = (mintAddress : string) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('x-api-key', 'HI_eHFd0SX8ykSDW');

    var raw = JSON.stringify({
      network: 'devnet',
      nft_address: mintAddress,
      sender: '2JSg1MdNqRg9z4RP7yiE2NV86fux2BNtF3pSDjhoi767',
      receiver: '44n5CYX18L6p4VxVECE9ZNYrAGB9GKD477b78kPNq5Su',
    });

    var requestOptions : any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.shyft.to/sol/v1/nft/compressed/transfer', requestOptions)
      .then(response => response.json())
      .then(result => signTransaction(result.result.encoded_transaction,"/"))
      .catch(error => console.log('error', error));
  };

  return (
    <>
      <SafeAreaView>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {/* <Button title="Open Bottom Sheet" onPress={openBottomSheet} /> */}
          <BottomSheet visible={bottomSheetVisible} onClose={closeBottomSheet}>
            <ScrollView nestedScrollEnabled={true}>
              <View style={newStyle.mainapp}>
                {personisit ? (
                  <>
                    <Image
                      source={{
                        uri: personData[0].image,
                      }}
                      style={newStyle.logo}
                    />
                  </>
                ) : (
                  <>
                    <Image
                      source={{
                        uri: 'https://picsum.photos/200',
                      }}
                      style={newStyle.logo}
                    />
                  </>
                )}
              </View>

              <View style={newStyle.detailBox}>
                <Text style={newStyle.text}>
                  {personisit ? personData[0].name : 'Name'}
                </Text>
                <Text style={newStyle.subtext}>Wallet Address : </Text>
                <Text style={newStyle.subtext}>
                  BZBT4C6UsEeow9ebLRymhtTtZj9sYDw3WkwZHHbFg2YY
                </Text>
                <Text style={newStyle.subtext}>Friends : 10</Text>
              </View>
              <Text style={newStyle.text}>NFT Collection</Text>
              <ScrollView>
                <View style={liststyles.container}>
                  <FlatList
                    horizontal={true}
                    data={shyft}
                    renderItem={({item}) => (
                      <>
                        <View>
                          <Image
                            source={{
                              uri: item.image_uri,
                            }}
                            style={newStyle.logo}
                          />
                          {/* <Text style={liststyles.item}>{item.name}</Text> */}
                        </View>
                      </>
                    )}
                  />
                </View>
              </ScrollView>
            </ScrollView>
            <TouchableOpacity onPress={closeBottomSheet}>
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
                    <Image
                      source={{
                        uri: 'https://picsum.photos/200',
                      }}
                      style={newStyle.logoPointer}
                    />
                  </>
                )}
              </View>

              <View style={newStyle.detailBox}>
                <Text style={newStyle.text}>
                  {isit ? eventData[0].name : 'TestEent'}
                </Text>
                <Text style={newStyle.subtext}>
                  {isit ? eventData[0].desc : 'Event Description'}
                </Text>

                <Text style={newStyle.subtext}>
                  Time : {isit ? eventData[0].time : '1500:1900'}
                </Text>
                <TouchableOpacity onPress={closeBottomSheetMarker}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 15,
                      height: 45,
                      marginLeft: 16,
                      marginRight: 16,
                      marginTop: 20,
                      marginBottom: 20,
                    }}>
                    <Text style={{color: 'black', fontSize: 18}}>
                      Book Ticket
                    </Text>
                  </View>
                </TouchableOpacity>
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
                  uri: 'https://picsum.photos/206',
                }}
                style={styles.headerlogoim}
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
              marginTop: 5,
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
          <View style={styles.discoverHeading}>
            <Text style={styles.text}>Discover</Text>
          </View>

          <View style={styles.mapcontainer}>
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
              {users.map((item, key) => {
                if (item.type == 'people') {
                  if (item.gender == 'male') {
                    return (
                      <>
                        <Marker
                          onPress={() => ching(item.Lat, item.Lat)}
                          draggable
                          coordinate={{
                            latitude: item.Lat,
                            longitude: item.Lng,
                          }}
                          onDragEnd={e =>
                            alert(JSON.stringify(e.nativeEvent.coordinate))
                          }
                          title={'Test Marker'}
                          description={'This is a description of the marker'}>
                          <Image
                            source={require('../img/man.png')}
                            style={styles.markerlogoim}
                          />
                        </Marker>
                      </>
                    );
                  }
                  if (item.gender == 'female') {
                    return (
                      <>
                        <Marker
                          onPress={() => ching(item.Lat, item.Lat)}
                          draggable
                          coordinate={{
                            latitude: item.Lat,
                            longitude: item.Lng,
                          }}
                          onDragEnd={e =>
                            alert(JSON.stringify(e.nativeEvent.coordinate))
                          }
                          title={'Test Marker'}
                          description={'This is a description of the marker'}>
                          <Image
                            source={require('../img/wooman.png')}
                            style={styles.markerlogoim}
                          />
                        </Marker>
                      </>
                    );
                  }
                }
                if (item.type == 'event') {
                  return (
                    <>
                      <Marker
                        onPress={() =>
                          getDataForBottomSheet(item.Lat, item.Lat)
                        }
                        draggable
                        coordinate={{
                          latitude: item.Lat,
                          longitude: item.Lng,
                        }}
                        onDragEnd={e =>
                          alert(JSON.stringify(e.nativeEvent.coordinate))
                        }
                        title={'Test Marker'}
                        description={'This is a description of the marker'}>
                        <Image
                          source={require('../img/placard.png')}
                          style={styles.markerlogoim}
                        />
                      </Marker>
                    </>
                  );
                }
              })}
            </MapView>
          </View>
          <View style={bottomstyles.container}>
            <View style={bottomstyles.buttonContainer}>
              <TouchableOpacity onPress={getData}>
                <View
                  style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    height: 40,
                  }}>
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                    Find People
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={bottomstyles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  mintCNFT();
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    height: 40,
                  }}>
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                    Find Events
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={bottomstyles.container}>
            <View style={bottomstyles.buttonContainer}>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    height: 40,
                  }}>
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                    Host Event
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <DisconnectButton title="Disconnect Button" />
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
    paddingTop: 15,
  },
  discoverHeading: {
    padding: 1,
    marginTop: 20,
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
    paddingTop: 8,
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
  markerlogoim: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 50,
  },
  headerlogoim: {
    width: 45,
    height: 45,
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
    borderRadius: 50,
    overflow: 'hidden',
  },
});

const newStyle = StyleSheet.create({
  mainapp: {
    marginTop: 20,
    marginLeft: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 5,
  },
  logoPointer: {
    justifyContent: 'center',
    height: 200,
    borderRadius: 10,
    margin: 5,
  },
  detailBox: {
    height: 250,
    backgroundColor: '#343434',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30,
    marginBottom: 20,
  },
  text: {
    color: 'white',
    marginLeft: 25,
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtext: {
    color: 'white',
    marginLeft: 15,
    marginTop: 10,
    fontSize: 18,
  },
});

const liststyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    marginBottom: 20,
    marginLeft: 15,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    alignItems: 'center',
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
  },
  buttonContainer: {
    flex: 1,
    margin: 5,
    color: 'white',
  },
});
