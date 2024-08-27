import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { defaulStyles } from "@/constants/Styles"
import { Link } from "expo-router"
import { ListingType } from "@/interfaces/listing.type"
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated"
import { Ionicons } from "@expo/vector-icons"
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet"

interface props {
  listing: ListingType[]
  category: string
  refresh: number
}
const Listing = ({ listing, category, refresh }: props) => {
  console.log("listin", listing)
  const [loading, setLoading] = useState(false)
  const listRef = useRef<BottomSheetFlatListMethods>(null)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [category])

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      })
    }
  }, [refresh])
  const renderRow: ListRenderItem<ListingType> = ({ item }) => {
    console.log("item", item) // Ensure this logs the item correctly
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <Animated.View
            style={styles.listing}
            entering={FadeInRight}
            exiting={FadeOutLeft}
          >
            <Image source={{ uri: item.medium_url! }} style={styles.image} />
            <TouchableOpacity
              style={{ position: "absolute", right: 30, top: 30 }}
            >
              <Ionicons name="heart-outline" size={24} color={"#000"} />
            </TouchableOpacity>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontFamily: "mon-sb", fontSize: 16 }}>
                {item.name}
              </Text>
              <View style={{ flexDirection: "row", gap: 4 }}>
                <Ionicons name="star" size={14} color={"#000"} />
                <Text style={{ fontFamily: "mon-sb" }}>
                  {item.review_scores_rating! / 20}
                </Text>
              </View>
            </View>
            <Text style={{ fontFamily: "mon-sb" }}>{item.room_type}</Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={{ fontFamily: "mon-sb" }}>${item.price}</Text>
              <Text style={{ fontFamily: "mon" }}>night</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    )
  }

  return (
    <View style={defaulStyles.container}>
      <BottomSheetFlatList
        ref={listRef}
        data={loading ? [] : listing}
        keyExtractor={(item) => item.id}
        renderItem={renderRow}
        ListHeaderComponent={
          <Text style={styles.info}>{listing.length} homes</Text>
        }
      />
    </View>
  )
}

export default Listing

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    height: 300,
    width: "100%",
    borderRadius: 10,
  },
  info: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
    marginTop: 4,
  },
})
