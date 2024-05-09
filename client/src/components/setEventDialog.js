import React, { useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useForm } from "react-hook-form";
import { useDeleteEventMutation, useUpdateEventMutation } from "../slices/eventSlice";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "@mui/material";
import { RadioButton } from "primereact/radiobutton";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";

export default function SetEventDialog(props) {

    const [visible, setVisible] = useState(props.visible);
    const [deleteEvent, { data: res, isLoading, isError, error }] = useDeleteEventMutation()
    const [updateEvent, { data: updateres, updateisLoading, updateisError, updateerror }] = useUpdateEventMutation()
    const str = `עריכת אירוע ${props.eventType}`

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

    const toast = useRef(null);
    const formik = useFormik({
        initialValues: {
            price: props.event.price,
            speakers: props.event.speakers,
            coments: props.event.coments,
            payment: props.event.payment
        },
        validate: (data) => {
            let errors = {};

            if (!data.price) {
                errors.price = 'זהו שדה חובה';
            }

            return errors;
        },
        onSubmit: (data1) => {
            console.log('on submitttt');
            let data2 = { ...data1, _id: props.event?._id, date: props.event?.date, eventType: props.event?.eventType }
            updateEvent(data2)
            props.setVisible(false)
            setVisible(false)
            formik.resetForm()
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    const handleCheckboxChange = (e) => {
        formik.setFieldValue('speakers', e.currentTarget.checked);
        let updatedPay = formik.values.price;
        if (e.currentTarget.checked) {
            updatedPay += 200;
        }
        else
            updatedPay -= 200;
        formik.setFieldValue('price', updatedPay);
    };

    return (
        <div >
            <Dialog header={str} visible={visible} style={{ width: '50vw' }} onHide={() => { setVisible(false); props.setVisible(false) }} >
                <p className="m-0">
                    <form onSubmit={formik.handleSubmit} >
                        <Toast ref={toast} />
                        <h3>שם לקוח:{props.event?.personId.personname}</h3>
                        <span className="p-float-label p-input-icon-right">
                            <InputText
                                // defaultValue={formik.values.price}
                                value={formik.values.price}
                                classNames={classNames({ 'p-invalid': isFormFieldInvalid('price') })}
                                onChange={(e) => {
                                    const price = parseInt(e.target.value);
                                    formik.setFieldValue('price', price);
                                }}
                            />
                            <i className="pi pi-dollar" style={{ marginRight: "7px" }} />
                            <label htmlFor="value">מחיר</label>
                        </span>
                        {getFormErrorMessage("price")}
                        <br />
                        <br />
                        <span className="p-float-label p-input-icon-right">
                            <InputTextarea
                                className="setDialogComp"
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
                            <Button type='submit' label="עדכון" icon="pi pi-check" autoFocus />
                        </div>

                    </form>
                    <br />
                    <Button label="מחיקה" icon="pi pi-trash" onClick={() => { deleteEvent(props.event._id); props.setVisible(false); setVisible(false) }} autoFocus />
                </p>
            </Dialog>
        </div>
    )
}