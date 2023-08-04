import { Image, StyleSheet, Text, TouchableOpacity , View, useWindowDimensions } from 'react-native'
import React from 'react';
import Background from '../components/Background';
import { LinearTextGradient } from "react-native-text-gradient";

const GettingStarted = ({navigation}) => {

    const { width, height } = useWindowDimensions();

    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        heading: {
            height: height * 0.55,
            // backgroundColor: "#fff",
            color: "#000"
        },
        text: {
            fontSize: 150,
            fontWeight: 'bold',
            includeFontPadding: false,
        },
        line1: {
            position: 'absolute',
            right: -height * 0.03,
            height: height * 0.25,
            color: '#FFEE97',
        },
        line2: {
            position: 'absolute',
            top: height * 0.18,
            left: -height * 0.11,
            height: height * 0.3,
            width: width * 1.5,
        },
        line3: {
            position: 'absolute',
            top: height * 0.36,
            left: -height * 0.11,
            height: height * 0.3,
            width: width * 1.5,
            color: '#C6F896'
        },
        info: {
            marginTop: height * 0.03,
            alignSelf: 'center',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            borderBottomRightRadius: 30,
            height: height * 0.2,
            width: width * 0.85,
            padding: 25,
            backgroundColor: "#fff",
        },
        infoHeading: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000',
            lineHeight: 30,
        },
        infoText: {
            lineHeight: 20,
        },
        start: {
            marginTop: height * 0.03,
            alignSelf: 'center',
            width: width * 0.85,
            height: height * 0.1,
            borderRadius: 30,
            backgroundColor: '#C6F896',
        },
        image: {
            width: 25,
            height: 25,
            marginLeft: 5
        },
        startText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000',
            // marginRight: 5,
        },
        startChild: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }
    })

    return (
        <View style={styles.container}>
            <Background>
                <View style={styles.heading}>
                    <Text style={[styles.line1, styles.text]} >BAD</Text>
                    <LinearTextGradient
                        style={[styles.line2, styles.text]}
                        locations={[0, 1]}
                        colors={['#FFEE97', '#C6F896']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    >
                        <Text>DABOOM</Text>
                    </LinearTextGradient>
                    <Text style={[styles.line3, styles.text]}>OOM</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoHeading}>Badaboom</Text>
                    <Text style={styles.infoText}>Welcome to badaboom! add and reply to posts. You see those posts that users has published 10Km away from you</Text>
                </View>
                <TouchableOpacity  style={styles.start} onPress={() => navigation.navigate('login')}>
                    <View style={styles.startChild} >
                        <Text style={styles.startText}>Start</Text>
                        <Image source={require('../assets/bomb.png')} style={styles.image} />
                    </View>
                </TouchableOpacity >
            </Background>
        </View>
    )
}

export default GettingStarted
