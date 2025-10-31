import React from 'react';
import { Button, TextInput, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


export default function SigninScreen() {
  const navigation = useNavigation();

  // TODO: hook these TextInputs to state and perform real auth with axios.
  return (
    <View style={{ padding: 12, justifyContent:'center', flex:1, alignSelf:'center', width:'80%' }}>
      <TextInput placeholder="Username" style={{ marginBottom: 8, padding: 8, borderWidth: 1, borderRadius: 4 }} />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={{ padding: 8, borderWidth: 1, borderRadius: 4 }}
      />

      <Text style={{ flex:1 }}>
        Don't have an account?
          <Pressable onPress={() => navigation.navigate('signup')} style={{ marginLeft: 6,marginTop: 8 }}>
            <Text style={{ color: 'dodgerblue' , padding: 1}}>   Signup </Text>
          </Pressable>
      </Text>

      <View style={{ marginTop: 18 }}>
        <Button title="Sign In" onPress={() => navigation.navigate('home')} />
      </View>
    </View>
  );
}