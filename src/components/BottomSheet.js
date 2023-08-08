import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Modal from "react-native-modal";
import FormButton from './FormButton';
import Entypo from 'react-native-vector-icons/Entypo';

const BottomSheet = ({modalVisible, setModalVisible, gallery, camera}) => {


    return (
        <View style={styles.container}>
            <Modal
                isVisible={modalVisible}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection="down"
                onBackButtonPress={() => setModalVisible(prev => !prev)}
                style={styles.modal}
            >
                <View style={styles.parent}>
                    <View style={styles.child}>
                        <Entypo name='cross' color="#000" size={30} style={styles.icon} onPress={() => setModalVisible(prev => !prev)} />
                        <FormButton text='open camera' onSubmit={camera} />
                        <FormButton text='choose from gallery' onSubmit={gallery} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    parent: {
        width: '100%',
        height: '100%',
        left: 0,
        bottom: 0,
    },
    child: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        width: '100%',
        height: '30%',
        paddingTop: 10,
    },
    modal: {
        width: '100%',
        height: '100%',
        margin: 0,
    },
    icon: {
        position: 'absolute',
        top: 10,
        right: 10,
    }
})