import { StyleSheet, Text, View } from "react-native"
import React, { useMemo, useState } from "react"
import { Link, Stack } from "expo-router"
import ExploreHeader from "@/components/ExploreHeader"
import Listing from "@/components/Listing"
import ListingData from "@/assets/data/airbnb-listings.json"
import ListingDataGeo from "@/assets/data/airbnb-listings.geo.json"
import ListingMaps from "@/components/ListingMaps"

const Page = () => {
  const [category, setCategory] = useState<string>("Tiny Homes")
  const items = useMemo(() => ListingData as any, [])
  const onDataChanged = (category: string) => {
    console.log("catrgory", category)
    setCategory(category)
  }
  return (
    <View style={{ flex: 1, marginTop: 130 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      {/* <Listing listing={items} category={category} /> */}
      <ListingMaps listings={ListingDataGeo} />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})
