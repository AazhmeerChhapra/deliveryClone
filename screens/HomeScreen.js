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

// import featured from "../deliveryappclone/schemas/featured";





const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [currentLocation, setCurrentLocation] = useState('');
    const userid = route.params?.userid
    const docRef = doc(db, 'users', userid)
    const [searchText, setSearchText] = useState('');

// State to track the current search text at the time of search
const [currentSearchText, setCurrentSearchText] = useState('');
    const [data, setData] = useState([]);
    
    const [featuredCategories, setFeaturedCategories] = useState([]);
    const client = createClient({
        projectId : "1t3r08rj",
        dataset: "production",
        useCdn: true, // set to `false` to bypass the edge cache
        apiVersion: '2023-05-03',
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,

        })
    }, []);
    
// useEffect only used once when componenet is loaded
    useEffect (() => { 
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // console.log("Document data:", docSnap.data().city);
                  } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                  }
                  
                await client.fetch(
                    `*[_type == 'featured'] {
                        ...,
                        restaurants [] -> {
                          ...,
                          dishes [] -> 
                        }
                      }`
                ).then((data) => {
                    setFeaturedCategories(data)
                    

                }).catch((err) => {
                    
                });
            } catch (error) {
                
            }
        
    }
    
    console.log(userid);
    const getLocation = async () => {
        // console.log("hello");
  
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
        global.currentLocation = currentLocation;

        console.log("hwllo", global.currentLocation);
  };
  getLocation();
    fetchData();
}, [])
    
const searchRestaurant = async () => {
    try {
      console.log(searchText);
  
      // Perform the search query
      const query = `*[_type == "restaurant" && name match "${searchText}*"]`;
      const result = await client.fetch(query);
  
      // Update the state only if the searchText matches the current value
      if (searchText === currentSearchText) {
        // Delay for demonstration purposes (replace with your actual logic)
        await new Promise(resolve => setTimeout(resolve, 3000));
  
        // Update the state
        setData(result);
  
        // Navigate to the next screen
        if (result) {
          navigation.navigate("SearchScreen", { data: result, searchedText: searchText });
        }
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };
  const handleSearchTextChange = newText => {
    setSearchText(newText);
  };
  
  // Trigger the search function when the search button is pressed
  const handleSearchButtonPress = () => {
    setCurrentSearchText(searchText);
    searchRestaurant();
  };
  
    
    //safeAreaView makes sure that it give top and below margi
    //UseLayout effect allow us to apply function when screen is rendered
    return (
        <SafeAreaView className=" bg-white pt-5 pb-10">
            {/* Header */}
                <View className="flex-row pb-3 items-center mx-4 space-x-2 ">
                    <Image source={{
                        uri: 'https://links.papareact.com/wru'
                    }}
                        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                    />
                    {/* When we did flex-1 our components got to each side thereby aking most of the area*/}
                    <View className="flex-1">
                        <Text className="font-bold text-gray-400 text-xs">
                            Deliver Now
                        </Text>
                        <Text className="font-bold text-xl ">
                            Current Location
                            <ChevronDownIcon size={20} color="#00CCBB" />
                        </Text>
                    </View>
                    <UserIcon size={35} color="#00CCBB" />
                </View>
                <View className = "flex-row items-center space-x-2 pb-2 mx-4 ">
                    <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3 ">
                        <MagnifyingGlassIcon color="gray" />

                        <TextInput className = "w-44"
  placeholder="Search"
  value={searchText}
  onChangeText={handleSearchTextChange}
/>
<Button title="Search" onPress={handleSearchButtonPress} className = "ml-4"/>
                    </View>
                    <AdjustmentsVerticalIcon color="#00CCBB" />
                </View>
{/* Body */}

<ScrollView className = "bg-gray-100"
contentContainerStyle = {{
    paddingBottom:100,
}}
>
    {/* categories */}
    <Categories />

    {/* Feature Rows */}

{featuredCategories.map((categories) => (
<FeaturedRow key = {categories._id} id = {categories._id} title = {categories.name} description = {categories.short_description} />

))}
{/* <FlatList 
data={featuredCategories}
renderItem={({featured} )
(
<FeaturedRow key = "123" id = "123" title = {featured.name} description = "axss"/>
 
)
}
/> */}



{/* <FeaturedRow 
id = "1234"
title = "Tasty Discounts"
description = "Everyone's been enjoying these juicy discounts"


/>
<FeaturedRow 
id = "12345"
title = "Offers Near you"
description = "Why not support your local restaurant tonight !"


/> */}
</ScrollView>
     
        </SafeAreaView>
    );
}

export default HomeScreen;