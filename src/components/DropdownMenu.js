import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const DropdownMenu = () => {
    return (
        <View style={styles.MenuProvider}>
            <MenuProvider >
                <Menu >
                    <MenuTrigger
                        customStyles={{
                            triggerWrapper: {
                                // top: -20,
                            },
                        }}
                    >
                        <MaterialCommunityIcons name='dots-vertical' size={40} color='#fff' />
                    </MenuTrigger>
                    <MenuOptions style={{ backgroundColor: '#1B1B1B', width: '90%'}}>
                        <MenuOption onSelect={() => alert(`bookmarks dekhlo`)}>
                            <TouchableOpacity onPress={() => alert(`bookmarks dekhlo`)}>
                                <Text style={styles.menuText}>Bookmarks</Text>
                            </TouchableOpacity>
                        </MenuOption>
                        <MenuOption onSelect={() => alert(`logout krlo`)} >
                            <Text style={styles.menuText}>Logout</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </MenuProvider>
        </View>
    );
};

export default DropdownMenu;

const styles = StyleSheet.create({
    MenuProvider: {
        width: '100%',
        height: 100,
        alignItems: 'flex-end',
        backgroundColor: 'red',
    },
    menuText: {
        color: "#fff",
        fontSize: 15,
        padding: 5
    }
});
