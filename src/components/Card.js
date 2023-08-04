import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PostButton from './PostButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



const Card = ({ name, post, iconName }) => {


    return (
        <View style={styles.cover}>
            <View style={styles.parent}>
                <View style={styles.avatar}>
                    <MaterialCommunityIcons name={iconName} size={60} color='red' />
                </View>
                <Text style={styles.name}>@{name}</Text>
                <Text style={styles.post} numberOfLines={2}>{post}</Text>
                <View style={styles.button}>
                    <PostButton name="message" />
                    <PostButton name="star" />
                </View>
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    cover: {
        width: '90%',
        height: 270,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // paddingTop: 40,
        marginTop: 60,
    },
    parent: {
        width: '90%',
        height: 250,
        backgroundColor: '#1B1B1B',
        borderRadius: 50,
        // justifyContent: 'space-around',
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        backgroundColor: '#FFEE97',
        borderRadius: 60,
        alignSelf: 'center',
        marginTop: -50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        color: '#535353',
        marginTop: 10,
    },
    post: {
        marginTop: 7,
        textAlign: 'center',
        width: '75%',
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 20,
        width: '50%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})