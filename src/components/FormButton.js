import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React from 'react'

const FormButton = ({ text, onSubmit, loading }) => {
    return (
        <TouchableOpacity style={styles.btn} onPress={onSubmit}>
            {loading ?
                <ActivityIndicator size="large" color="#000" />
                :
                <Text style={styles.text}>{text}</Text>}
        </TouchableOpacity >
    )
}

export default FormButton

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#C6F896',
        width: '80%',
        height: 50,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        alignSelf: 'center',
    },
    text: {
        color: '#000',
        fontSize: 20,
    }
})