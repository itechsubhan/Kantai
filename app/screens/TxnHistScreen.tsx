import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ViewStyle } from "react-native"
import { AppStackScreenProps, DashBoardTabScreenProps } from "app/navigators"
import { ListItem, Screen, Text } from "app/components"
import { spacing } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface TxnHistScreenProps extends AppStackScreenProps<"TxnHist"> {}

const transactionData = [
  { id: "1", title: "Payment received", amount: "+$50.00" },
  { id: "2", title: "Purchase at Store XYZ", amount: "-$30.00" },
  { id: "3", title: "Transfer to John Doe", amount: "-$20.00" },
  // Add more transactions as needed
]

export const TxnHistScreen: FC<DashBoardTabScreenProps<"TxnHist">> = observer(
  function TxnHistScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="scroll" safeAreaEdges={["top", "bottom"]}>
        <Text text="Transaction History for the app data" size="xxl"/>
        <FlatList
          data={transactionData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <ListItem topSeparator bottomSeparator leftIcon="ladybug">
                {item.title}
              </ListItem>
              <ListItem topSeparator bottomSeparator>
               <Text> Amount  : </Text> {item.amount}
              </ListItem>
            </>
          )}
        />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
