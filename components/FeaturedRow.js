import { View, Text, ScrollView } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/solid";
import RestaurantCards from "./RestaurantCards";
import { useState, useEffect } from "react";
import { createClient } from "@sanity/client";



const FeaturedRow = ({id,title, description}) => {

    const [restaurants, setRestaurants] = useState([]);
    const client = createClient({
        projectId : "1t3r08rj",
        dataset: "production",
        useCdn: true, // set to `false` to bypass the edge cache
        apiVersion: '2023-05-03',
    })

    useEffect (() => { 
        const fetchData = async () => {
            try {
                await client.fetch(
                    `*[_type == 'featured' && _id == $id] {
                        ...,
                        restaurants [] -> {
                          ...,
                          dishes [] ->,
                          categories [] ->{
                          name
                          }
                        },
                      } [0]
                      ` , 
                      { id}
                ).then((data) => {
                    setRestaurants(data.restaurants)

                }).catch((err) => {
                    
                });
            } catch (error) {
                
            }
        
    }

    fetchData();
}, [])
console.log(restaurants);
    return (  
        <View>
        <View className = "mt-4 flex-row items-center justify-between px-4">
            <Text className = "font-bold text-lg">{title}</Text>
            <ArrowRightIcon color = "#00CCBB" />
        </View>
        <Text className = "text-xs text-gray-500 px-4">{description}</Text>
        <ScrollView 
        contentContainerStyle = {{
            paddingHorizontal : 15,
        }}
        horizontal 
        showsHorizontalScrollIndicator = {false}
        className = "pt-4"
        >
{/* Restaurant cards... */}
{restaurants.map((restaurant) =>{
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

{/* <RestaurantCards 
 id = {123}
 imgUrl = "https://links.papareact.com/gn7"
 title = "Nandos"
 rating = {4.5}
 genre = "Fast food"
 address = "Lahoree"
 short_description = "This is a test description"
 dishes = {[]}
 long = {20}
 lat = {0}

/>
<RestaurantCards 
 id = {123}
 imgUrl = "https://links.papareact.com/gn7"
 title = "Nandos"
 rating = {4.5}
 genre = "Fast food"
 address = "Lahoree"
 short_description = "This is a test description"
 dishes = {[]}
 long = {20}
 lat = {0}

/> */}
        </ScrollView>
        </View>
    );
}
 
export default FeaturedRow;