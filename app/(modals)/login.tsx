import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React from "react"
import useWarmUpBrowser from "@/hooks/useWarmUpBrowser"
import { defaulStyles } from "@/constants/Styles"
import Colors from "@/constants/Colors"
import Ionicons from "@expo/vector-icons/Ionicons"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import AntDesign from "@expo/vector-icons/AntDesign"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useOAuth } from "@clerk/clerk-expo"
import { router } from "expo-router"
enum Strategy {
  GOOGLE = "oauth_google",
  APPPLE = "oauth_apple",
  FACEBOOK = "oauth_facebook",
}

const login = () => {
  useWarmUpBrowser()
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" })
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" })
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  })

  const onSelectOauth = async (strategy: Strategy) => {
    const SelectedOauth = {
      [Strategy.GOOGLE]: googleAuth,
      [Strategy.APPPLE]: appleAuth,
      [Strategy.FACEBOOK]: facebookAuth,
    }[strategy]
    try {
      const { createdSessionId, setActive } = await SelectedOauth()
      console.log("created session id", createdSessionId)
      if (createdSessionId) {
        setActive!({ session: createdSessionId })
        router.back()
      }
    } catch (err) {
      console.log("oauth error", err)
    }
  }
  return (
    <View style={styles.contaier}>
      <TextInput
        autoCapitalize="none"
        placeholder="email"
        style={[defaulStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={[defaulStyles.btn]}>
        <Text style={defaulStyles.btnText}>login</Text>
      </TouchableOpacity>
      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>OR</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
      <View style={{ gap: 20 }}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons
            name="call-outline"
            size={24}
            color="black"
            style={defaulStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectOauth(Strategy.APPPLE)}
        >
          <FontAwesome5
            name="apple"
            size={24}
            color="black"
            style={defaulStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectOauth(Strategy.GOOGLE)}
        >
          <AntDesign
            name="google"
            size={24}
            color="black"
            style={defaulStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectOauth(Strategy.FACEBOOK)}
        >
          <FontAwesome
            name="facebook-official"
            size={24}
            color="black"
            style={defaulStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default login

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  seperator: {
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
})
