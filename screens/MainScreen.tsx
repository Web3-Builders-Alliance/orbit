import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from '../navigation/tabs';
import {Section} from '../components/Section';
import ConnectButton from '../components/ConnectButton';
import AccountInfo from '../components/AccountInfo';
import {
  useAuthorization,
  Account,
} from '../components/providers/AuthorizationProvider';
import {useConnection} from '../components/providers/ConnectionProvider';
import DisconnectButton from '../components/DisconnectButton';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
import RequestAirdropButton from '../components/RequestAirdropButton';
import CallInstructionsFrontEnd from '../components/CallInstructionsFrontEnd';
import Ting from '../components/Ting';
export default function MainScreen() {
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);

  const fetchAndUpdateBalance = useCallback(
    async (account: Account) => {
      console.log('Fetching balance for: ' + account.publicKey);
      const fetchedBalance = await connection.getBalance(account.publicKey);
      console.log('Balance fetched: ' + fetchedBalance);
      setBalance(fetchedBalance);
    },
    [connection],
  );

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
  }, [fetchAndUpdateBalance, selectedAccount]);

  return (
    <>
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {selectedAccount ? (
            <>
              <SafeAreaView>
                <ScrollView style={styles.scroolView}>
                  {/* <Section title="Account Info">
                <AccountInfo
                  selectedAccount={selectedAccount}
                  balance={balance}
                />
                /> */}
                  <Ting />
                  <View style={bottomstyles.container}>
                    <View style={bottomstyles.buttonContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          /* do this */
                        }}>
                        <View
                          style={{
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 15,
                            height : 40
                          }}>
                          <Text style={{color: 'black'}}>Find People</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={bottomstyles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                          /* do this */
                        }}>
                        <View
                          style={{
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 15,
                            height : 40
                          }}>
                          <Text style={{color: 'black'}}>Find Events</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View 
                   style={{
                    backgroundColor: 'red',
                    marginTop : 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    marginLeft : 10,
                    marginRight : 10,
                    height : 40
                  }}
                  >
                    <DisconnectButton  title='Disconnect Button' />
                    </View>
                  {/* <CallInstructionsFrontEnd/> */}
                  {/* </Section> */}
                </ScrollView>
              </SafeAreaView>
            </>
          ) : null}
        </ScrollView>
        {selectedAccount ? <></> : <ConnectButton title="Connect wallet" />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    padding: 16,
    flex: 1,
  },
  scrollContainer: {
    height: '100%',
  },
  buttonGroup: {
    flexDirection: 'column',
    paddingVertical: 4,
  },
  scroolView: {
    marginBottom: 10,
  },
  textSubHeading: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
  },

  app: {
    maxWidth: 500,
    backgroundColor: 'black',
  },
  logo: {
    height: 80,
  },
  header: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'left',
    color: 'white',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
    marginVertical: '0.5rem',
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
    paddingTop: 50,
  },
  tinyLogo: {
    width: 60,
    height: 60,
    marginLeft: 10,
    borderRadius: 50,
  },
  logoimp: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 50,
  },
  containerimp: {
    flex: 1,
    padding: 10,
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
