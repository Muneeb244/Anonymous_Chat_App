import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert, BackHandler } from 'react-native'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import Background from '../../components/Background'
import Card from '../../components/Card'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts, setErrorMessage, setPosts } from '../../redux/Reducers/postSlice'
import { useFocusEffect } from '@react-navigation/native';
import useLocation from '../../hooks/useLocation'



const Home = () => {


    const dispatch = useDispatch();
    const { coordinates } = useLocation();
    const { loading, error, posts } = useSelector(state => state.post)
    const [isRefreshing, setIsRefreshing] = useState(false);

    const onRefresh = () => {
        setIsRefreshing(true)
        getData();
    }

    const handleBackPress = () => {
        Alert.alert(
            "Exit app",
            "Exiting the application?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                    },
                    styles: 'cancel',
                },
                {
                    text: 'ok',
                    onPress: () => BackHandler.exitApp(),
                },
            ],
            {
                cancelable: false,
            },
        );
        return true;
    }

    const getData = () => {
        setIsRefreshing(true)
        console.log(coordinates)
        dispatch(getPosts(coordinates))
        setIsRefreshing(false)
    }

    useFocusEffect(
        useCallback(() => {
            setIsRefreshing(true)
            getData();
        }, [])
    );

    useEffect(() => {

        // checkpoint
        // if(!posts) dispatch(getPosts())
        // console.log(posts)
        // should I make posts null because if there is no psot it will keep on calling backend API
        // if (posts.length == 0) dispatch(getPosts())
        // dispatch(getPosts())

        if (error) {
            alert(error)
            dispatch(setPosts([]))
            dispatch(setErrorMessage(null))
        }

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        }
    }, [posts, error])

    // const list = [
    //     {
    //         id: 1,
    //         name: 'meverik',
    //         post: 'suggest a good internet cafe near me',
    //         emoji: '😎',
    //         imageURI: 'https://res.cloudinary.com/dpivkpad3/image/upload/v1691574949/jybuvdkkwoldmtshqagy.jpg',
    //         timestamp: '2023-08-08T12:00:00.000Z'
    //     },
    //     {
    //         id: 2,
    //         name: 'evlis',
    //         emoji: '💻',
    //         post: 'unpleasant situation in the gym  unpleasant situation in the unpleasant situation in the unpleasant situation in the unpleasant situation in the',
    //         timestamp: '2023-08-09T12:00:00.000Z'

    //     },
    //     {
    //         id: 3,
    //         name: 'evlis',
    //         emoji: '👿',
    //         post: 'unpleasant situation in the gym ',
    //         imageURI: 'https://res.cloudinary.com/dpivkpad3/image/upload/v1691344804/a6dwycvkxkm3trff0a7m.png',
    //         timestamp: '2023-08-09T12:00:00.000Z'
    //     },
    // ]


    // const temp = {
    //     id: 4,
    //     name: 'meverik',
    //     post: 'suggest a good internet cafe near me',
    //     emoji: '😎',
    //     imageURI: 'https://res.cloudinary.com/dpivkpad3/image/upload/v1691574949/jybuvdkkwoldmtshqagy.jpg',
    //     timestamp: '2023-08-08T12:00:00.000Z'
    // }


    return (
        <Background>
            <FlatList
                contentContainerStyle={{ paddingBottom: 70 }}
                style={styles.list}
                data={posts}
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => {
                    return (
                        <Card name={item.user.username} post={item.post} emoji={item.user.emoji} image={item.imageURL} timestamp={item.timestamp} />
                    )
                }}
            />
        </Background>
    )
}

export default Home

const styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingTop: 10,
        marginBottom: 70,
    },
    container: {
        width: '100%',
        height: '100%',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 10,
        left: '42%',
        backgroundColor: '#1B1B1B',
        borderRadius: 30,
        overflow: 'hidden'
    },
    floatingChildButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
})