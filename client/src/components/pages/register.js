
import { InputText } from 'primereact/inputtext';
import * as React from "react";
import { Button } from 'primereact/button';
import { useRegisterMutation } from '../../slices/authApiSlice';
import { setToken } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast'

export default function Register() {
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const toast = React.useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [registerFunc, { isError, error, isSuccess, data, isLoading }] = useRegisterMutation()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
            phone: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.username) {
                errors.username = 'זהו שדה חובה';
            }

            if (!data.password) {
                errors.password = 'זהו שדה חובה';
            }
            if (!data.email.includes('@')) {
                errors.email = 'יש להכניס כתובת מייל תקינה';
            }
            return errors;
        },

        onSubmit: (data) => {
            registerFunc(data)
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    React.useEffect(() => {
        if (isSuccess) {
            toast.current.show({ severity: 'success', summary: 'הפעולה הצליחה', detail: 'מזכירה חדשה נוספה'});
        }
        
        if (isError) {
            toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'יש להכניס מייל ייחודי' });
            formik.resetForm();
        }

    }, [isSuccess, isError])

    return (
        <>
            {isUserLoggedIn &&
                <div>
                    <h1>הוספת מזכירה </h1>
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

                            <br />
                            <span className="p-float-label p-input-icon-right">
                                <InputText
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('email') })}
                                    onChange={(e) => {
                                        formik.setFieldValue('email', e.target.value);
                                    }}
                                />
                                <label htmlFor="value">מייל</label>
                                <i className="pi pi-at" style={{ marginRight: "7px" }} />
                            </span>
                            {getFormErrorMessage('email')}
                            <br />
                            <span className="p-float-label p-input-icon-right">
                                <InputText
                                    id="phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('phone') })}
                                    onChange={(e) => {
                                        formik.setFieldValue('phone', e.target.value);
                                    }}
                                />
                                <label htmlFor="value">טלפון</label>
                                <i className="pi pi-phone" style={{ marginRight: "7px" }} />
                            </span>
                            <br />
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
                            <Button label="הוספה" type="submit" icon="pi pi-check" />
                        </form>
                    </div>
                </div>}
        </>
    )
}