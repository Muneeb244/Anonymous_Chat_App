import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup.string().required().email().label("Email"),
    password: yup.string().required().min(5).max(12).label("Password"),
});

const signupSchema = yup.object().shape({
    name: yup.string().required().min(5).max(12).label("Name"),
    email: yup.string().required().email().label("Email"),
    password: yup.string().required().min(5).max(12).label("Password"),
})

export default { loginSchema, signupSchema };