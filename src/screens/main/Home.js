import { FlatList, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import Background from '../../components/Background'
import Card from '../../components/Card'


const Home = () => {

    const { width, height } = useWindowDimensions();


    const animation = useRef(new Animated.Value(0)).current;
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const toggleButton = () => {
        let toValue = isButtonClicked ? 0 : 1;
        Animated.spring(animation, {
            friction: 5,
            toValue,
            useNativeDriver: true,
        }).start();
        setIsButtonClicked(!isButtonClicked);
    }


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
            position: 'absolute',
            bottom: 10,
            left: '42%',
            backgroundColor: '#1B1B1B',
            borderRadius: 30,
            overflow: 'hidden'
        },
        floatingChildButton: {
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
        }
    })

    return (
        <Background>
            <FlatList
                contentContainerStyle={{ paddingBottom: 50 }}
                style={styles.list}
                data={list}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <Card name={item.name} post={item.post} iconName={item.iconName} />
                    )
                }}
            />
        </Background>
    )
}

export default Home
