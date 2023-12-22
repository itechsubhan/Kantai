import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { DashBoardTabScreenProps, DashboardNavigatorParamList } from "app/navigators"
// import { spacing } from "app/theme"
import { RouteProp, useRoute } from "@react-navigation/native"
import { Screen, Text } from "app/components"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { mapJson } from "./MapsData"
import { StatusBar } from "expo-status-bar"
// import { useStores } from "app/models"

// interface ChargingStationsScreenProps extends AppStackScreenProps<"ChargingStations"> {}
export const ChargingStationsScreen: FC<DashBoardTabScreenProps<"ChargingStations">> = observer(
  function ChargingStationsScreen(_props) {
    const route = useRoute<RouteProp<DashboardNavigatorParamList, "ChargingStations">>()
    const params = route.params

    // handle Web links
    React.useEffect(() => {
      if (params !== undefined && Object.keys(params).length > 0) {
        console.log("params are more than one :", params)
      }
    }, [params])
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
      longitude: 148.11,
      latitude: -26.85,
    })

    // const showLocationsOfInterest = () => {
    //   return locationsOfInterest.map((item, index) => {
    //     return (
    //       <Marker
    //         key={index}
    //         coordinate={item.location}
    //         title={item.title}
    //         description={item.description}
    //       />
    //     )
    //   })
    // }

    return (
      <Screen style={$root} preset="fixed" safeAreaEdges={["top", "bottom"]}>
        <View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={$screenContentContainer}
            // initialRegion={{
            //   latitude: -26.852691607783505,
            //   latitudeDelta: 27.499085419977938,
            //   longitude: 148.1104129487327,
            //   longitudeDelta: 15.952148000000022,
            // }}
            customMapStyle={mapJson}
          >
            {/* {showLocationsOfInterest()} */}
            <Marker
              draggable
              pinColor="#de5745"
              coordinate={draggableMarkerCoord}
              onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
            />
            {/* <Text style={$mapOverlay}>
              Longitude: {draggableMarkerCoord.longitude}, latitude: {draggableMarkerCoord.latitude}
            </Text> */}
          </MapView>
          <StatusBar style="auto" />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $screenContentContainer: ViewStyle = {
  width: "100%",
  height: "100%",
}
