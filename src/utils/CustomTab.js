import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text,
} from "react-native";
import * as React from "react";
import { useTheme } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

import { icons } from "../Assets/icons";
import HomeScreen from "../Screens/HomeScreen";
import BookmarkScreen from "../Screens/BookmarkScreen";
import DetailViewScreen from "../Screens/DetailViewScreen";

export const CustomTab = () => {
  const { colors } = useTheme();

  return (
    <>

      <Tab.Navigator

        initialRouteName={HomeScreen}
        screenOptions={{
          showLabel: true,
          activeTintColor: "#fff",
          inactiveTintColor: "rgb(221, 68, 185)",
          headerShown: false,
          tabBarActiveTintColor: "rgb(221, 68, 185)",
          tabBarInactiveTintColor: "#A6A6A6",
          tabBarShowLabel: true,
          tabBarStyle: {
            display: "flex",
            backgroundColor: "#202020",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderTopColor: "#202020",
            height: 78,
            paddingBottom: 40,
            position: "absolute",

          },
          tabBarLabelStyle: {
            fontSize: 14,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarColor: "white",

          }}
        />



        {/* <Tab.Screen
          name="Detail View"
          component={DetailViewScreen}
          options={{
            tabBarLabel: "Detail View",
            tabBarColor: "white",

          }}
        /> */}

        <Tab.Screen
          name="Bookmark"
          component={BookmarkScreen}
          options={{
            tabBarLabel: "Bookmark",
            tabBarColor: "white",

          }}
        />
      </Tab.Navigator>
    </>
  );
};

