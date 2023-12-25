import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Image, TextInput, ScrollView, FlatList , Button} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    UserIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    AdjustmentsVerticalIcon,

} from "react-native-heroicons/solid"
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import { SanityClient, createClient } from "@sanity/client";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "./firebase";
import * as Location from "expo-location";
import RestaurantCards from "../components/RestaurantCards";

const SearchScreen = () => {
    const route = useRoute();
    const data = route.params?.data;
    const searchedText = route.params?.searchedText;



    return(
    <SafeAreaView className=" bg-white pb-10">
    {/* Heade */}
    <Text className = "font-bold text-xl mb-6">Your Searched Restaurant is {searchedText}
    </Text>


        <ScrollView className = "bg-gray-100 ml-5"
contentContainerStyle = {{
    paddingBottom:100,
}}
>

{data.map((restaurant) =>{
    console.log(restaurant.name);
    return(
    
    <RestaurantCards 
    key={restaurant._id}
    id = {restaurant._id}
    imgUrl = {restaurant.image}
    title = {restaurant.name}
    rating = {restaurant.rating}
    category = {restaurant._type}
    address = {restaurant.address}
    short_description = {restaurant.short_description}
    dishes = {restaurant.dishes}
    long = {restaurant.long}
    lat = {restaurant.lat}
   
   />
    );
})}
</ScrollView>

        </SafeAreaView>
         );
}

export default SearchScreen;