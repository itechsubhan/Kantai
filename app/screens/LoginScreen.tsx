import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps, navigate } from "../navigators"
import { colors, spacing } from "../theme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("")
    setAuthPassword("")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // TODO: Make a request to your server to get an authentication token.

    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
  }
  function goToSignUp() {
      navigate("SignUp")
  }
  function googleAuth() {
    // https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/65894a736d977d41ef2e
  }
  function facebookAuth() {
    
    // https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/facebook/65894a736d977d41ef2e
  }

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

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="app-name" text="Kantai" preset="heading" style={$appName} />
      <Text testID="login-heading" text="Let's sign in" preset="heading" style={$signIn} />
      <Text text="Enter your credentials" preset="subheading" style={$enterDetails} />
      {attemptsCount > 2 && <Text text="loginScreen.hint" size="sm" weight="light" style={$hint} />}

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
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        text="Sign In"
        style={$tapButton}
        preset="reversed"
        onPress={login}
      />
      <Text text="No account, Lets Get you set up" preset="subheading" style={$enterDetails} />
      <Button
        testID="signUpRoute"
        text="Sign Up"
        style={$tapButton}
        preset="reversed"
        onPress={goToSignUp}
        />
      <Button
        testID="googleAuth"
        text="Sign up with Google"
        onPress={googleAuth}
      />
      <Button
        testID="facebookAuth"
        text= "Sign up with Facebook"
        onPress={facebookAuth}
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $appName: TextStyle = {
  paddingTop: spacing.xxxl,
  fontSize: 80,
  marginBottom: spacing.xl,
  fontWeight: "900",
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}
