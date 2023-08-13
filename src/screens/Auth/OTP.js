import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Background from '../../components/Background'
import ErrorMessage from '../../components/ErrorMessage'
import { useState } from 'react';
import { Formik } from "formik";
import * as yup from 'yup';
import FormButton from '../../components/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from '../../redux/Reducers/authSlice'

const OTP = ({ route }) => {

    const optRef1 = useRef();
    const optRef2 = useRef();
    const optRef3 = useRef();
    const optRef4 = useRef();
    const [count, setCount] = useState(0);
    const [resend, setResend] = useState(false);
    const { user={"email": "muneeb@gmail.com", "emoji": "😲", "name": "Muneeb Ahmad", "password": "000000", "username": "muneeb"} } = route.params;
    const { loading, error, verificationCode } = useSelector(state => state.user)

    const dispatch = useDispatch();
    // console.log("roter value from OTP",user,verificationCode)


    useEffect(() => {
        const interval = setInterval(() => {
            if (count <= 0) {
                // setResend(false);
                return clearInterval(interval);
            };
            setCount(count - 1)
        }, 100)
        return () => {
            clearInterval(interval);
        };
    }, [count])

    if (error) alert(error)
    // console.log(verificationCode)

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            'An OTP has been resent to your email address',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
        );
    };

    // confirmOTP
    const confirmOTP = (values) => {
        if (count == 0) {
            setCount(60);
            setResend(true);
        }
        if (verificationCode == Object.values(values).join("")) return alert("OTP Verified")
    }



    const resendOTP = () => {
        console.log("resend otp")
        setCount(60);
        setResend(true);
        dispatch(verifyUser(user))
        showToastWithGravity()
    }

    if(error) alert(error)

    const otpSchema = yup.object().shape({
        otp1: yup.number().typeError("OTP must be a number").required().label("OTP"),
        otp2: yup.number().typeError("OTP must be a number").required().label("OTP"),
        otp3: yup.number().typeError("OTP must be a number").required().label("OTP"),
        otp4: yup.number().typeError("OTP must be a number").required().label("OTP"),
    });




    return (
        <Background>
            <Text style={styles.heading} >OTP Verfication</Text>
            <Formik
                initialValues={{ otp1: "", otp2: "", otp3: "", otp4: "" }}
                onSubmit={confirmOTP}
                validationSchema={otpSchema}
            >
                {({ values, errors, touched, handleChange, setFieldValue, handleBlur, handleSubmit }) => (
                    <KeyboardAvoidingView style={styles.form} >
                        <Text style={styles.label}>Your OTP</Text>
                        <View style={styles.parent}>
                            <TextInput
                                keyboardType='numeric'
                                style={[styles.input, { borderWidth: values.otp1 || errors["otp1"] ? 2 : 0, borderColor: errors["otp1"] ? 'red' : values.otp1 ? 'green' : '#fff' }]}
                                onChangeText={txt => {
                                    setFieldValue('otp1', txt)
                                    if (txt.length === 1) optRef2.current.focus();
                                }}
                                onBlur={handleBlur('otp1')}
                                value={values.otp1}
                                ref={optRef1}
                                maxLength={1}
                            />
                            <TextInput
                                keyboardType='numeric'
                                style={[styles.input, { borderWidth: values.otp2 || errors["otp2"] ? 2 : 0, borderColor: errors["otp2"] ? 'red' : values.otp2 ? 'green' : '#fff' }]}
                                onChangeText={txt => {
                                    setFieldValue('otp2', txt)
                                    if (txt.length === 1) return optRef3.current.focus();
                                    if (txt.length < 1) return optRef1.current.focus();
                                }}
                                onKeyPress={({ nativeEvent }) => {
                                    if (nativeEvent.key === 'Backspace') optRef1.current.focus();
                                }}
                                value={values.otp2}
                                ref={optRef2}
                                maxLength={1}
                            />
                            <TextInput
                                keyboardType='numeric'
                                style={[styles.input, { borderWidth: values.otp3 || errors["otp3"] ? 2 : 0, borderColor: errors["otp3"] ? 'red' : values.otp3 ? 'green' : '#fff' }]}
                                onChangeText={txt => {
                                    setFieldValue('otp3', txt)
                                    if (txt.length === 1) return optRef4.current.focus();
                                    if (txt.length < 1) optRef2.current.focus();
                                }}
                                onKeyPress={({ nativeEvent }) => {
                                    if (nativeEvent.key === 'Backspace') optRef2.current.focus();
                                }}
                                value={values.otp3}
                                ref={optRef3}
                                maxLength={1}
                            />
                            <TextInput
                                keyboardType='numeric'
                                style={[styles.input, { borderWidth: values.otp4 || errors["otp4"] ? 2 : 0, borderColor: errors["otp4"] ? 'red' : values.otp4 ? 'green' : '#fff' }]}
                                onChangeText={txt => {
                                    setFieldValue('otp4', txt)
                                    if (txt.length < 1) return optRef3.current.focus();
                                }}
                                onKeyPress={({ nativeEvent }) => {
                                    if (nativeEvent.key === 'Backspace') {
                                        optRef3.current.value = "";
                                        optRef3.current.focus();
                                    };
                                }}
                                value={values.otp4}
                                ref={optRef4}
                                maxLength={1}
                            />
                        </View>
                        <ErrorMessage
                            error={errors["otp1"] || errors["otp2"] || errors["otp3"] || errors["otp4"]}
                            visible={errors["otp1"] || errors["otp2"] || errors["otp3"] || errors["otp4"]}
                            otp={true}
                        />
                        {resend && <View style={styles.timer}>
                            <TouchableOpacity onPress={count != 0 ? () => setCount(60) : () => resendOTP()}>
                                <Text style={[styles.timerText, { color: count == 0 ? '#fff' : "#A9A9A9" }]}>Resend</Text>
                            </TouchableOpacity>
                            <Text style={styles.timerCount}>{count !== 0 ? count + " seconds" : ""}</Text>
                        </View>}
                        <FormButton text="Submit" onSubmit={handleSubmit} />
                    </KeyboardAvoidingView>
                )}
            </Formik>
        </Background>
    )
}

export default OTP

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
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },
    input: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700'
    },
    label: {
        width: '100%',
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    form: {
        marginTop: 100,
        justifyContent: 'center'
    },
    timer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    timerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    timerCount: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
})