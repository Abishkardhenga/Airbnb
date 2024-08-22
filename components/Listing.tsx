import { StyleSheet, Text, View } from "react-native"
import React, { useEffect } from "react"

interface props {
  listing: any[]
  category: string
}
const Listing = ({ listing, category }: props) => {
  useEffect(() => {
    console.log("reload listing", listing)
  }, [category])
  return (
    <View>
      <Text>Listing</Text>
    </View>
  )
}

export default Listing

const styles = StyleSheet.create({})
