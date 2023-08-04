import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const GoogleC = ({label, signup, onPress}) => {
  return (
    <TouchableOpacity style={[styles.container, signup && {backgroundColor: '#C6F896'}]} onPress={onPress}>
      {!signup && <Image source={require('../assets/google.png')} style={styles.image} />}
      <Text style={styles.googleText}>{label}</Text>
    </TouchableOpacity>
  )
}

export default GoogleC

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: 50,
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 40,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    image: {
        width: 25,
        height: 25,
    },
    googleText: {
        marginLeft: 5,
        fontSize: 15,
    }
})