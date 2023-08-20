import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Keyboard, BackHandler, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Background from '../../components/Background'
import randomEmoji from '../../utils/randomEmoji'
import { useKeyboard } from '../../context/KeyboardContext'
import DropdownMenu from '../../components/DropdownMenu'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, setErrorMessage, setMessage, setVerificationCode, getProfile, setUser, setToken, updateProfile } from '../../redux/Reducers/authSlice'
import Loading from '../../components/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({ navigation }) => {

  const { setKeyboardVisible } = useKeyboard();
  const dispatch = useDispatch();
  const { loading, error, message, token, user } = useSelector(state => state.user)

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


  useEffect(() => {
    if (!user) dispatch(getProfile())
    else setData()

    if (error) {
      alert(error)
      dispatch(setErrorMessage(null))
    }

    if(message){
      alert(message)
      dispatch(setMessage(null))
    }

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);

    };
  }, [setKeyboardVisible, error, user, message]);


  const [emoji, setEmoji] = useState(null);
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);


  function getRandomColor() {
    const colors = ['#FFEE97', '#C6F896'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const setData = () => {
    setEmoji(user?.emoji);
    setUsername(user?.username);
    setName(user?.name);
    setEmail(user?.email);
  }

  const logout = () => {
    dispatch(setUser(null))
    dispatch(setToken(null))
    AsyncStorage.removeItem('token')
    alert("logout successfully")
    navigation.navigate('login')
  }

  const update = () => {
    dispatch(updateProfile({ username, name, emoji, email }))
  }


  return (
    <>
      {loading ? <Loading /> :
        <ScrollView keyboardShouldPersistTaps='always' >
          <Background>
            <TouchableOpacity onPress={logout}>
              <Text style={styles.logoutText}>logout</Text>
            </TouchableOpacity>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.parent}>
              <View style={styles.header}>
                <Text style={styles.heading}>Profile</Text>
                <Image source={require('../../assets/bomb.png')} style={styles.image} />
              </View>
              <View style={[styles.emojiContainer]}>
                <Text style={styles.emoji}>{emoji ? emoji : "😀"}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => setEmoji(randomEmoji())}>
                <Text style={styles.btnText}>change emoji</Text>
              </TouchableOpacity>
              <TextInput
                keyboardType='default'
                style={styles.input}
                placeholder='username'
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
              <TextInput
                keyboardType='default'
                style={styles.input}
                placeholder='name'
                value={name}
                onChangeText={(text) => {
                  if (text.length > 0) {
                    setName(text.charAt(0) === ' ' ? text.slice(1) : text);
                  } else {
                    setName('');
                  }
                }}
              />
              <TextInput
                keyboardType='email-address'
                style={styles.input}
                placeholder='anonymous@email.com'
                value={email}
                onChangeText={(text) => {
                  if (text.length > 0) {
                    setEmail(text.charAt(0) === ' ' ? text.slice(1) : text);
                  } else {
                    setEmail('');
                  }
                }}
              />

              <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => setData()}>
                  <Text style={styles.btnText}>reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={update}>
                  <Text style={styles.btnText}>update</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </Background>
        </ScrollView>
      }
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
  header: {
    // marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 5,
  },
  heading: {
    color: "#fff",
    fontSize: 30,
    fontWeight: 'bold',
  },
  emojiContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEE97',
    marginTop: 20,
  },
  parent: {
    width: '100%',
    height: 'auto',
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
    color: '#000',
  },
  button: {
    width: '40%',
    height: 50,
    backgroundColor: '#C6F896',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: '#000',
    fontSize: 15,
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
    marginTop: 25,
  },
  buttons: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  MenuProvider: {
    backgroundColor: 'red'
  },
  menuText: {
    color: "#fff",
    fontSize: 18,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 10,
  }
})