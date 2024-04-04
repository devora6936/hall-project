import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/primereact.css';
import * as React from "react";
import { set, useForm } from "react-hook-form";
import { Button } from 'primereact/button';
import { useLoginMutation } from '../../slices/authApiSlice';
import { setToken } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast'
 

export default function Login() {
    const toast = React.useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginFunc, { isError, error, isSuccess, data, isLoading }] = useLoginMutation()

    const formik = useFormik({
        initialValues: {
            username: '',
            password:''
        },
        validate: (data) => {
            let errors = {};

            if (!data.username) {
                errors.username = 'זהו שדה חובה';
            }

            if (!data.password) {
                errors.password = 'זהו שדה חובה';
            }

            return errors;
        },
        onSubmit: (data) => {
            localStorage.setItem('username',formik.values.username)
            loginFunc(data)
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };
    React.useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            navigate('/adminPage')
        }
        if (isError){
            toast.current.show({ severity: 'error', summary:'שגיאה' , detail: 'לא מורשה' });
            formik.resetForm();
        }
    }, [isSuccess,isError])

    return (
        <>
        {isLoading && <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>}
        <h1>כניסת משתמשים</h1>
        <br />
        <br />

        <div className="card flex justify-content-center">
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                <Toast ref={toast} />
                <span className="p-float-label p-input-icon-right">
                    <InputText
                        id="username"
                        name="username"
                        value={formik.values.personame}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('username') })}
                        onChange={(e) => {
                            formik.setFieldValue('username', e.target.value);
                        }}
                    />
                    <label htmlFor="value">שם</label>
                    <i className="pi pi-user" style={{ marginRight: "7px" }} />
                </span>
                {getFormErrorMessage('username')}

                <br/>
                <span className="p-float-label p-input-icon-right">
                <Password
                    inputId="password"
                    name="password"
                    rows={5}
                    cols={30}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}
                    value={formik.values.password}
                    feedback={false}
                    onChange={(e) => {
                        formik.setFieldValue('password', e.target.value);
                    }}
                    toggleMask 
                />
                <label htmlFor="value">סיסמה</label>
                </span>
                {getFormErrorMessage('password')}
                <Button label="כניסה" type="submit" icon="pi pi-check" />
            </form>
        </div>
        </>
    )
}