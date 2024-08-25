import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import React, { memo } from "react"
import { Marker } from "react-native-maps"
import MapView from "react-native-map-clustering"
import { useRouter } from "expo-router"
import { defaulStyles } from "@/constants/Styles"
import { ListingGeoType } from "@/interfaces/listingGeo.type"

interface Props {
  listings: any
}

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 9,
  longitudeDelta: 9,
}

const ListingsMap = memo(({ listings }: Props) => {
  const router = useRouter()

  const onMarkerSelected = (item: ListingGeoType) => {
    console.log("Marker selected:", item)
    router.push(`/listing/${item.properties.id}`)
  }

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster

    const points = properties.point_count
    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        onPress={onPress}
      >
        <View style={styles.marker}>
          <Text style={styles.markerText}>{points}</Text>
        </View>
      </Marker>
    )
  }

  return (
    <View style={defaulStyles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
      >
        {listings.features.map((item: ListingGeoType) => {
          const latitude = +item.properties.latitude
          const longitude = +item.properties.longitude

          // Log to check coordinates
          console.log("Latitude:", latitude, "Longitude:", longitude)

          return (
            <Marker
              key={item.properties.id}
              coordinate={{ latitude, longitude }}
              onPress={() => onMarkerSelected(item)}
            >
              <View style={styles.marker}>
                <Text style={styles.markerText}>€ {item.properties.price}</Text>
              </View>
            </Marker>
          )
        })}
      </MapView>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: "mon-sb",
  },
  locateBtn: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
})

export default ListingsMap
