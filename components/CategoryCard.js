import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";


const CategoryCard = ({ imgUrl, title }) => {
    
    return (
        <TouchableOpacity className="relative h-30 w-30 mr-2">
            <Image 
            source={{
                uri : imgUrl,
            }}
                className="h-20 w-20 rounded"
            />
            <Text className="absolute bottom-1 left-1 font-bold text-white">{title}</Text>

        </TouchableOpacity>
    );
};

export default CategoryCard;