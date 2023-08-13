import React, { useEffect, useState } from 'react';
import {ConnectionProvider} from './components/providers/ConnectionProvider';
import {clusterApiUrl} from '@solana/web3.js';
import {SafeAreaView, StyleSheet, View,Text, Image} from 'react-native';
import {AuthorizationProvider} from './components/providers/AuthorizationProvider';
import {Header} from './components/Header';
import Tabs from './navigation/tabs';
import MainScreen from './screens/MainScreen';
import {NavigationContainer , DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AiOutlineHome} from 'react-icons/ai'
import { color } from '@rneui/base';
import Chats from './screens/Chats';
import MarketPlace from './screens/MarketPlace';
import DisconnectButton from './components/DisconnectButton';
import {
  useAuthorization,
  Account,
} from './components/providers/AuthorizationProvider';

const Stack = createNativeStackNavigator();
const DEVNET_ENDPOINT = clusterApiUrl('devnet');
const Tab = createBottomTabNavigator()
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black'
  },
};

export default function App() {
  const {selectedAccount} = useAuthorization();
  const [connected , setConnected] = useState(false)

  useEffect(()=> {
    if(selectedAccount){
      setConnected(true)
    }
    else {
      setConnected(false)
    }
  })
  return (
    <ConnectionProvider
      config={{commitment: 'processed'}}
      endpoint={DEVNET_ENDPOINT}>
      <AuthorizationProvider>
        <SafeAreaView style={styles.shell}>
          <NavigationContainer theme={MyTheme}>
            <Tab.Navigator
            tabBarOptions = {{
              showLabel : true,
              labelStyle: { textTransform: "none", fontSize : 18, marginBottom : 10 , color : "black"},
              fontSize: 25,
              style : {
                position : 'absolute',
                bottom : 15,
                left : 20,
                right : 20 ,
                elevation : 0,
                backgroundColor : '#ffffff',
                borderRadius : 15,
                height : 45,
               
              }
            }}
            >
              <Tab.Screen name='Home' component={MainScreen} 
                
              />
              <Tab.Screen name='Chats' component={Chats}
              />
               <Tab.Screen name='Trade' component={MarketPlace}
              />
            </Tab.Navigator>
            
          </NavigationContainer>
        </SafeAreaView>
      </AuthorizationProvider>
    </ConnectionProvider>
  );
}

const styles = StyleSheet.create({
  shell: {
    height: '100%',
  },
});
