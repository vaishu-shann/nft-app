
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import React, {  useState, useEffect } from "react";
import { images } from "../assets/images";
import { getEllipsisTxt } from "../utils/formatter";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function DetailViewScreen({ navigation, route }) {
    const { item } = route.params;
    const nft = item;
    const [bookmarkAdded, setBookmarkAdded] = useState(false)
    const firstFiveValues = nft?.nft_data?.external_data?.attributes?.slice(0, 5).map(attribute => attribute.value).join(', ');

    useEffect(() => {
        const checkBookmarkStatus = async () => {
            try {
                let bookmarks = await AsyncStorage.getItem('bookmarks');
                bookmarks = bookmarks ? JSON.parse(bookmarks) : [];
                const isBookmarked = bookmarks.some(bookmark => bookmark.nft_data.external_data.name === nft.nft_data.external_data.name);
                setBookmarkAdded(isBookmarked);
            } catch (error) {
                console.error("Error checking bookmark status", error);
            }
        };

        checkBookmarkStatus();
    }, [nft]);

    const handleAddToBookmark = async () => {
        try {
            let bookmarks = await AsyncStorage.getItem('bookmarks');
            bookmarks = bookmarks ? JSON.parse(bookmarks) : [];

            // Add new item to bookmarks
            bookmarks.push(nft);

            await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            setBookmarkAdded(true)
            // navigation.navigate('BookmarkScreen');
        } catch (error) {
            console.error("Error adding to bookmarks", error);
        }
    };

    const handleRemoveFromBookmark = async () => {
        try {
            let bookmarks = await AsyncStorage.getItem('bookmarks');
            bookmarks = bookmarks ? JSON.parse(bookmarks) : [];
            const updatedBookmarks = bookmarks.filter(bookmark => bookmark.nft_data.external_data.name !== nft.nft_data.external_data.name);
            await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            setBookmarkAdded(false);
        } catch (error) {
            console.error("Error removing from bookmarks", error);
        }
    };

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

                {nft?.nft_data?.external_data?.image ? <Image
                    source={{ uri: nft?.nft_data?.external_data?.image }}
                    style={styles.NFTImage}
                    resizeMode="cover"
                /> :
                    <Image
                        source={images.noImageAvailable}
                        style={styles.NFTImage}
                        resizeMode="cover"
                    />
                }
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

               
                    <Text style={styles.attributeField}>Attributes: {" "}<Text style={styles.attributeFieldtext}>{firstFiveValues}</Text> </Text>

              


                <View style={styles.buttonContainer}>
                    {bookmarkAdded ?
                        <TouchableOpacity style={styles.ctaRedBookmark} onPress={handleRemoveFromBookmark} >
                           <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                           <Image
                        source={images.deleteLined}
                        style={styles.deleteicon}
                        resizeMode="contain"
                    />
                              <Text style={styles.ctaText}> Remove from Bookmark</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.ctaBookmark} onPress={handleAddToBookmark}>
                           <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                           <Image
                        source={images.bookmarkLined}
                        style={styles.bmkicon}
                        resizeMode="contain"
                    /><Text style={styles.ctaText}> Add to Bookmark</Text></View>
                        </TouchableOpacity>}
                </View>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    containerOverall: {
        flex: 1,
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
        marginTop: 20,
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
        borderRadius: 8,
        marginTop: 30,
        width: '95%',
    },
    ctaRedBookmark: {
        backgroundColor: 'tomato',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15,
        paddingTop: 15,
        borderRadius: 8,
        marginTop: 30,
        width: '95%',
    },
    ctaText: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: 'center',
        color: '#fff'
    },
    deImageLogo: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    attributeField: {
        fontSize: 16,
        fontWeight: "500",
        color: "#fff",
        marginTop: 15,
        lineHeight: 24,
width:355
  
    },
    attributeFieldtext: {
        fontSize: 14,
        fontWeight: 'normal',
        color: "#cccccc",
    },
    buttonContainer: {
        position: 'absolute',
        bottom: -150,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteicon:{
        width:25,
        height:25,
        marginRight:5
    },
    bmkicon:{
        width:20,
        // height:25,
        marginRight:5
    }
})