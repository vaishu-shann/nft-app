import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    FlatList,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { images } from "../assets/images"
import { fetchData } from "../Services/APIManager";


const NftFeed = [
    { id: 1, image: images.sample1, name: "NFT Name 1", price: '0.3456 ETH' },
    { id: 2, image: images.sample2, name: "NFT Name 2", price: '0.8765 ETH' },
    { id: 3, image: images.sample2, name: "NFT Name 3", price: '0.3498 ETH' },
    { id: 4, image: images.sample1, name: "NFT Name 4", price: '0.5673 ETH' },
    { id: 5, image: images.sample1, name: "NFT Name 5", price: '0.3498 ETH' },

]

export default function HomeScreen({ navigation, route }) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [bookmarkedStates, setBookmarkedStates] = useState({});

    const handlePress = (id) => {
        setBookmarkedStates((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Toggle bookmark state
        }));
    };



    useEffect(() => {
        fetchNFTData();
    }, []);

    const fetchNFTData = async () => {

        const API_res = await fetchData();
        if (!API_res) {
            setError(true)
        }
        setData(API_res)
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
                <View>
                    <Text style={styles.headerText}>
                        Explore, Buy and sell World
                    </Text>
                    <Text style={styles.DescriptionText}>
                        Non-fungible tokens, or NFTs, are artworks created on the
                        blockchain with unique encryption codes
                        that can be validated for ownership.
                    </Text>
                </View>

                <Image
                    source={images.homeBanner}
                    style={styles.BannerImage}
                    resizeMode="cover"
                />


                <View style={styles.nftContainer}>

                    {NftFeed.map((nft) => (
                        <TouchableOpacity onPress={() => navigation.navigate('DetailViewScreen', { itemId: nft?.id })}>
                            <View key={nft.id} style={styles.singleNFT}>
                                <Image
                                    source={nft.image}
                                    style={styles.NFTImage} nft
                                    resizeMode="cover"
                                />
                                <View style={styles.nftData}>
                                    <Text style={styles.nftName}>
                                        {nft.name}
                                    </Text>

                                    <View style={styles.bookmarkFlex}>
                                        <Text style={styles.nftPrice}>
                                            {nft.price}
                                        </Text>

                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}

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
        marginTop: 20
    },
    nftContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 50

    },
    singleNFT: {
        // borderWidth: 1,
        // borderColor: "#D162EC",

        borderRadius: 2,
        marginBottom: 30
    },
    nftData: {
        backgroundColor: '#252525',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
    },
    NFTImage: {
        width: 170,
        height: 200,
        borderRadius: 2
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
        marginTop: 10,
    },
    nftPrice: {
        fontSize: 14,
        fontWeight: "400",
        color: "#cccccc",
        marginTop: 4,
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