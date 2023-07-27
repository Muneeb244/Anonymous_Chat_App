import { Image, StyleSheet, Text, TouchableOpacity , View, useWindowDimensions } from 'react-native'
import React from 'react';
import Background from '../components/Background';
import { LinearTextGradient } from "react-native-text-gradient";

const GettingStarted = () => {

    const { width, height } = useWindowDimensions();

    const styles = StyleSheet.create({
        container: {
            // width: '100%',
            // height: '100%',
            flex: 1
        },
        // image: {
        //     flex: 1,
        //     justifyContent: 'center',
        // },
        heading: {
            height: height * 0.6,
            color: "#000"
        },
        text: {
            fontSize: 150,
            fontWeight: 'bold',
        },
        line1: {
            position: 'absolute',
            // top: height * 0.008,
            right: -height * 0.03,
            height: height * 0.25,
            color: '#FFEE97',
        },
        line2: {
            // fontSize: 150,
            // fontWeight: 'bold',
            position: 'absolute',
            top: height * 0.18,
            left: -height * 0.11,
            // backgroundColor: 'blue',
            height: height * 0.3,
            width: width * 1.5,
        },
        line3: {
            position: 'absolute',
            top: height * 0.36,
            left: -height * 0.09,
            height: height * 0.3,
            width: width * 1.5,
            color: '#C6F896'
        },
        info: {
            marginTop: height * 0.05,
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
            // marginTop: height * 0.05,
        },
        infoText: {
            lineHeight: 20,
        },
        start: {
            marginTop: height * 0.05,
            alignSelf: 'center',
            width: width * 0.85,
            height: height * 0.1,
            borderRadius: 30,
            backgroundColor: '#C6F896',
        },
        image: {
            width: 40,
            height: 40,
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
                    <Text style={[styles.line1, styles.text]}>BAD</Text>
                    <LinearTextGradient
                        style={[styles.line2, styles.text]}
                        locations={[0, 1]}
                        colors={['#FFEE97', '#C6F896']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    >
                        <Text>DABOOM</Text>
                        {/* THIS IS TEXT GRADIENT */}
                    </LinearTextGradient>
                    <Text style={[styles.line3, styles.text]}>OOM</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoHeading}>Badaboom</Text>
                    <Text style={styles.infoText}>Welcome to badaboom! add and reply to posts. You see those posts that users has published 10Km away from you</Text>
                </View>
                <TouchableOpacity  style={styles.start}>
                    <View style={styles.startChild} onPress={() => console.log("pressed")} >
                        <Text style={styles.startText}>Start</Text>
                        <Image source={require('../assets/bomb.png')} style={styles.image} />
                    </View>
                </TouchableOpacity >
            </Background>
        </View>
    )
}

export default GettingStarted
