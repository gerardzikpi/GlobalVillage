//the screen that shows the product info on which item the user is buying
import {View,Text,Button,Image,StyleSheet,Pressable} from "react-native"

const dummyProduct = {"name":"Smartwatch","price":"$129","category":"electronics"}
//const id = //something's id

export default function DetailScreen(){
    return(
        <View>
            //<Image>{dummyProduct.image}</Image>
            <Text>Product name: {dummyProduct.name}</Text>
            <Text>Price:{dummyProduct.price}</Text>
            <Text>Category:{dummyProduct.category}</Text>
            <Pressable>
                <Button>Order</Button>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container : {
            flex:1,
        }
    }
)