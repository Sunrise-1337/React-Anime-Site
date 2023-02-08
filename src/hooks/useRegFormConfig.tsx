import { useFormik } from "formik";
import { checkLoginOrig, registerUser } from "../helpers/Users";

interface regValue{
    regLogin: string; 
    regPassword: string;
}

function useRegFormConfig() {

    const validate = (values: regValue) => {
        let errors = {};

        if (!values.regLogin) {
            errors = Object.assign(errors, {regLogin: 'Required'});
        } else if (values.regLogin.length < 3) {
            errors = Object.assign(errors, {regLogin: 'Must be 3 characters or more'});
        } else if (!checkLoginOrig(values.regLogin)) {
            errors = Object.assign(errors, {regLogin: 'This login is already in use'})
        }
      
        if (!values.regPassword) {
            errors = Object.assign(errors, {regPassword: 'Required'});
        } else if (values.regPassword.length < 8) {
            errors = Object.assign(errors, {regPassword: 'Must be 8 characters or more'});
        }
      
        return errors;
    };

    const register = useFormik({
        initialValues: {
            regLogin: '',
            regPassword: ''
        },
        validate,
        onSubmit: values => {
            registerUser(values.regLogin, values.regPassword)
        },
    });

    return register
}

export default useRegFormConfig