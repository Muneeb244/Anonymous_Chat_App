import { FlatList, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Background from '../../components/Background'
import Card from '../../components/Card'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Home = () => {

    const { width, height } = useWindowDimensions();
    console.log(width/2)

    const list = [
        {
            id: 1,
            name: 'annlex',
            post: 'suggest a good coffe shop',
            iconName: 'heart'
        },
        {
            id: 2,
            name: 'evlis',
            post: 'unpleasant situation in the gym',
            iconName: 'rocket-launch'

        },
        {
            id: 3,
            name: 'meverik',
            post: 'suggest a good intenet cafe',
            iconName: 'heart'
        },
    ]


    const styles = StyleSheet.create({
        list: {
            flex: 1,
            paddingTop: 10,
            marginBottom: 50,
        },
        container: {
            width: '100%',
            height: '100%',
        },
        floatingButton: {
            width: 60,
            height: 60,
            backgroundColor: '#1B1B1B',
            borderRadius: 30,
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: [{ translateX: -30 }],
            justifyContent: 'center',
            alignItems: 'center',

        }
    })

    return (
        <Background>
            <FlatList
                contentContainerStyle={{paddingBottom: 50}}
                style={styles.list}
                data={list}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <Card name={item.name} post={item.post} iconName={item.iconName} />
                    )
                }}
            />
            <TouchableOpacity style={styles.floatingButton}>
                <MaterialCommunityIcons name='plus' size={40} color='#fff' />

            </TouchableOpacity>
        </Background>
    )
}

export default Home
