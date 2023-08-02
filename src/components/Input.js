import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Input = ({ label, placeholder, password = false, onChange, onBlur , value }) => {
    return (
        <View style={styles.parent}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                secureTextEntry={password}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    parent: {
        width: '100%',
        alignItems: 'center',
        marginTop: 30,
    },
    input: {
        width: '80%',
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 40,
        padding: 10,
        color: '#000',
        paddingLeft: 15,
    },
    label: {
        width: '80%',
        textAlign: 'left',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    }
})