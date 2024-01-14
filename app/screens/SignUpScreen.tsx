import React, { ComponentType, FC, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "app/components"
import { colors, spacing } from "../theme"
import { useStores } from "app/models"
import { appwriteAuthService } from "app/services/appwrite/appwriteAuthService"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> {}

export const SignUpScreen: FC<SignUpScreenProps> = observer(function SignUpScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const authPasswordInput = useRef<TextInput>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  const error = isSubmitted ? validationError : ""

  function signup() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // TODO: Make a request to your appwrite to have signup function triggered.
    appwriteAuthService.createAccount({ email: authEmail, password: authPassword, name: firstName + " " +lastName })

    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
  }

  // function for Hide and unhide password

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen
      style={$root}
      preset="scroll"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text text="signUp" preset="heading" style={$signUpHeading} />
      <Text text="Enter your info" preset="subheading" style={$enterDetails} />
      <TextField
        placeholder="First Name"
        value={firstName}
        label="First Name"
        containerStyle={$textField}
        onChangeText={setFirstName}
        autoCapitalize="none"
        keyboardType="default"
        returnKeyType="next"
        onSubmitEditing={() => authPasswordInput.current?.focus()}
        blurOnSubmit={false}
      />
      <TextField
        placeholder="Last Name"
        label="Last Name"
        value={lastName}
        containerStyle={$textField}
        onChangeText={setLastName}
        autoCapitalize="none"
        keyboardType="default"
        returnKeyType="next"
        onSubmitEditing={() => authPasswordInput.current?.focus()}
        blurOnSubmit={false}
      />

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        label="email"
        placeholder="enter your email"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        label="password"
        placeholder="enter your password"
        onSubmitEditing={signup}
        RightAccessory={PasswordRightAccessory}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        label="confirm your password"
        placeholder="enter your password"
        onSubmitEditing={signup}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="signup-button"
        text="Sign Up"
        style={$tapButton}
        preset="reversed"
        onPress={signup}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}
const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
const $signUpHeading: TextStyle = {
  marginBottom: spacing.sm,
}
const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}
