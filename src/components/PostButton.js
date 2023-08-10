import { StyleSheet, Text, TouchableOpacity, View, TouchableHighlight, Pressable } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const PostButton = ({ name, color, onPress, star }) => {
  return (
    <>
      {!star
        ?
        (<TouchableOpacity style={[styles.parent, { backgroundColor:'#373737' }]} onPress={onPress}>
          <MaterialCommunityIcons name={name} size={name == "message" ? 20 : 25} color={color ? color : '#fff'} />
        </TouchableOpacity>)
        :
        <Pressable style={styles.parent} onPress={onPress}>
          <MaterialCommunityIcons name="star" size={name == "message" ? 20 : 25} color={color ? color : '#fff'} />
        </Pressable>}
    </>
  )
}

export default PostButton

const styles = StyleSheet.create({
  parent: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  }
})