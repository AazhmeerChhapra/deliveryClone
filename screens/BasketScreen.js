import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import basketSlice, { removeFromBasket, selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useDebugValue } from "react";
import { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/solid";
import { useLayoutEffect } from "react";
import { urlFor } from "../sanity";
import PreparingOrderScreen from "./PrepareOrderScreen";




// useMemo make sure that if an item is not unique it is displayed in group and not again and again
const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal)
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {})
        setGroupedItemsInBasket(groupedItems);
    }, [items])

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 bg-gray-100">
                <View className=" pb-3 border-b border-[#00CCBB] bg-white shadow-xs">
                    <View>
                        <Text className="text-lg font-bold text-center">Basket</Text>
                        <Text className="text-center text-gray-400">{restaurant.title}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className=" bg-gray-100 rounded-full absolute top-3 right-5">
                        <XCircleIcon size={20} color="#00CCBB" height={50} width={50} />


                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
                    <Image
                        source={{
                            uri: "https://links.papareact.com/wru",
                        }}
                        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                    />
                    <Text className="flex-1">Deliver in 50-75 min</Text>
                    <TouchableOpacity>
                        <Text className="text-[#00CCBB] ">Change</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView className = "divide-y divide-gray-200">
                    {Object.entries(groupedItemsInBasket).map(([key, items]) => {
                        return (
                            <View key={key} className = "flex-row items-center space-x-3 bg-white py-2 px-5">
                                <Text >{items.length} x</Text>
                                <Image
                                    source={{
                                        uri: urlFor(items[0]?.image).url()
                                    }}
                                    className="h-12 w-12 rounded-full"
                                />
                                <Text className="flex-1">{items[0]?.name}</Text>
                                <Text className = "text-gray-600">Rs {items[0]?.price}</Text>
                                <TouchableOpacity>
                                    <Text 
                                    className = "text-[#00CCBB] text-xs"
                                    onPress={() => dispatch(removeFromBasket({id: key}))}
                                    >
                                        Remove
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>
                <View className = "p-5 bg-white mt-5 space-y-4">
                    <View className = "flex-row justify-between">
                        <Text className = "text-gray-400">SubTotal</Text>
                        <Text className = "text-gray-400">Rs {basketTotal}</Text>
                    </View>
                    <View className = "flex-row justify-between">
                        <Text className = "text-gray-400">Delivery Fees</Text>
                        <Text className = "text-gray-400">Rs 100</Text>
                    </View>
                    <View className = "flex-row justify-between">
                        <Text>Order Total</Text>
                        <Text className = "font-extrabold">Rs {basketTotal + 100}</Text>
                    </View>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate("PreparingOrderScreen")}
                    className = "rounded-lg bg-[#00CCBB] p-4">
                        <Text className = "text-white text-center text-lg font-bold">
                            Place Order
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default BasketScreen;