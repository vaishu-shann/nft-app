import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  Image
} from "react-native";
import * as React from "react";
import { useTheme } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

import HomeScreen from "../Screens/HomeScreen";
import BookmarkScreen from "../Screens/BookmarkScreen";
import { images } from "../assets/images";

export const CustomTab = () => {

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
            paddingBottom: 0,
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
            tabBarLabel: "",
            tabBarColor: "white",

            tabBarIcon: ({ focused }) => (
              <View style={{}}>
                <Image
                  source={focused ? images.homeClrL : images.homeWhite}
                  style={{
                    height: 30,
                    width: 30,
                    resizeMode: "contain",
                  }}
                />
              </View>
            ),
          }}
        />


        <Tab.Screen
          name="Bookmark"
          component={BookmarkScreen}
          options={{
            tabBarLabel: "",
            tabBarColor: "white",
            tabBarIcon: ({ focused }) => (
              <View style={{}}>
                <Image
                  source={focused ? images.bookmarkClr : images.bookmarkWhite}
                  style={{
                    height: 25,
                    width: 25,
                    resizeMode: "contain",
                  }}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

