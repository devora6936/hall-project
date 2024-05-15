
import React, { useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useForm } from "react-hook-form";
import { useGetPersonsQuery } from "../slices/personSlice";
import { useCreateEventMutation } from "../slices/eventSlice";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from "primereact/inputtextarea";
import AddPersonDialog from "./addPersonDialog";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { RadioButton } from "primereact/radiobutton";
import { useSendEmailMutation } from "../slices/emailSlice";

export default function AddEventDialog(props) {
    const [visible, setVisible] = useState(props.visible);
    const [date, setDate] = useState(props.date?.split("T")[0])
    const [id, setId] = useState('')
    const [type, setType] = useState('')
    const [email, setEmail] = useState(undefined)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { data: customers } = useGetPersonsQuery()
    const [CreateEvent] = useCreateEventMutation()
    const [sendEmail] = useSendEmailMutation()
    const toast = useRef(null);

    const str = `הוספת אירוע ${props.eventType}`

    const radioBtns = [
        {
            name: 'מזומן',
            value: 'מזומן',
        },
        {
            name: 'העברה בנקאית',
            value: 'העברה בנקאית',
        }
    ];

    const selectedPersonTemplate = (option, props) => {
        if (option) {
            setId(option._id)
            setType(option.personType)
            setEmail(option.email)
            return (
                <div className="flex align-items-center">
                    <div>{option.personname}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const eventOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.personname}</div>
            </div>
        );
    };

    const formik = useFormik({
        initialValues: {
            personname: '',
            price: '',
            speakers: false,
            coments: '',
            payment: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.personname) {
                errors.personname = 'זהו שדה חובה';
            }
            if (!data.price) {
                errors.price = 'זהו שדה חובה';
            }

            return errors;
        },

        onSubmit: (data1) => {
            let data2 = { ...data1, personId: id, date: date, eventType: props.eventType }
            CreateEvent(data2)
            let str = ''
            formik.values.speakers ? str = "המחיר כולל הגברה" : str = "המחיר ללא הגברה, ניתן להשתמש בהגברה בתוספת של 200 שקלים"
            const body = "תאריך:" + props.heb.hebrew + " " + props.eventType + "\n" + "מחיר:" + formik.values.price + "\n" + str + "\n" + "מצורף תקנון אולם, נא לקרוא בעיון." + "\n מזל טוב!!\n"+"אין להשיב למייל זה.\nלשאלות ניתן לפנות ל053-3158716\nאו למייל l5871646@gmail.com"
            email && sendEmail({ recipient: email, subject: "אישור אירוע", message: body })
            props.setVisible(false)
            formik.resetForm()
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    useEffect(() => {
        if (type) {
            price();
        }
    }, [type])

    const price = () => {
        let updatedPay;
        if (props.eventType === "בוקר") {
            updatedPay = type === "חבר" ? 900 : type === "שותף" ? 500 : 1200;
        } else if (props.eventType === "ערב" || props.eventType === "מוצש") {
            updatedPay = type === "חבר" ? 1500 : type === "שותף" ? 700 : 2200;
        } else if (props.eventType === "יום שלם") {
            updatedPay = type === "חבר" ? 3000 : type === "שותף" ? 2000 : 3500;
        } else if (props.eventType === "שבת") {
            updatedPay = type === "חבר" ? 2500 : type === "שותף" ? 2000 : 3200;
        } else if (props.eventType === "קידוש") {
            updatedPay = type === "חבר" ? 350 : type === "שותף" ? 350 : 2000;
        }

        updatedPay += formik.values.speakers ? 200 : 0;

        if (formik.values.price !== updatedPay) {
            formik.setFieldValue('price', updatedPay);
        }
    };

    const handleCheckboxChange = (e) => {
        formik.setFieldValue('speakers', e.checked);
        let updatedPay = formik.values.price;
        if (e.checked) {
            updatedPay += 200;
        }
        else
            updatedPay -= 200;
        formik.setFieldValue('price', updatedPay);
    };

    return (
        <>
            <div>
                <Dialog header={str} visible={visible} style={{ width: '50vw' }} onHide={() => { setVisible(false); props.setVisible(false) }} >
                    <AddPersonDialog />
                    <br />
                    <br />

                    <form onSubmit={formik.handleSubmit} >
                        <Toast ref={toast} />
                        <Dropdown
                            className="dialogComp"
                            name="personname"
                            value={formik.values.personname}
                            options={customers}
                            optionLabel="personname"
                            placeholder="בחר לקוח"
                            showClear filter valueTemplate={selectedPersonTemplate} itemTemplate={eventOptionTemplate}
                            onChange={(e) => {
                                formik.setFieldValue('personname', e.value);
                            }}
                        />
                        {getFormErrorMessage("personname")}
                        <br />
                        <br />

                        <span className="p-float-label p-input-icon-right">
                            <InputText
                                className="dialogComp"
                                value={formik.values.price}
                                onChange={(e) => {
                                    const price = parseInt(e.target.value);
                                    formik.setFieldValue('price', price);
                                }}
                            />

                            <label htmlFor="value">מחיר</label>
                            <i className="pi pi-dollar" style={{ marginRight: "7px" }} />
                        </span>
                        {getFormErrorMessage("price")}
                        <br />
                        <br />
                        <span className="p-float-label p-input-icon-right">
                            <InputTextarea
                                className="dialogComp"
                                value={formik.values.coments}
                                onChange={(e) => {
                                    formik.setFieldValue('coments', e.target.value);
                                }} />
                            <i className="pi pi-comments" style={{ marginRight: "7px" }} />
                            <label htmlFor="value">הערות</label>
                        </span>
                        <br />
                        <br />
                        <div className=" flex justify-content-center">
                            <Checkbox
                                checked={formik.values.speakers}
                                onChange={handleCheckboxChange}
                                value={"הגברה"}></Checkbox>
                            <label htmlFor="ingredient1" className="ml-2" >  הגברה </label>
                        </div>
                        <br />
                        <div className="flex justify-content-center">
                            {radioBtns.map((btn, i) => {
                                return (
                                    <div key={i} className="flex align-items-center mr-3">
                                        <RadioButton
                                            {...btn}
                                            checked={formik.values.payment === btn.value}
                                            onChange={(e) => {
                                                formik.setFieldValue('payment', e.value);
                                            }}
                                        />
                                        <label htmlFor={btn.inputId} className="ml-1">
                                            {btn.value}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                        <br />

                        <div>
                            <Button type="submit" label="הוסף" icon="pi pi-check" autoFocus />
                        </div>
                    </form>
                </Dialog>
            </div>

        </>

    )
}
