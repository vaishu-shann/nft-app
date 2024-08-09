import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";
import React, {  useState,useLayoutEffect } from "react";
import { images } from "../assets/images"
import { fetchData } from "../Services/APIManager";
import { getEllipsisTxt } from "../utils/formatter";


export default function HomeScreen({ navigation, route }) {

    const [nftData, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useLayoutEffect(() => {
        fetchNFTData();
    }, [loading]);

    const fetchNFTData = async () => {
        const API_res = await fetchData();
        // console.log("API_res", API_res?.data?.items)
        if (!API_res) {
            setError(true)
        }
        setData(API_res?.data?.items)
        setLoading(false)
    }

    return (
        <ScrollView style={styles.containerOverall}>
            <View style={{ flex: 1, backgroundColor: "#0F0F0F", padding: 20 }}>

                <Image
                    source={images.logo}
                    style={styles.LogoImage}
                    resizeMode="contain"
                />
                  <Image
                    source={images.homeBanner}
                    style={styles.BannerImage}
                    resizeMode="cover"
                />
                <View style={{marginTop:30}}>
                    <Text style={styles.headerText}>
                        Explore, Buy and sell World
                    </Text>
                    <Text style={styles.DescriptionText}>
                        Non-fungible tokens, or NFTs, are artworks created on the
                        blockchain with unique encryption codes
                        that can be validated for ownership.
                    </Text>
                </View>

              
                <Text style={styles.subheaderText} >
                      Collections
                    </Text>

                <View style={styles.nftContainer}>
                    {nftData?.map((nft) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('DetailViewScreen', { item: nft })}>
                                <View key={nft?.nft_data?.token_id} style={styles.singleNFT}>
                                    {nft?.nft_data?.external_data?.image ? <Image
                                        source={{ uri: nft?.nft_data?.external_data?.image }}
                                        style={styles.NFTImage}
                                        resizeMode="contain"
                                    /> :
                                        <Image
                                            source={images.noImageAvailable}
                                            style={styles.NFTImage}
                                            resizeMode="contain"
                                        />
                                    }
                                    <View style={styles.nftData}>
                                        <Text style={styles.nftName}>
                                            {nft?.nft_data?.external_data?.name ? nft?.nft_data?.external_data?.name : '--'}
                                        </Text>

                                        <View style={styles.bookmarkFlex}>
                                            <Text style={styles.nftPrice}>
                                                {getEllipsisTxt(nft?.nft_data?.current_owner, 8)}
                                            </Text>

                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}

                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerOverall: {
        marginBottom: 60
    },
    LogoImage: {
        height: 100,
        width: 100
    },
    headerText: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#fff",

    },
    subheaderText:{
        fontSize: 26,
        fontWeight: "bold",
        color: "#fff",
        marginTop:30
    },
    DescriptionText: {
        fontSize: 14,
        fontWeight: 'normal',
        color: "#cccccc",
        paddingTop: 15,
        lineHeight: 24
    },
    BannerImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginTop: 10
    },
    nftContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 15

    },
    singleNFT: {
        // borderWidth: 1,
        // borderColor: "#D162EC",

        borderRadius: 4,
        marginBottom: 30,

    },
    nftData: {
        backgroundColor: '#252525',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    NFTImage: {
        width: 180,
        height: 170,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4
    },
    nftOwner: {
        fontSize: 15,
        fontWeight: "500",
        color: "#fff",
        marginTop: 3,
    },
    nftName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 6,
        marginBottom: 4,
        letterSpacing: 1,
    },
    nftPrice: {
        fontSize: 13,
        fontWeight: "400",
        color: "#cccccc",
        marginTop: 7,
        letterSpacing: 0.8,

    },
    bookmarkFlex: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    bookmarkOutlineImage: {
        width: 22,
        height: 22
    }

})