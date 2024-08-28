import { StyleSheet, View } from "react-native"
import React, { useMemo, useState } from "react"
import { Stack } from "expo-router"
import ExploreHeader from "@/components/ExploreHeader"
import ListingBottomSheet from "@/components/ListingBottomSheet"
import ListingMaps from "@/components/ListingMaps"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import ListingData from "@/assets/data/airbnb-listings.json"
import ListingDataGeo from "@/assets/data/airbnb-listings.geo.json"
const Page = () => {
  const [category, setCategory] = useState<string>("Tiny Homes")
  const [showMap, setShowMap] = useState<boolean>(false)
  const items = useMemo(() => ListingData as any, [])
  const geoData = useMemo(() => ListingDataGeo as any, [])

  const onDataChanged = (category: string) => {
    console.log("category", category)
    setCategory(category)
  }

  const toggleMap = () => {
    setShowMap(!showMap)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, marginTop: 65 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <ListingMaps listings={geoData} />

      <ListingBottomSheet listings={items} category={category} />
    </GestureHandlerRootView>
  )
}

export default Page

const styles = StyleSheet.create({})
