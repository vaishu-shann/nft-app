import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    ScrollView,
    Button
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { images } from "../assets/images";


export default function DetailViewScreen({ navigation, route }) {

    return (

        <View style={{ flex: 1, backgroundColor: "#0F0F0F", padding: 20 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.backRoute}>
                    <Image
                        source={images.backIcon}
                        style={styles.backImage}
                        resizeMode="contain"
                    />
                    <Text
                        style={styles.BackText}
                    >
                        Detail View Screen
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={images.sample1}
                    style={styles.NFTImage}
                    resizeMode="cover"
                />
              
                <Text style={styles.nftName}>
                    NFT Name Here
                </Text>
                <Text style={styles.ownerName}>
                    Owned by{" "}
                    <Text style={styles.span}>
                        GrayWOLF03
                    </Text>
                </Text>
                <Text style={styles.DescriptionText}>
                    10,000 of the most degenerate and Unique Gods in the NFT universe.
                </Text>
                <Text style={styles.PriceText}>
                   Current Price :{" "}
                   <Text style={styles.spanPrice}>
                   1.469 ETH {" "}
                    </Text>
                    <Text style={styles.PriceText}>
                    $3,798.19
                    </Text>
                </Text>

                <TouchableOpacity style={styles.ctaBookmark}>
                   <Text style={styles.ctaText}> Add to Bookmark</Text> 
                </TouchableOpacity>
                </View>
        </View>

    )
}
const styles = StyleSheet.create({
    containerOverall: {
        marginBottom: 60
    },
    backRoute: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20

    },
    backImage: {
        width: 30,
        height: 30
    },
    BackText: {
        fontSize: 20,
        fontWeight: "600",
        marginLeft: 10
    },
    NFTImage: {
        width: 300,
        height: 300,
        borderRadius: 4,
        marginTop: 50
    },
    nftName: {
        fontSize: 24,
        fontWeight: "700",
        color: "#fff",
        marginTop: 25,
        textAlign:'center'
    },
    ownerName: {
        fontSize: 16,
        fontWeight: "400",
        color: "#ccc",
        marginTop: 10,
        textAlign:'center'

    },
    span: {
        color: "#D162EC",
        marginLeft: 5
    },
    DescriptionText: {
        fontSize: 14,
        fontWeight: 'normal',
        color: "#cccccc",
        paddingTop: 8,
        lineHeight: 24,
        textAlign:'center',
letterSpacing:0.2
    },
    PriceText:{
        fontSize: 14,
        fontWeight: 'normal',
        color: "#cccccc",
        paddingTop: 8,
    },
    spanPrice:{
        fontSize: 30,
        fontWeight:"700",
        color: "#fff",
    },
    ctaBookmark:{
        backgroundColor:'#D162EC',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius:4,
        marginTop:30
    },
    ctaText:{
        fontSize:14,
        fontWeight:"600"
    }
})