import { Image, StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native'
import React from 'react';
import Background from '../../components/Background'
import Input from '../../components/Input'
import FormButton from '../../components/FormButton'
import GoogleC from '../../components/GoogleC'
import ErrorMessage from '../../components/ErrorMessage';
import { Formik } from "formik";
// import { loginSchema } from '../../utils/yupSchemas';
import * as yup from 'yup';

const Signup = ({navigation}) => {


    const temp = (values) => {
        navigation.navigate('otp')
    }

    const signupSchema = yup.object().shape({
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
                initialValues={{name: "", email: "", password: "" }}
                onSubmit={temp}
                validationSchema={signupSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <KeyboardAvoidingView style={styles.form} >
                        <View style={styles.parent}>
                            <Text style={styles.label}>Your name</Text>
                            <TextInput
                                type='name'
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
                            />
                        </View>
                        <ErrorMessage
                            error={errors["password"]}
                            visible={touched["password"]}
                        />
                        <FormButton text="continue" onSubmit={handleSubmit} />
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
    }
})