import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import Background from '../../components/Background'
import ErrorMessage from '../../components/ErrorMessage'
import { useState } from 'react';
import { Formik } from "formik";
import * as yup from 'yup';
import FormButton from '../../components/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser, setErrorMessage, forgotPassword } from '../../redux/Reducers/authSlice'

const ForgotPassword = ({navigation}) => {

    const {loading, error, verificationCode} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [email, setEmail] = useState(null);

    useEffect(() => {
        if (verificationCode) {
            showToastWithGravity()
            navigation.navigate('otp', {reset: true, email})
            // if(reset) navigation.navigate('otp', { user, verificationCode })
            // else navigation.navigate('otp', {reset: true, email: values.email})
        }
    }, [verificationCode])

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            'An OTP has been sent to your email address',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
        );
    };

    const temp = (values) => {
        setEmail(values.email)
        dispatch(forgotPassword(values))
        // navigation.navigate('otp', {reset: true, email: values.email})
    }

    const forgotSchema = yup.object().shape({
        email: yup.string().email().required().label("Email"),
    });

    return (
        <Background>
            <Text style={styles.heading}>Forgot Password?</Text>
            <Formik
                initialValues={{ email: "" }}
                onSubmit={temp}
                validationSchema={forgotSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <KeyboardAvoidingView style={styles.form} >
                        <View style={styles.parent}>
                            <Text style={styles.label}>Your email address</Text>
                            <TextInput
                                type='email'
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

                        <FormButton text="continue" onSubmit={handleSubmit} loading={loading} />
                    </KeyboardAvoidingView>
                )}
            </Formik>
        </Background>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    heading: {
        color: "#fff",
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 50,
        alignSelf: 'center',
    },
    parent: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
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
    label: {
        width: '80%',
        textAlign: 'left',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    form : {
        marginTop: 100
    }
})