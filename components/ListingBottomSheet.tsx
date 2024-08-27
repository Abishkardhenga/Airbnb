import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { useMemo, useRef, useState } from "react"
import BottomSheet from "@gorhom/bottom-sheet"
import Listings from "./Listing"
import { Ionicons } from "@expo/vector-icons"
import Colors from "@/constants/Colors"
import { ListingType } from "@/interfaces/listing.type"

interface Props {
  listings: ListingType[]
  category: string
}

// Bottom sheet that wraps our Listings component
const ListingsBottomSheet = ({ listings, category }: Props) => {
  const snapPoints = useMemo(() => ["80%", "10%"], [])
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [refresh, setRefresh] = useState<number>(0)

  const onShowMap = () => {
    bottomSheetRef.current?.collapse()
    setRefresh(refresh + 1)
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      style={styles.sheetContainer}
    >
      <View style={styles.contentContainer}>
        <Listings listing={listings} refresh={refresh} category={category} />
        <View style={styles.absoluteView}>
          <TouchableOpacity onPress={onShowMap} style={styles.btn}>
            <Text style={{ fontFamily: "mon-sb", color: "#fff" }}>Map</Text>
            <Ionicons
              name="map"
              size={20}
              style={{ marginLeft: 10 }}
              color={"#fff"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  absoluteView: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    marginHorizontal: "auto",
    alignItems: "center",
  },
  sheetContainer: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
})

export default ListingsBottomSheet
