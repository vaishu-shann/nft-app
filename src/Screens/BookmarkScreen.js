import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    TouchableOpacity,
    ImageBackground,
    FlatList,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";

export default function BookmarkScreen(props) {

    return (
        <View style={{ flex: 1, backgroundColor: "#0F0F0F", padding: 20 }}>

            <Text
              style={{
                color: "#fff",

            }}
            >
              Book Screen
            </Text>
        </View>
    )
}