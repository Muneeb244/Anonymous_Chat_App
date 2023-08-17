import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, {useEffect} from 'react'
import Background from './Background'
import { useKeyboard } from '../context/KeyboardContext';

const Loading = () => {

    const { setKeyboardVisible } = useKeyboard();

    useEffect(() => {
        setKeyboardVisible(true)

        return(() => setKeyboardVisible(false))
    })

    return (
        <Background>
            <View style={styles.container}>
                <Image source={require('../assets/bomb.png')} style={styles.image} />
                <ActivityIndicator size='large' color='#fff' />
            </View>
        </Background>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:10
    },
    image: {
        width: 60,
        height: 60,
        marginBottom: 10,
      },
})