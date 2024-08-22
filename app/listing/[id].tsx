import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { useGlobalSearchParams } from "expo-router"

const Idpage = () => {
  const { id } = useGlobalSearchParams<{ id: string }>()
  return (
    <View>
      <Text style={{ color: "#000000" }}>Id:{id}</Text>
    </View>
  )
}

export default Idpage

const styles = StyleSheet.create({})
