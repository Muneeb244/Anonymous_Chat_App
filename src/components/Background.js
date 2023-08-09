import { StyleSheet, Text, View, ImageBackground, useWindowDimensions, ScrollView, StatusBar } from 'react-native'
import React from 'react'

const Background = ({ children }) => {

    let { width, height } = useWindowDimensions();
    height += StatusBar.currentHeight;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start', // Adjust as needed
            alignItems: 'center',

        },
        image: {
            width: width,
            height: height,
        }
    })
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background.png')} resizeMode='cover' style={styles.image} blurRadius={100} >
                    {children}
            </ImageBackground>
        </View>
    )
}

export default Background
