/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { StatusBar, useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { DashboardNavigator, DashboardNavigatorParamList } from "./DashboardNavigator"
import { useStores } from "app/models"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  // 🔥 Your screens go here
  UserSettings: undefined
  AirWallex: undefined
  ChargingStations: undefined
  TxnHist: undefined
  TxnDetails: undefined
  Logout: undefined
  Dashboard: NavigatorScreenParams<DashboardNavigatorParamList>
  Login: undefined
  SignUp: undefined
	// IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  // hiding status bar
StatusBar.setHidden(true);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={isAuthenticated ? "Welcome" : "Login"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
          <Stack.Screen name="Dashboard" component={DashboardNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
          <Stack.Screen name="SignUp" component={Screens.SignUpScreen} />
        </>
      )}

      {/** 🔥 Your screens go here */}
      {/* <Stack.Screen name="UserSettings" component={Screens.UserSettingsScreen} /> */}
      {/* <Stack.Screen name="AirWallex" component={Screens.AirWallexScreen} /> */}
      {/* <Stack.Screen name="ChargingStations" component={Screens.ChargingStationsScreen} /> */}
      {/* <Stack.Screen name="TxnHist" component={Screens.TxnHistScreen} /> */}
      {/* <Stack.Screen name="TxnDetails" component={Screens.TxnDetailsScreen} /> */}

      {/* <Stack.Screen name="Login" component={Screens.LoginScreen} /> */}
      {/* <Stack.Screen name="SignUp" component={Screens.SignUpScreen} /> */}
			{/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
