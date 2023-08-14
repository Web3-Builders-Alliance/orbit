import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import React, {ComponentProps} from 'react';
import {Button} from 'react-native';

import {useAuthorization} from './providers/AuthorizationProvider';
import {View, TouchableOpacity,Text,StyleSheet} from 'react-native';
type Props = Readonly<ComponentProps<typeof Button>>;

export default function DisconnectButton(props: Props) {
  const {deauthorizeSession} = useAuthorization();
  return (
    <View style={bottomstyles.container}>
    <View style={bottomstyles.buttonContainer}>
    <TouchableOpacity
      onPress={() => {
        transact(async wallet => {
          await deauthorizeSession(wallet);
        });
      }}>
      <View
        style={{
          backgroundColor : "black",
          marginTop: -18,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          marginLeft: 10,
          marginRight: 10,
          height: 40,
        }}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          Dissconnect 
        </Text>
      </View>
    </TouchableOpacity>
    </View>
    </View>
  );
}

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

