import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Image , Text} from 'react-native';
import MainScreen from '../screens/MainScreen';
import Chats from '../screens/Chats';
import MarketPlace from '../screens/MarketPlace';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
                source={{
                  uri: 'https://picsum.photos/200',
                }}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
              />
              <Text style={{color : focused ? '#e32f45' : '#748c94', fontSize : 12 }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen name="Chat" component={Chats} 
      options={{
        tabBarIcon: ({focused}) => (
          <View
            style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            <Image
              source={{
                uri: 'https://picsum.photos/201',
              }}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#e32f45' : '#748c94',
              }}
            />
            <Text style={{color : focused ? '#e32f45' : '#748c94', fontSize : 12 }}>
              Chats
            </Text>
          </View>
        ),
      }}
      />
      <Tab.Screen name="MarketPlace" component={MarketPlace} 
      options={{
        tabBarIcon: ({focused}) => (
          <View
            style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            <Image
              source={{
                uri: 'https://picsum.photos/202',
              }}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#e32f45' : '#748c94',
              }}
            />
            <Text style={{color : focused ? '#e32f45' : '#748c94', fontSize : 12 }}>
              MarketPlace
            </Text>
          </View>
        ),
      }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
