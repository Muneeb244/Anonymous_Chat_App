import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const PostButton = ({name}) => {
  return (
    <TouchableOpacity style={styles.parent}>
        <MaterialCommunityIcons name={name} size={name == "message" ? 25 : 30} color='#fff' />
    </TouchableOpacity>
  )
}

export default PostButton

const styles = StyleSheet.create({
    parent: {
        backgroundColor: '#373737',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
})