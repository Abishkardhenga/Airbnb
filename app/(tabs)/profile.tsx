import { Button, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { useAuth, useUser } from "@clerk/clerk-expo"
import { Link } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

const profile = () => {
  const { signOut, isSignedIn } = useAuth()
  const { user } = useUser()
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress)
  const [edit, setEdit] = useState(false)
  useEffect(() => {
    if (!user) return
    setLastName(user.lastName)
    setFirstName(user.firstName)
    setEmail(user.emailAddresses[0].emailAddress)
  }, [user])

  const onSaveUser = async () => {}
  const onCaptureImage = async () => {}
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Ionicons title="notification-outline" size={26} />
      </View>
      <Button title="Logout" onPress={() => signOut()} />
      {!isSignedIn && (
        <Link href={"/(modals)/login"}>
          <Text>Login</Text>
        </Link>
      )}
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    justifyContent: "space-between",
  },
  header: {},
})
