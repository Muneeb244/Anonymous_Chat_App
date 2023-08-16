import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import Background from '../../components/Background'
import ErrorMessage from '../../components/ErrorMessage'
import { Formik } from "formik";
import * as yup from 'yup';
import FormButton from '../../components/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, setErrorMessage, setMessage, setVerificationCode } from '../../redux/Reducers/authSlice'

const ResetPassword = ({ navigation, route }) => {

    const { email } = route.params;
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector(state => state.user)

    useEffect(() => {
        if (error) {
            alert(error)
            dispatch(setErrorMessage(null))
        }

        // if (message) {
        //     alert(message)
        //     setMessage(null)
        // }

        if (!loading && message && !error) {
            alert(message)
            dispatch(setMessage(null))
            navigation.navigate('login')
            dispatch(setVerificationCode(null))
        }
    }, [loading, error, message])


    const temp = (values) => {
        dispatch(resetPassword({ email, password: values.password }))
    }

    const forgotSchema = yup.object().shape({
        password: yup.string().required("Please enter your new password").min(6).max(12).label("Password"),
        confirmPassword: yup.string().required("Please confirm your password")
            .oneOf([yup.ref('password'), null], 'Passwords must match').label("Password")
    });

    return (
        <Background>
            <Text style={styles.heading}>Forgot Password?</Text>
            <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                onSubmit={temp}
                validationSchema={forgotSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <KeyboardAvoidingView style={styles.form} >
                        <View style={styles.parent}>
                            <Text style={styles.label}>Your password</Text>
                            <TextInput
                                secureTextEntry
                                style={styles.input}
                                placeholder='min 6 characters'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>
                        <ErrorMessage
                            error={errors["password"]}
                            visible={touched["password"]}
                        />
                        <View style={styles.parent}>
                            <Text style={styles.label}>Confirm your password</Text>
                            <TextInput
                                secureTextEntry
                                style={styles.input}
                                placeholder='min 6 characters'
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                            />
                        </View>
                        <ErrorMessage
                            error={errors["confirmPassword"]}
                            visible={touched["confirmPassword"]}
                        />

                        <FormButton text="continue" onSubmit={handleSubmit} loading={loading} />
                    </KeyboardAvoidingView>
                )}
            </Formik>
        </Background>
    )
}

export default ResetPassword

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
    form: {
        marginTop: 60
    }
})