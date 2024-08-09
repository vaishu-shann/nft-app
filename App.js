import * as React from "react";
import { SafeAreaView, View,  LogBox } from "react-native";
import RootNavigator from "./src/RootNavigation"


export default function App(props) {

  React.useEffect(() => {
    LogBox.ignoreAllLogs(true);

  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffff" }}>

      <View style={{ flex: 1 }}>
        <RootNavigator/>
      </View>
 
    </SafeAreaView>
  );
}
