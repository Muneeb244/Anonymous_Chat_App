import { Image, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react';
import Background from '../../components/Background'
import FormButton from '../../components/FormButton'
import GoogleC from '../../components/GoogleC'
import ErrorMessage from '../../components/ErrorMessage';
import { Formik } from "formik";
import * as yup from 'yup';
import Geolocation from 'react-native-geolocation-service';
import { verifyUser, setErrorMessage } from '../../redux/Reducers/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import randomEmoji from '../../utils/randomEmoji';


const Signup = ({ navigation }) => {

    const [user, setUser] = useState()
    const dispatch = useDispatch();
    const { loading, error, verificationCode } = useSelector(state => state.user)

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            'An OTP has been sent to your email address',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
        );
    };

    useEffect(() => {
        if (error) {
            dispatch(setErrorMessage(null))
            alert(error)
        }
        if (verificationCode) {
            showToastWithGravity()
            navigation.navigate('otp', { user, verificationCode })
        }
    }, [error, verificationCode])




    const temp = (values) => {
        values.emoji = randomEmoji();
        setUser(values);
        dispatch(verifyUser(values))
    }

    const signupSchema = yup.object().shape({
        username: yup.string().required().min(2).label("username"),
        name: yup.string().required().min(2).label("name"),
        email: yup.string().email().required().label("Email"),
        password: yup.string().required().min(6).max(12).label("Password"),
    });

    return (
        <Background>
            <View style={styles.header}>
                <Text style={styles.heading}>Signup</Text>
                <Image source={require('../../assets/bomb.png')} style={styles.image} />
            </View>
            <Formik
                initialValues={{ username: "", name: "", email: "", password: "" }}
                onSubmit={temp}
                validationSchema={signupSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <KeyboardAvoidingView style={styles.form} >
                        <View style={styles.parent}>
                            <Text style={styles.label}>Your cool username</Text>
                            <TextInput
                                keyboardType='default'
                                style={styles.input}
                                placeholder='username'
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>
                        <ErrorMessage
                            error={errors["username"]}
                            visible={touched["username"]}
                        />
                        <View style={styles.parent}>
                            <Text style={styles.label}>Your name</Text>
                            <TextInput
                                keyboardType='default'
                                style={styles.input}
                                placeholder='name'
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                        </View>
                        <ErrorMessage
                            error={errors["name"]}
                            visible={touched["name"]}
                        />
                        <View style={styles.parent}>
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
                        />
                        <View style={styles.parent}>
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
                        />
                        <FormButton text="continue" onSubmit={handleSubmit} loading={loading} />
                    </KeyboardAvoidingView>

                )}
            </Formik>
            <View style={styles.or}>
                <View style={styles.line}></View>
                <Text style={styles.orText}>or</Text>
                <View style={styles.line}></View>
            </View>
            <GoogleC label="Sign up with google" />
        </Background>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
        width: '80%',
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
        alignItems: 'center',
        marginTop: 10,
    },
    label: {
        width: '80%',
        textAlign: 'left',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    form: {
        justifyContent: 'center',
    }
})