// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import PostButton from './PostButton'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



// const Card = ({ name, post, iconName }) => {


//     return (
//         <View style={styles.cover}>
//             <View style={styles.parent}>
//                 <View style={styles.avatar}>
//                     <MaterialCommunityIcons name={iconName} size={60} color='red' />
//                 </View>
//                 <Text style={styles.name}>@{name}</Text>
//                 <Text style={styles.post} numberOfLines={2}>{post}</Text>
//                 <View style={styles.button}>
//                     <PostButton name="message" />
//                     <PostButton name="star" />
//                 </View>
//             </View>
//         </View>
//     )
// }

// export default Card

// const styles = StyleSheet.create({
//     cover: {
//         width: '90%',
//         height: 270,
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'center',
//         // paddingTop: 40,
//         marginTop: 60,
//     },
//     parent: {
//         width: '90%',
//         height: 250,
//         backgroundColor: '#1B1B1B',
//         borderRadius: 50,
//         // justifyContent: 'space-around',
//         alignItems: 'center',
//     },
//     avatar: {
//         width: 100,
//         height: 100,
//         backgroundColor: '#FFEE97',
//         borderRadius: 60,
//         alignSelf: 'center',
//         marginTop: -50,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     name: {
//         color: '#535353',
//         marginTop: 10,
//     },
//     post: {
//         marginTop: 7,
//         textAlign: 'center',
//         width: '75%',
//         color: '#fff',
//         fontSize: 25,
//         fontWeight: 'bold',
//     },
//     button: {
//         marginTop: 20,
//         width: '50%',
//         height: 50,
//         flexDirection: 'row',
//         justifyContent: 'space-around'
//     }
// })




import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostButton from './PostButton'
import FastImage from 'react-native-fast-image'



const Card = ({ name, post, emoji, image, timestamp }) => {

    const {darkImage, setDarkImage} = useState(false);
    const [liked, setLiked] = useState(false);
    const [bookmark, setBookMark] = useState(false);

    function timeAgo(timestamp) {
        const currentTime = new Date();
        const postTime = new Date(timestamp);

        const timeDifference = Math.floor((currentTime - postTime) / 1000);

        if (timeDifference < 60) {
            return `${timeDifference}s ago`;
        } else if (timeDifference < 3600) {
            const minutes = Math.floor(timeDifference / 60);
            return `${minutes}m ago`;
        } else if (timeDifference < 86400) {
            const hours = Math.floor(timeDifference / 3600);
            return `${hours}h ago`;
        } else {
            const days = Math.floor(timeDifference / 86400);
            return `${days}d ago`;
        }
    }



    return (
        <View style={[styles.cover, {height: image ? 330 : 170, justifyContent: image ? 'flex-start' : 'space-around'}]}>
            {image && <View style={styles.imageContainer}>
                <FastImage source={{ uri: image }} style={styles.image} />
            </View>}
            <View style={[styles.post, {height: !image ? '45%' : '15%'}]}>
                <Text style={styles.postText} numberOfLines={image ? 2 : 4}>{post}</Text>
                <PostButton star={true} onPress={() => setBookMark(!bookmark)} color={bookmark ? '#DFBD1F' : '#fff'} />
            </View>
            <View style={styles.infoParent}>
                <View style={styles.information}>
                    <View style={styles.emojiContainer}>
                        <Text style={styles.emoji}>{emoji}</Text>
                    </View>
                    <View style={styles.informationChild}>
                        <Text style={styles.name}>@{name}</Text>
                        <Text style={styles.time}>{timeAgo(timestamp)}</Text>
                    </View>

                </View>
                <View style={styles.button}>
                    <PostButton name="heart" onPress={() => setLiked(!liked)} color={liked ? 'red' : '#fff'} />
                    <PostButton name="message" />
                </View>
            </View>

        </View>
    )
}

export default Card
const styles = StyleSheet.create({
    cover: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#1B1B1B',
        borderRadius: 50,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        borderRadius: 50,
    },
    image: {
        width: "100%",
        height: '100%',
        borderRadius: 50,
        resizeMode: 'contain',
    },
    name: {
        color: '#535353',
        marginTop: 10,
    },
    infoParent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    information: {
        marginTop: 7,
        marginLeft: 10,
        width: '50%',
        height: 50,
        fontSize: 25,
        borderRadius: 50,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 5,
    },
    button: {
        marginTop: 10,
        width: '35%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    emojiContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFEE97',
    },
    emoji: {
        fontSize: 20,
        color: '#000',
    },
    informationChild: {
        width: '60%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    name: {
        fontSize: 17,
        color: '#fff',
    },
    time: {
        fontSize: 12,
        color: '#808080',
    },
    post: {
        width: '100%',
        height: '15%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    postText: {
        color: '#fff',
        fontSize: 15,
        width: '80%',
        marginLeft: 10,
    }
})
