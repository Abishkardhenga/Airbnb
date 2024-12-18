import { useFonts } from "expo-font"
import { Stack, useRouter } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { TouchableOpacity } from "react-native"
import AntDesign from "@expo/vector-icons/AntDesign"
import "react-native-reanimated"
import * as SecureStore from "expo-secure-store"
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo"
import ModelHeaderText from "@/components/ModelHeaderText"
import Colors from "@/constants/Colors"

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)

      return item
    } catch (error) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <RootLayoutNav />
      </ClerkLoaded>
    </ClerkProvider>
  )
}

function RootLayoutNav() {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/(modals)/login")
    }
  }, [isLoaded])
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="(modals)/login"
        options={{
          title: "Login or SignUp",
          presentation: "modal",
          headerTitleStyle: {
            fontFamily: "mon-sb",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="listing/[id]"
        options={{ headerTransparent: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          animation: "fade",
          presentation: "transparentModal",
          headerTransparent: true,
          headerTitle: () => <ModelHeaderText />,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                borderColor: Colors.grey,
                backgroundColor: "#fff",
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
              }}
              onPress={() => router.back()}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  )
}
