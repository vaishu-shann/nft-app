
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
import { getEllipsisTxt } from "../utils/formatter";

export default function DetailViewScreen({ navigation, route }) {
    const { item } = route.params;
    const nft = item;

    // const firstFiveFeature = attributes.slice(0, 5).map(attribute => attribute.value).join(',');

    const firstFiveValues = nft?.nft_data?.external_data?.attributes?.slice(0, 5).map(attribute => attribute.value).join(', ');
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
                        {nft?.nft_data?.external_data?.name}
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <Image
                    source={{ uri: nft?.nft_data?.external_data?.image }}
                    style={styles.NFTImage}
                    resizeMode="cover"
                />
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 30, width: "95%" }} >
                    <Image
                        source={images.deLogo}
                        style={styles.deImageLogo}
                        resizeMode="cover"
                    />
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', width: '80%' }}>
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 15 }}>
                            <Text style={styles.nftName}>
                                {nft?.contract_name}
                            </Text>
                            <Text style={styles.ownerName}>
                                By{" "}
                                <Text style={styles.span}>
                                    {getEllipsisTxt(nft?.nft_data?.current_owner, 5)}
                                </Text>
                            </Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Text style={styles.spanPrice}>
                                1.469 ETH
                            </Text>
                            <Text style={styles.PriceText}>
                                $3,798.19
                            </Text>

                        </View>
                    </View>
                </View>

                <Text style={styles.DescriptionText}>
                    {nft?.nft_data?.external_data?.description}
                </Text>

                <View  style={styles.attributeContainer}>
                    <Text style={styles.attributeField}>Attributes: {" "}<Text style={styles.attributeFieldtext}>{firstFiveValues}</Text> </Text>
                            
                        </View>


                
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
        width: 25,
        height: 25
    },
    BackText: {
        fontSize: 24,
        fontWeight: "600",
        marginLeft: 10,
        color: '#fff'
    },
    NFTImage: {
        width: "95%",
        height: 375,
        borderRadius: 20,
        marginTop: 50
    },
    nftName: {
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",

        textAlign: 'center'
    },
    ownerName: {
        fontSize: 16,
        fontWeight: "400",
        color: "#ccc",
        marginTop: 4,
        textAlign: 'center'

    },
    span: {
        color: "#D162EC",
        marginLeft: 5,
        letterSpacing: 0.5,
    },
    DescriptionText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: "#fff",
        marginTop: 15,
        lineHeight: 26,
        textAlign: 'left',
        letterSpacing: 0.5,

    },
    PriceText: {
        fontSize: 14,
        fontWeight: 'normal',
        color: "#cccccc",
        paddingTop: 8,
    },
    spanPrice: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
    },
    ctaBookmark: {
        backgroundColor: '#D162EC',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15,
        paddingTop: 15,
        borderRadius: 4,
        marginTop: 30,
        width:'100%',
    },
    ctaText: {
        fontSize: 16,
        fontWeight: "500",
        textAlign:'center',
        color:'#fff'
    },
    deImageLogo: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    attributeField:{
        fontSize: 15,
        fontWeight: "500",
        color: "#fff",
        marginTop:10,
        lineHeight:24
    },
    attributeFieldtext:{
        fontSize: 14,
        fontWeight: 'normal',
        color: "#cccccc",
    }
})