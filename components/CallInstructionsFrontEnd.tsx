import {
  doFizzbuzz
} from '../utils/callInstructions'
import {
  init
} from '../utils/callInstructions'

import React, { useEffect, useCallback , useState } from 'react';
import {View, TextInput, Button , StyleSheet, Text,SafeAreaView} from 'react-native';


export default function CallInstructionsFrontEnd() {   
// variables for account 
const program = ""
const authority = ""
const systemProgram = ""
const clock = ""
const fizzbuzz_for_doFizzbuzz = ""
const owner_for_init = ""
const fizzbuzz_for_init = ""
const rent_for_init = ""


// React UseStates hooks for managing args 
//Example -> (argsName_for_instructionName , setArgsName_for_instructionName)
//for doFizzbuzz instructions
const [n_for_doFizzbuzz , setn_for_doFizzbuzz] = useState()
//for init instructions


//handler functions for inputs feilds
const nhandler_for_doFizzbuzz = (e:any) => {
  setn_for_doFizzbuzz(e.target.value)
}
  
  return (
    <>
       <SafeAreaView>
      <Text style={styles.textSubHeading}>
    Call Instructions Of Your IDL
  </Text>
              <View>
                 <Text style={styles.text}>
                  doFizzbuzz Instructions
                  </Text>
                <TextInput
                style={styles.input}
                placeholder={`Enter n`}
                onChangeText= {
                  nhandler_for_doFizzbuzz
                }
                value={
                  n_for_doFizzbuzz
                }
                />
                </View>
                <View style={styles.button}>
                   <Button
                    title={`Call doFizzbuzz Instructions`}
                    onPress = {
                    ()=>doFizzbuzz(program , n_for_doFizzbuzz ,  fizzbuzz_for_doFizzbuzz   ,)
              }
                />
                </View>
                <View style={styles.button}>
                   <Button
                    title={`Call init Instructions`}
                    onPress = {
                    ()=>init(program ,  owner_for_init   , fizzbuzz_for_init   , rent_for_init   ,   systemProgram ,)
              }
                />
                </View>

                
              </SafeAreaView>
              </>


  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    
  },
  button: {
    height: 40,
    marginTop: 10,
    borderRadius : 4,
  },
  text : {
    fontSize: 16,
    marginTop : 10,
    fontWeight: 'bold',
    color : 'white'
  },
  textSubHeading : {
    textAlign : 'center',
    fontSize: 18,
    marginTop : 15,
    fontWeight: 'bold',
    color : 'white'
  }
  
});
