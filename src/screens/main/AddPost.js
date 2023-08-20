import { StyleSheet, Text, View, PermissionsAndroid, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, ScrollView, Alert, BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react'
import Background from '../../components/Background';
import Geolocation from 'react-native-geolocation-service';
import { Formik } from "formik";
import * as yup from 'yup';
import ErrorMessage from '../../components/ErrorMessage';
import FormButton from '../../components/FormButton';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomSheet from '../../components/BottomSheet';
import Entypo from 'react-native-vector-icons/Entypo';
import mime from 'mime';
import { useKeyboard } from '../../context/KeyboardContext';
import { useDispatch, useSelector } from 'react-redux';
import {post, setErrorMessage} from '../../redux/Reducers/postSlice'

const AddPost = ({ navigation }) => {

  const [coordinates, setCoordinates] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const { setKeyboardVisible } = useKeyboard();
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, message  } = useSelector(state => state.post)

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


    if(error){
      alert(error)
      dispatch(setErrorMessage(null))
    }

    if(message){
      alert(message)
      dispatch(setErrorMessage(null))
      // navigation.replace('home')
    }

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    requestLocationPermission();
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [loading])



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
    try {
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.7,
      }).then(imageG => {
        setModalVisible(false)
        setImage(imageG)
      })
        .catch(er => {
          if (er.code === 'E_PICKER_CANCELLED') {
            return false;
          }
        })
    } catch (error) {
      if (error.code === 'E_PICKER_CANCELLED') {
        return false;
      }
      console.log("Error from TakePhotoFromCamera", error);
    }
  }

  const ChoosePhotoFromGallery = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.7,
        mediaType: 'photo',
      }).then(imageG => {
        setModalVisible(false)
        setImage(imageG)
      })
        .catch(er => {
          if (er.code === 'E_PICKER_CANCELLED') return false
        })
    } catch (error) {
      if (error.code === 'E_PICKER_CANCELLED') return false
      console.log("Error from ChoosePhotoFromGallery", error)
    }
  }


  const cloudinaryUpload = async (filename) => {
    setImageUploadLoading(true)
    const data = new FormData();
    const newImageUri = "file:///" + image.path.split("file:/").join("");
    data.append('file', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop()
    });
    data.append('upload_preset', 'dpivkpad3');
    try {
      let res = await fetch('https://api.cloudinary.com/v1_1/dpivkpad3/image/upload', {
        method: 'POST',
        body: data
      })
      res = await res.json();
      setImageUploadLoading(false)
      return res.url;
    } catch (error) {
      console.log("from cloudinary", error)
      setImageUploadLoading(false)
    }
  }


  const handleSubmit = async (values) => {
    if (image) {
      filename = image?.path.split('/').pop();
      values.imageURL = await cloudinaryUpload(filename)
    }
    values.coordinates = coordinates;
    dispatch(post(values))
    console.log(values)
  }

  const postSchema = yup.object().shape({
    post: yup.string().required().min(2).label("post"),
  });

  return (
    <ScrollView>
      <Background>
        <View style={styles.header}>
          <Text style={styles.heading}>Add post</Text>
          <Image source={require('../../assets/bomb.png')} style={styles.image} />
        </View>
        <Formik
          initialValues={{ post: "" }}
          onSubmit={handleSubmit}
          validationSchema={postSchema}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <KeyboardAvoidingView >

              <View style={styles.parent}>
                <View style={styles.child}>
                  <View style={styles.inputParent}>
                    <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="What's on your mind?"
                      onChangeText={handleChange('post')}
                      onBlur={handleBlur('post')}
                      value={values.post}
                      placeholderTextColor='#fff'
                      multiline={true}
                    />
                    <TouchableOpacity onPress={() => setModalVisible(prev => !prev)}>
                      <MaterialCommunityIcons name='camera-plus' size={30} color='#fff' style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                  {image && <View style={styles.imageParent}>
                    <Entypo name='cross' color="#313131" size={30} style={styles.imageIcon} onPress={() => setImage(null)} />
                    <Image source={{ uri: image ? image.path : null }} style={styles.postImage} />
                  </View>}
                </View>
              </View>
              <ErrorMessage
                error={errors["post"]}
                visible={touched["post"]}
              />
              <FormButton text="post" onSubmit={handleSubmit} loading={loading || imageUploadLoading} />
              <BottomSheet modalVisible={modalVisible} setModalVisible={setModalVisible} gallery={ChoosePhotoFromGallery} camera={TakePhotoFromCamera} />
            </KeyboardAvoidingView>

          )}
        </Formik>
      </Background>
    </ScrollView>
  )
}

export default AddPost

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
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
  inputParent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 80,
    backgroundColor: '#fff',
    // borderColor: '#fff',
    // borderWidth: 1,
    borderRadius: 40,
    padding: 10,
    color: '#fff',
    paddingLeft: 15,
    backgroundColor: '#1B1B1B',
  },
  parent: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center'
  },
  child: {
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    padding: 10,
    borderRadius: 10,
  },
  label: {
    width: '80%',
    textAlign: 'left',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  icon: {
    // backgroundColor: '#C6F896',
    borderRadius: 50,
    padding: 10,
  },
  postImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginVertical: 10,
    padding: 10,
  },
  postImageParent: {
    width: '100%',
    backgroundColor: '#1B1B1B',
  },
  imageIcon: {
    position: 'absolute',
    top: 10,
    right: 0,
    zIndex: 1,
  }
})