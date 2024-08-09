import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { images } from "../assets/images";
import { getEllipsisTxt } from "../utils/formatter";

export default function BookmarkScreen({ navigation }) {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const loadBookmarks = async () => {
            try {
                let storedBookmarks = await AsyncStorage.getItem('bookmarks');
                storedBookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
                setBookmarks(storedBookmarks);
            } catch (error) {
                console.error("Error loading bookmarks", error);
            }
        };

        loadBookmarks();
    }, [bookmarks]);

    const removeBookmark = async (itemToRemove) => {
        try {
            let updatedBookmarks = bookmarks.filter(item => item.nft_data.external_data.name !== itemToRemove.nft_data.external_data.name);
            setBookmarks(updatedBookmarks);
            await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        } catch (error) {
            console.error("Error removing bookmark", error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item?.nft_data?.external_data?.image }} style={styles.image} />
            <View style={styles.removeBookmark}>
                <View>
                    <Text style={styles.title}>{item?.nft_data?.external_data?.name}</Text>
                    <Text style={styles.nftPrice}>
                        {getEllipsisTxt(item?.nft_data?.current_owner, 8)}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => removeBookmark(item)}>
                    <Image source={images.deleteIcon} style={styles.removeImage} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.MainCont}>
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
                            Your Bookmarks
                        </Text>
                    </View>
                </TouchableOpacity>
                {bookmarks?.length == 0 ?
                    <View style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:230}}>
                        <Image
                            source={images.emptyIcon}
                            style={styles.emptyImage}
                            resizeMode="contain"
                        />
                        <Text
                            style={styles.alertMessage}>
                            No Bookmarks yet !
                        </Text>
                    </View>
                    : <FlatList
                        data={bookmarks}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />}

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    MainCont: {
        backgroundColor: "#0F0F0F"
    },
    itemContainer: {
        marginBottom: 20,
        backgroundColor: '#1F1F1F',
        borderRadius: 8,
        padding: 15,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    title: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    backRoute: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40
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
    nftPrice: {
        fontSize: 14,
        fontWeight: "400",
        color: "#cccccc",
        marginTop: 7,
        letterSpacing: 0.8,
    },
    removeBookmark: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    removeImage: {
        width: 20,
        height: 20,
        marginBottom: 10
    },
    alertMessage: {
        textAlign: 'center',
        fontSize: 16,
        color: '#cccccc',
        marginTop: 20

    },
    emptyImage: {
        width: 80,
        height: 80
    }
});
