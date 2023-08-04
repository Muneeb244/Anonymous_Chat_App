import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'

const Background = ({ children }) => {
    return (
        <ImageBackground source={require('../assets/background.png')} resizeMode='cover' style={styles.image} blurRadius={100} >
            {children}
        </ImageBackground>
    )
}

export default Background

const styles = StyleSheet.create({
    image: {
        // width: '100%',
        // height: '100%',
        flex: 1,
        justifyContent: 'flex-start',
    }
})