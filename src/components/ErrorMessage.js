import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ErrorMessage({ error, visible, otp }) {
    if (!visible || !error) return null;
    return (

        <View style={styles.parent}>
            <Text style={[styles.error, {textAlign: otp ? 'center': "left"}]}>{error}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    parent:{
        width: '80%',
        alignSelf: 'center',
        // alignItems: 'center',

    }
})

export default ErrorMessage;