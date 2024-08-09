import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import BookmarkScreen from "../Screens/BookmarkScreen";
import { CustomTab } from "../utils/CustomTab";
import DetailViewScreen from "../Screens/DetailViewScreen";

const Stack = createStackNavigator();

export default function App() {

    const tabs = {
        MyTabs: CustomTab,
    };
    const tabsInner = {
        HomeScreen: HomeScreen,
        BookmarkScreen: BookmarkScreen,
        DetailViewScreen: DetailViewScreen
    }

    function BottomTab() {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {Object.entries({
                    ...tabs,
                    ...tabsInner,
                }).map(([name, component]) => (
                    <Stack.Screen key={name} name={name} component={component} />
                ))}
            </Stack.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={"BottomTab"} component={BottomTab} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

