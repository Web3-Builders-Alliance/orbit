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
  TextInput,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {
  clusterApiUrl,
  Keypair,
  Transaction,
  Connection,
  Commitment,
} from '@solana/web3.js';
import wallet from '../wallet/wallet';
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
  const [openMomentoBottomSheet, setOpenMomentoBottomSheet] = useState(false);
  const [openSocialBottomSheet, setOpenSocialBottomSheet] = useState(false);
  const [openHostBottomSheet, setopenHostBottomSheet] = useState(false);

  const [displayMomentoBottomSheet, setDisplayMomentoBottomSheet] =
    useState(false);
  const [displaySocialBottomSheet, setDisplaySocailBottomSheet] =
    useState(false);

  const [isit, setisit] = useState(false);
  const [personisit, setPeronisit] = useState(false);
  const [users, setusers] = useState([]);
  const [Lat, setLat] = useState('');
  const [Lng, setLng] = useState('');
  const [mint, setMint] = useState('');
  const [transfer, setNoTransfer] = useState(false);

  const [loading, setLoading] = useState(false);
  const [transferLoading, settransferLoading] = useState(false);

  const [type, setType] = useState('event');

  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [time_for_event, setTime_for_event] = useState('');

  const [momentoName, setMomentoName] = useState('');
  const [momentoDesc, setMomentoDesc] = useState('');
  const [socialName, setSocialName] = useState('');
  const [socialDesc, setSocialDesc] = useState('');

  const momentoNameHadler = (e: any) => {
    setMomentoName(e);
  };

  const momentoDescHandler = (e: any) => {
    setMomentoDesc(e);
  };

  const socialNameHandler = (e: any) => {
    setSocialName(e);
  };

  const socialDescHandler = (e: any) => {
    setSocialDesc(e);
  };

  const eventNameHandler = (e: any) => {
    setEventName(e);
  };

  const eventDescHandler = (e: any) => {
    setEventDesc(e);
  };

  const timeHandlerForTime = (e: any) => {
    setTime_for_event(e);
  };

  useEffect(() => {
    allAllNFTs()
    getData();
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

  const OpenMomentoBottomSheet = () => {
    setOpenMomentoBottomSheet(true);
  };

  const CLoseMomentoBottomSheet = () => {
    setOpenMomentoBottomSheet(false);
  };

  const OpenSocialBottomSheet = () => {
    setOpenSocialBottomSheet(true);
  };

  const CloseSocailBottomSheet = () => {
    setOpenSocialBottomSheet(false);
  };

  const OpenHostBottomSheet = () => {
    setopenHostBottomSheet(true);
  };

  const CloseHostBOttomSheet = () => {
    setopenHostBottomSheet(false);
  };

  const OpenDisplayMomentoBottomSheet = () => {
    setDisplayMomentoBottomSheet(true);
  };

  const CloseDisplayMomentoBottomSheet = () => {
    setDisplayMomentoBottomSheet(false);
  };

  const OpenDisplaySocialBottomSheet = () => {
    setDisplaySocailBottomSheet(true);
  };

  const CloseDisplaySocailBottomSheet = () => {
    setDisplaySocailBottomSheet(false);
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
        setisit(true);
        console.log(array[0].mint);
        setMint(array[0].mint);
        setTimeout(() => {
          console.log(array[0].mint);
        }, 500);
        // setTimeout(() => {
        //   console.log(eventData[0].mint);
        //   setMint(eventData[0].mint);
        // },100);
      });
    openBottomSheetMarker();
  };

  const getDataForMomentoBottomSheet = (Lat: number, Lng: number) => {
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
        setisit(true);
        console.log(array[0].mint);
        setMint(array[0].mint);
        setTimeout(() => {
          console.log(array[0].mint);
        }, 500);
        // setTimeout(() => {
        //   console.log(eventData[0].mint);
        //   setMint(eventData[0].mint);
        // },100);
      });
    OpenDisplayMomentoBottomSheet();
  };

  const getDataForSocialBottomSheet = (Lat: number, Lng: number) => {
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
        setisit(true);
        console.log(array[0].mint);
        setMint(array[0].mint);
        setTimeout(() => {
          console.log(array[0].mint);
        }, 500);
        // setTimeout(() => {
        //   console.log(eventData[0].mint);
        //   setMint(eventData[0].mint);
        // },100);
      });
    OpenDisplaySocialBottomSheet();
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
    tree: string,
    type: string,
    transfer: boolean,
  ) => {
    try {
      const connection = new Connection(clusterApiUrl('devnet'), 'finalized');
      const feePayer = Keypair.fromSecretKey(bs58.decode(fromPrivateKey));
      const recoveredTransaction = Transaction.from(
        Buffer.from(encodedTransaction, 'base64'),
      );
      recoveredTransaction.partialSign(feePayer);
      const txnSignature = await connection.sendRawTransaction(
        recoveredTransaction.serialize(),
      );
      console.log('txSig from 1-' + txnSignature);
      console.log('Tree from 1-' + tree);
      setTimeout(() => {
        finalCFTMint(tree, type, transfer);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const signTransactionv3 = async (
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
      Alert.alert(
        'Ticket Recieved',
        `TxSignature : https://translator.shyft.to/tx/${txnSignature}?cluster=devnet`,
        [
          {
            text: 'Dismiss',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
          {
            text: 'Explorer',
            onPress: () =>
              Linking.openURL(
                `https://translator.shyft.to/tx/${txnSignature}?cluster=devnet`,
              ),
          },
        ],
      );
      console.log('txSig from v3-' + txnSignature);
      settransferLoading(false);
    } catch (error) {
      console.log('from v3-' + error);
    }
  };

  const signTransactionv2 = async (
    encodedTransaction: string,
    fromPrivateKey: string,
    mint: string,
    type: string,
    transfer: boolean,
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
      console.log('tx hash from v2-' + txnSignature);
      console.log(`Mint v2 - ${mint}`);
      if (transfer) {
        setTimeout(() => {
          transferCNFT(mint);
        }, 500);
      }

      if (type == 'event') {
        setTimeout(() => {
          addEvent(mint);
        }, 700);
      }

      if (type == 'momento') {
        setTimeout(() => {
          addMomento(mint);
        }, 700);
      }

      if (type == 'social') {
        setTimeout(() => {
          addSocial(mint);
        }, 700);
      }

      Alert.alert(
        'Evnet Published',
        `TxSignature : https://translator.shyft.to/tx/${txnSignature}?cluster=devnet and your mint is ${mint}`,
        [
          {
            text: 'Dismiss',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
          {
            text: 'Explorer',
            onPress: () =>
              Linking.openURL(
                `https://translator.shyft.to/tx/${txnSignature}?cluster=devnet`,
              ),
          },
        ],
      );
    } catch (error) {
      console.log('error from v2' + error);
    }
  };

  const mintCNFT = (type: string, transfer: boolean) => {
    setLoading(true);
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
      .then(result =>
        signTransaction(
          result.result.encoded_transaction,
          wallet,
          result.result.tree,
          type,
          transfer,
        ),
      )
      .catch(error => console.log('error', error));
  };

  const finalCFTMint = (tree: string, type: string, transfer: boolean) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('x-api-key', 'HI_eHFd0SX8ykSDW');

    var raw = JSON.stringify({
      network: 'devnet',
      creator_wallet: '2JSg1MdNqRg9z4RP7yiE2NV86fux2BNtF3pSDjhoi767',
      metadata_uri:
        'https://gateway.pinata.cloud/ipfs/QmYmUb5MHZwYovnQg9qANTJUi7R8VaE5CetfssczaSWn5K',
      merkle_tree: tree,
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
        // console.log("tx hash from final"+ result.result.encoded_transaction)
        signTransactionv2(
          result.result.encoded_transaction,
          wallet,
          result.result.mint,
          type,
          transfer,
        ),
      )
      .catch(error => console.log('error from final', error));
  };

  const transferCNFT = (mintAddress: string) => {
    settransferLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('x-api-key', 'HI_eHFd0SX8ykSDW');

    var raw = JSON.stringify({
      network: 'devnet',
      nft_address: mintAddress,
      sender: '2JSg1MdNqRg9z4RP7yiE2NV86fux2BNtF3pSDjhoi767',
      receiver: '44n5CYX18L6p4VxVECE9ZNYrAGB9GKD477b78kPNq5Su',
    });

    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.shyft.to/sol/v1/nft/compressed/transfer', requestOptions)
      .then(response => response.json())
      .then(result =>
        signTransactionv3(result.result.encoded_transaction, wallet),
      )
      .catch(error => console.log('error', error));
  };

  const addMomento = (mint: string) => {
    firestore()
      .collection('Users')
      .add({
        Lat: Number(Lat),
        Lng: Number(Lng),
        mint: mint,
        name: momentoName,
        desc: momentoDesc,
        type: 'momento',
        img: '',
      })
      .then(() => {
        console.log('Momento Data Added');
        setLoading(false);
      });
  };

  const addSocial = (mint: string) => {
    firestore()
      .collection('Users')
      .add({
        Lat: Number(Lat),
        Lng: Number(Lng),
        mint: mint,
        name: socialName,
        desc: socialDesc,
        type: 'social',
        img: '',
      })
      .then(() => {
        console.log('Social Data Added');
        setLoading(false);
      });
  };

  const addEvent = (mint: string) => {
    firestore()
      .collection('Users')
      .add({
        Lat: Number(Lat),
        Lng: Number(Lng),
        mint: mint,
        name: eventName,
        desc: eventDesc,
        time: time_for_event,
        type: 'event',
        img: 'https://firebasestorage.googleapis.com/v0/b/orbit-4ea31.appspot.com/o/img.jpg?alt=media&token=5a6d47ef-fa7f-46d6-95ba-0cf0cb26b9e6',
      })
      .then(() => {
        console.log('Event Data Added');
        setLoading(false);
      });
  };

  const setLatLngforMomento = (Lat: string, Lng: string) => {
    setLat(Lat);
    setLng(Lng);
  };

  return (
    <>
      <SafeAreaView>
        {/* Bottom sheet for person  */}
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

        {/* Bottom Sheet for marker */}
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

        {/* Bottom Sheet for display momento */}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <BottomSheet
            visible={displayMomentoBottomSheet}
            onClose={CloseDisplayMomentoBottomSheet}>
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
                    {isit ? (
                      'Posted By - ' + eventData[0].wallet
                    ) : (
                      <ActivityIndicator size={'small'} color="white" />
                    )}
                  </Text>
                </ScrollView>
              </View>
            </ScrollView>
            <TouchableOpacity onPress={CloseDisplayMomentoBottomSheet}>
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

        {/* Bottom Sheet for display socail */}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <BottomSheet
            visible={displaySocialBottomSheet}
            onClose={CloseDisplaySocailBottomSheet}>
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
                    {isit ? (
                      'Posted By - ' + eventData[0].wallet
                    ) : (
                      <ActivityIndicator size={'small'} color="white" />
                    )}
                  </Text>
                  <TouchableOpacity onPress={CloseDisplaySocailBottomSheet}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 15,
                        height: 45,
                        marginTop : 20,
                        marginLeft : 16,
                        marginRight : 16,
                        marginBottom : 16
                      }}>
                      <Text style={{color: 'black', fontSize: 18}}>Find it Useful , donate!</Text>
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </ScrollView>
            <TouchableOpacity onPress={CloseDisplaySocailBottomSheet}>
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

        {/* Bottom sheet for momento */}

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
                  <View style={styles.header}>
                    <Image
                      source={require('../img/image.png')}
                      style={newStyle.logoPointerForMomento}
                    />
                  </View>
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
                <TouchableOpacity onPress={() => mintCNFT('momento', true)}>
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
        </View>

        {/* Bottom Sheet for Society */}
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
                  <View style={styles.header}>
                    <Image
                      source={require('../img/image.png')}
                      style={newStyle.logoPointerForMomento}
                    />
                  </View>
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
                  placeholder="Your Momento Name"
                />
                <Text style={inputForm.label}>Description</Text>
                <TextInput
                  style={inputForm.input}
                  value={socialDesc}
                  onChangeText={socialDescHandler}
                  placeholder="Momento Description"
                  keyboardType="email-address"
                />
                <TouchableOpacity onPress={() => mintCNFT('social', true)}>
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
        </View>

        {/* Bottom Sheet for hostEvent */}
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
                  <View style={styles.header}>
                    <Image
                      source={require('../img/image.png')}
                      style={newStyle.logoPointerForMomento}
                    />
                  </View>
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
                <TouchableOpacity onPress={() => mintCNFT('event', false)}>
                  {loading ? (
                    <>
                      <ActivityIndicator size="small" color="white" />
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
                          coordinate={{
                            latitude: item.Lat,
                            longitude: item.Lng,
                          }}
                          title={'User'}>
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
                          coordinate={{
                            latitude: item.Lat,
                            longitude: item.Lng,
                          }}
                          title={'User'}>
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
                        coordinate={{
                          latitude: item.Lat,
                          longitude: item.Lng,
                        }}
                        title={'Event'}>
                        <Image
                          source={require('../img/placard.png')}
                          style={styles.markerlogoim}
                        />
                      </Marker>
                    </>
                  );
                }
                if (item.type == 'momento') {
                  return (
                    <>
                      <Marker
                        onPress={() =>
                          getDataForMomentoBottomSheet(item.Lat, item.Lat)
                        }
                        coordinate={{
                          latitude: item.Lat,
                          longitude: item.Lng,
                        }}
                        title={'Momento'}>
                        <Image
                          source={require('../img/landmark.png')}
                          style={styles.markerlogoim}
                        />
                      </Marker>
                    </>
                  );
                }
                if (item.type == 'social') {
                  return (
                    <>
                      <Marker
                        onPress={() =>
                          getDataForSocialBottomSheet(item.Lat, item.Lat)
                        }
                        coordinate={{
                          latitude: item.Lat,
                          longitude: item.Lng,
                        }}
                        title={'Social'}>
                        <Image
                          source={require('../img/warning.png')}
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
              <TouchableOpacity onPress={OpenHostBottomSheet}>
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
                    Host Events
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={bottomstyles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  OpenMomentoBottomSheet();
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
                    Momento
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={bottomstyles.container}>
            <View style={bottomstyles.buttonContainer}>
              <TouchableOpacity onPress={OpenSocialBottomSheet}>
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
                    Social
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
  headerForMomentoBottom: {
    paddingTop: 5,
    textAlign: 'center',
    alignItems: 'center',
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
  textForBottomSheet: {
    fontWeight: 'bold',
    lineHeight: 30,
    fontSize: 20,
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
  mapcontainerForMomento: {
    height: 200,
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
  logoPointerForMomento: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 138,
    marginTop: 20,
    width: 70,
    height: 70,
    borderRadius: 20,
    margin: 5,
  },
  detailBox: {
    height: 300,
    backgroundColor: '#343434',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30,
    marginBottom: 20,
  },
  text: {
    color: 'white',
    marginLeft: 15,
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

const inputForm = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
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
