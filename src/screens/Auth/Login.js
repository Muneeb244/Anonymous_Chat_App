import { Image, StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useEffect } from 'react';
import Background from '../../components/Background'
import Input from '../../components/Input'
import FormButton from '../../components/FormButton'
import GoogleC from '../../components/GoogleC'
import ErrorMessage from '../../components/ErrorMessage';
import { Formik } from "formik";
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signinUser, setErrorMessage, setVerificationCode } from '../../redux/Reducers/authSlice'

// import { loginSchema } from '../../utils/yupSchemas';

const Login = ({ navigation }) => {

    const dispatch = useDispatch();
    const { loading, token, error } = useSelector(state => state.user)

    useEffect(() => {
        if (token) {
            dispatch(setVerificationCode(null))
            navigation.navigate('homenavigation')
        }
        if (error) {
            dispatch(setErrorMessage(null))
            alert(error)
        }
    }, [token, error])

    const temp = (values) => {
        dispatch(signinUser(values))
    }

    const loginSchema = yup.object().shape({
        email: yup.string().email().required().label("Email"),
        password: yup.string().required().min(6).max(12).label("Password"),
    });

    return (
        <Background>
            <View style={styles.header}>
                <Text style={styles.heading}>Login</Text>
                <Image source={require('../../assets/bomb.png')} style={styles.image} />
            </View>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={temp}
                validationSchema={loginSchema}
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
                        <View style={styles.parent}>
                            <Text style={styles.label}>Your password</Text>
                            <TextInput
                                type='password'
                                style={styles.input}
                                placeholder='min 6 characters'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry
                            />
                        </View>
                        <ErrorMessage
                            error={errors["password"]}
                            visible={touched["password"]}
                        />
                        <FormButton text="login" onSubmit={handleSubmit} loading={loading} />
                        <View style={styles.forgot}>
                            <Text style={styles.forgotText} onPress={() => navigation.navigate('forgot')} >Forgot password?</Text>
                        </View>
                    </KeyboardAvoidingView>
                )}
            </Formik>
            <View style={styles.or}>
                <View style={styles.line}></View>
                <Text style={styles.orText}>or</Text>
                <View style={styles.line}></View>
            </View>
            <GoogleC label="Sign up" signup={true} onPress={() => navigation.navigate('signup')} />
            <GoogleC label="Sign in with google" />
        </Background>
    )
}

export default Login

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
        justifyContent: 'center',
    },
    forgot: {
        width: '85%',
        alignItems: 'flex-end',
        marginTop: 10,
    },
    forgotText: {
        color: '#fff',
        fontSize: 15,
        textDecorationLine: 'underline'
    }
})