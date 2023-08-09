import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import Background from '../../components/Background'
import randomEmoji from '../../utils/randomEmoji'
import { useKeyboard } from '../../context/KeyboardContext'

const Profile = () => {

  const { setKeyboardVisible } = useKeyboard();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      console.log("keyboard visible")
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      console.log("bnd hogaya")
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [setKeyboardVisible]);

  const temp = {
    username: 'meverik',
    name: "Muneeb Ahmad",
    emoji: "😀",
    email: "muneeb@gmail.com",
  }

  const [emoji, setEmoji] = useState(null);
  const [username, setUsername] = useState(temp.username);
  const [name, setName] = useState(temp.name);
  const [email, setEmail] = useState(temp.email);

  function getRandomColor() {
    const colors = ['#FFEE97', '#C6F896'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const reset = () => {
    setEmoji(temp.emoji);
    setUsername(temp.username);
    setName(temp.name);
    setEmail(temp.email);
  }


  return (
    <ScrollView>
      <Background>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.parent}>
          <View style={styles.header}>
            <Text style={styles.heading}>Profile</Text>
            <Image source={require('../../assets/bomb.png')} style={styles.image} />
          </View>
          <View style={[styles.emojiContainer]}>
            <Text style={styles.emoji}>{emoji ? emoji : temp.emoji}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => setEmoji(randomEmoji())}>
            <Text style={styles.btnText}>change emoji</Text>
          </TouchableOpacity>
          <TextInput
            keyboardType='default'
            style={styles.input}
            placeholder='cool username'
            value={"@" + username}
            onChangeText={(text) => setUsername(text.slice(1))}
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
            <TouchableOpacity style={styles.button} onPress={() => reset()}>
              <Text style={styles.btnText}>reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.btnText}>update</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Background>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
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
  }
})