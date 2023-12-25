import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native-animatable";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from 'react-native-progress';
import {GOOGLE_MAPS_API_KEY} from "@env";
import MapView, {Marker} from 'react-native-maps';
import * as Location from "expo-location";
import MapViewDirections from 'react-native-maps-directions';





const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);

    const restaurant_lat = global.latitude;
    const restaurant_long = global.longitude;
    const route = useRoute();
    const currentLocation = global.currentLocation;
    const [initialRegion, setInitialRegion] = useState(null);

    const origin = { latitude: restaurant_lat, longitude: restaurant_long }; // Replace with your origin coordinates
    const destination = { latitude:currentLocation.latitude , longitude: currentLocation.longitude }; // Replace with your destination coordinates
  
    useEffect(() => {
        console.log("hello",restaurant.long);
    })
    return ( 
        <View className = "bg-[#00CCBB] flex-1">
            <SafeAreaView className = "z-50">
                <View className = "flex-row justify-between items-center p-5">
                    <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                        <XMarkIcon color= "white" size={30}/>
                    </TouchableOpacity>
                    <Text className = "font-light text-white text-lg">Order Help</Text>
                </View>
                <View className = "bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
                    <View className = "flex-row justify-between">
                    <View>
                    <Text className = "text-lg text-gray-400">Estimated Arrival</Text>
                    <Text className = "text-4xl font-bold">45-55 minutes</Text>
                </View>
                <Image 
                source = {{
                    uri: "https://links.papareact.com/fls"
                }}
                className = "h-20 w-20"
                />
                </View>
                <Progress.Bar color="#00CCBB" indeterminate = {true}/>
                <Text className = "mt-3 text-gray-500">Your order is being prepared at {restaurant.title}</Text>
                </View>
            </SafeAreaView>

            <MapView initialRegion={
                {
                    latitude: restaurant.lat,
                    longitude : restaurant.long,
                    latitudeDelta : 0.005,
                    longitudeDelta : 0.005,
                }
            }
            mapType="mutedStandard"
            className = "flex-1 -mt-10 z-0"
            >
                {restaurant && (
                <MapViewDirections 
                origin={origin}
                destination= {destination}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={3}
                strokeColor="black"

                />

                )}
                {restaurant && (
                <Marker 
                 coordinate={{
                    latitude: restaurant.lat,
                    longitude : restaurant.long,
                 }}
                 title={restaurant.title}
                 description={restaurant.short_description}
                 identifier="origin"
                 pinColor="#00CCBB"
                />
                )}
                <Marker 
                 coordinate={{
                    latitude: currentLocation.latitude,
                    longitude : currentLocation.longitude,
                 }}
                 title="Your Location"
                 description= "Your current location"
                 identifier="destination"
                 pinColor="#00CCBB"
                />
            </MapView>
            <SafeAreaView className = "bg-white flex-row items-center space-x-5 h-28">
                <Image 
                source={{
                    uri : "https://links.papareact.com/wru"
                }}
                className = "h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
                />
                <View className = "flex-1">
                    <Text className = "text-lg">
                        Aazhmeer
                    </Text>
                    <Text className = "text-gray-400 ">Your Rider</Text>
                </View>
                <Text className = "text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
            </SafeAreaView>
        </View>
     );
}
 
export default DeliveryScreen;