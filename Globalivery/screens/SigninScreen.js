import {Button,TextInput,View,Text,Pressable} from "react-native"
import axios from "axios"


export default function SigninScreen(){
//     function handlePress(user){
// // add a handlePress logic here
//     }
    return(
      <>
        <View>
          <TextInput placeholder="Username" />
          <TextInput placeholder="Password" passwordRules={"minilength:8"} />
          <Text>Don't have and account? 
            <Pressable onPress={()=>navigation.navigate('signup')} style={{color:"dodgerBlue"}}><Text>Signup</Text> </Pressable>then.
          </Text>
          <Button title="Sign In" ></Button>
        </View>
      </>  
    )
}