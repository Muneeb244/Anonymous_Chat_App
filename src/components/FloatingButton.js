import { Animated, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const FloatingButton = () => {

    const navigation = useNavigation();

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

    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg']
                })
            }
        ]
    }

    const styleOne = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -80]
                })
            }
        ]
    }

    const styleTwo = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -60]
                })
            },
            {
                translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -80]
                })
            }
        ]
    }
    const styleThree = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -60]
                })
            },
            {
                translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 80]
                })
            }
        ]
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.floatingButton, styleThree]} onPress={() => {
                toggleButton()
                navigation.navigate('profile')
            }}>
                <Animated.View style={styles.floatingChildButton} >
                    <MaterialCommunityIcons name='face-man-profile' size={40} color='#fff' />
                </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.floatingButton, styleOne]} onPress={() => {
                toggleButton()
                navigation.navigate('post')
            }}>
                <Animated.View style={styles.floatingChildButton} >
                    <MaterialCommunityIcons name='plus' size={40} color='#fff' />
                </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.floatingButton, styleTwo]} onPress={() => {
                toggleButton()
                navigation.navigate('home')
            }}>
                <Animated.View style={styles.floatingChildButton} >
                    <MaterialCommunityIcons name='home' size={40} color='#fff' />
                </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.floatingButton} onPress={toggleButton} activeOpacity={1}>
                <Animated.View style={[styles.floatingChildButton, rotation]} >
                    <MaterialCommunityIcons name='plus' size={40} color='#fff' />
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}

export default FloatingButton

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
        width: '100%',
        backgroundColor: 'red'
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