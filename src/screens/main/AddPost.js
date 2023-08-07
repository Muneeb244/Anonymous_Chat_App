import { StyleSheet, Text, View, PermissionsAndroid, Image, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Background from '../../components/Background';
import Geolocation from 'react-native-geolocation-service';
import { Formik } from "formik";
import * as yup from 'yup';
import ErrorMessage from '../../components/ErrorMessage';
import FormButton from '../../components/FormButton';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const AddPost = ({ navigation }) => {

  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    requestLocationPermission();
  }, [])

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Badaboom Location Permission',
          message:
            'Badaboom needs access to your location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      } else {
        alert('Please allow location permission');
        navigation.replace('home')
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 2000 }
    );
  }

  const TakePhotoFromCamera = () => {
    // setLoader(true)
    try {
      ImagePicker.openCamera({
        width: 400,
        height: 300,
        cropping: true,
        compressImageQuality: 0.7,
      }).then(imageG => {
        // setImage(imageG)
        // setModalVisible(!modalVisible)
        console.log(imageG)
      });
    } catch (error) {
      alert("Error uploading image")
      console.log("Error from TakePhotoFromCamera", error);
    }
  }

  const ChoosePhotoFromGallery = () => {
    // setLoader(true)
    try {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        compressImageQuality: 0.7,
        mediaType: 'photo',
      }).then(imageG => {
        console.log(imageG)
        // setModalVisible(!modalVisible)
        // setImage(imageG)
        // uploadImage(imageG);
      });
    } catch (error) {
      alert("Error uploading image")
      console.log("Error from ChoosePhotoFromGallery", error)
    }
  }


  const temp = (values) => {
    values.emoji = randomEmoji();
    console.log(values)
    // navigation.navigate('otp')
  }

  const postSchema = yup.object().shape({
    post: yup.string().required().min(2).label("post"),
  });

  return (
    <Background>
      <View style={styles.header}>
        <Text style={styles.heading}>Add post</Text>
        <Image source={require('../../assets/bomb.png')} style={styles.image} />
      </View>
      <Formik
        initialValues={{ post: "" }}
        onSubmit={temp}
        validationSchema={postSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <KeyboardAvoidingView style={styles.form} >
            <View style={styles.parent}>
              <Text style={styles.label}>write post</Text>
              <View style={styles.child}>
                <TextInput
                  keyboardType='default'
                  style={styles.input}
                  placeholder='post'
                  onChangeText={handleChange('post')}
                  onBlur={handleBlur('post')}
                  value={values.post}
                />
                <MaterialCommunityIcons name='camera-plus-outline' size={40} color='#fff' style={styles.icon} />
              </View>
            </View>
            <ErrorMessage
              error={errors["post"]}
              visible={touched["post"]}
            />
            {/* <View style={styles.parent}>
              <Text style={styles.label}>Your email address</Text>
              <TextInput
                keyboardType='email-address'
                style={styles.input}
                placeholder='anonymous@email.com'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            <ErrorMessage
              error={errors["email"]}
              visible={touched["email"]}
            /> */}
            {/* <View style={styles.parent}>
              <Text style={styles.label}>Your password</Text>
              <TextInput
                keyboardType='default'
                style={styles.input}
                placeholder='min 6 characters'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
              />
            </View>
            <ErrorMessage
              error={errors["password"]}
              visible={touched["password"]}
            /> */}
            <FormButton text="post" onSubmit={handleSubmit} />
          </KeyboardAvoidingView>

        )}
      </Formik>
    </Background>
  )
}

export default AddPost

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
  or: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  line: {
    width: '30%',
    height: 1,
    backgroundColor: '#fff',
  },
  orText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  input: {
    width: '70%',
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 40,
    padding: 10,
    color: '#000',
    paddingLeft: 15,
  },
  parent: {
    width: '100%',
    marginTop: 20,
    backgroundColor: 'red',
    alignItems: 'center'
  },
  child: {
    width: '80%',
    flexDirection: 'row',
    backgroundColor: 'green',
  },
  label: {
    width: '80%',
    textAlign: 'left',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  icon: {

  }
})