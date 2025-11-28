import React from 'react';
import { Button, TextInput, View, Text, Pressable,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


export default function SigninScreen() {
  const navigation = useNavigation();

  // TODO: hook these TextInputs to state and perform real auth with axios.
  return (
    <View style={styleSheet.container}>
      <TextInput placeholder="Username" style={styleSheet.input} />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styleSheet.input}
      />

      <Text style={{ flex:1 }}>
        Don't have an account?
          <Pressable onPress={() => navigation.navigate('signup')} style={{ marginLeft: 6,marginTop: 8 }}>
            <Text style={{ color: 'dodgerblue' , padding: 1}}>   Signup </Text>
          </Pressable>
      </Text>

      <View style={styleSheet.button}>
        <Button title="Sign In" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
}

const styleSheet = StyleSheet.create({
  container:{
    width :"auto",
    height : 50,
    position:"absolute",
    alignSelf:"center",
    justifyContent:"center",
    marginTop:18,
    shadowOpacity:20,
    shadowColor:"black",
    flex:1,
    
  },
  input:{
    borderRadius:40,
    borderColor:"black",
    borderWidth:1,
    margin:8,

  },
  button :{
    backgroundColor : "dodgerBlue",
    borderRadius : 30,
  }
})