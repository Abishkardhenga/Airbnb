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
import { Ionicons } from "@expo/vector-icons"

interface props {
  listing: any[]
  category: string
}
const Listing = ({ listing: ListingItems, category }: props) => {
  const [loading, setLoading] = useState(false)
  const listRef = useRef<FlatList>(null)
  useEffect(() => {
    console.log("reload listing", ListingItems.length)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [category])
  const renderRow: ListRenderItem<ListingType> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <View style={styles.listing}>
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
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontFamily: "mon-sb" }}>${item.price}</Text>
            <Text style={{ fontFamily: "mon" }}>night</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  )
  return (
    <View style={defaulStyles.container}>
      <FlatList
        ref={listRef}
        data={loading ? [] : ListingItems}
        keyExtractor={(item) => item.id}
        renderItem={renderRow}
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
})
