import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logInUser, validateUser } from "../helpers/Users";
import { updateFavAnimes } from "../redux/modules/favAnimes/reducer";

interface logValue{
    logLogin: string; 
    logPassword: string;
}

function useLoginFormConfig() {    
    const navigate = useNavigate(),
        dispatch = useDispatch();

    const validate = (values: logValue) => {
        let errors = {};
        if (!values.logLogin) {
            errors = Object.assign(errors, {logLogin: 'Required'});
        } else if (values.logLogin.length < 3) {
            errors = Object.assign(errors, {logLogin: 'Must be 3 characters or more'});
        }
      
        if (!values.logPassword) {
            errors = Object.assign(errors, {logPassword: 'Required'});
        } else if (values.logPassword.length < 8) {
            errors = Object.assign(errors, {logPassword: 'Must be 8 characters or more'});
        }

        if (!validateUser(values.logLogin, values.logPassword)) {
            errors = Object.assign(errors, {logLogin: 'The data you entered is incorrect'})
        }
      
        return errors;
    },

    login = useFormik({
        initialValues: {
            logLogin: '',
            logPassword: ''
        },
        validate,
        onSubmit: values => {
            logInUser(values.logLogin, values.logPassword);
            dispatch(updateFavAnimes());
            navigate('/profile');
        },
    });

    return login
}

export default useLoginFormConfig
