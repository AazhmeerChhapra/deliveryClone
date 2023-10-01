import React from "react";
import { View, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const PreparingOrderScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() =>{
            navigation.navigate("Delivery")
        }, 4000)
    }, []);
    return ( 
    <SafeAreaView className = "bg-[#00CCBB] flex-1 justify-center items-center ">
        <Animatable.Image 
        source={require("../assets/orderLoading.gif")}
        animation="slideInUp"
        iterationCount={1}
        className = "h-96 w-96"
        />
        <Animatable.Text 
        animation="slideInUp"
        iterationCount={1}
        className = "text-lg text-white font-bold text-center my-10"
        >
            Waiting for Restaurant to Accept Your order
        </Animatable.Text>

        <Progress.Bar size={60} indeterminate = {true} color="white" />

    </SafeAreaView> );
}
 
export default PreparingOrderScreen;