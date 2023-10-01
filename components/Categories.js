import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import CategoryCard from "./CategoryCard";
import { createClient } from "@sanity/client";
import { urlFor } from "../sanity";





const Categories = () => {
    const [categories, setCategories] = useState([]);
    const client = createClient({
        projectId : "1t3r08rj",
        dataset: "production",
        useCdn: true, // set to `false` to bypass the edge cache
        apiVersion: '2023-05-03',
    })

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                await client.fetch(
                    `
                    *[_type == "category"]
                    `
                ).then((data) =>{
                    setCategories(data);
                })
            } catch (error) {
                
            }
        }
        fetchData();
    }, []);

    return (

        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}

        >
            {/* Category card */}
            {categories.map((category) => {
                return(
                 <CategoryCard
                 key={category._id}
                 imgUrl={urlFor(category.image).width(200).url()}
                 title={category.title}
                 />
                )

})}
            

        </ScrollView>
    );
}

export default Categories;