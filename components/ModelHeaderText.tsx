import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import Colors from "@/constants/Colors"

const ModelHeaderText = () => {
  const [active, setActive] = useState(0)

  return (
    <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
      <TouchableOpacity onPress={() => setActive(0)}>
        <Text
          style={{
            fontFamily: "mon-sb",
            fontSize: 18,
            color: active === 0 ? Colors.grey : Colors.dark,
            textDecorationLine: active === 0 ? "underline" : "none",
          }}
        >
          Stays
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(1)}>
        <Text
          style={{
            fontFamily: "mon-sb",
            fontSize: 18,
            color: active === 1 ? Colors.grey : Colors.dark,
            textDecorationLine: active === 1 ? "underline" : "none",
          }}
        >
          Experience
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ModelHeaderText

const styles = StyleSheet.create({})
