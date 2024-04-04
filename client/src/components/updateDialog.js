import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { InputText } from 'primereact/inputtext';
import { set, useForm } from "react-hook-form";
import { Dropdown } from 'primereact/dropdown';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useUpdatePersonMutation } from "../slices/personSlice";


export default function UpdateDialog(props) {

    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [{ name: "אורח" }, { name: "חבר" }, { name: "שותף" }];
    const [visible, setVisible] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [updateUser, { data, isLoading, isError, error, isSuccess }] = useUpdatePersonMutation()

    const onSubmit = (data1) => {
        console.log('dddddddddddddddd');
        if (!data1.personType)
            data1.personType = props.cust.personType
        const data2 = { ...data1, _id: props.cust._id }
        updateUser(data2)
    };

    return (
        <>
         <Button label="" icon="pi pi-user-edit" onClick={() => setVisible(true)} text size="small"/>
        <>
            <Dialog header="עריכת משתמש" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} >
                <p className="m-0">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <span className="p-float-label p-input-icon-right">
                            <InputText placeholder="שם משתמש"
                                {...register("personname", {
                                })}
                                defaultValue={props.cust.personname}
                            />
                            <label htmlFor="input_value">Name</label>
                            <i className="pi pi-user" style={{ marginRight: "7px" }} />
                        </span>

                        <br />
                        <div>
                            <i className="pi pi-phone"></i>
                            <InputText placeholder="טלפון"
                                {...register("phone", {
                                    required: true
                                })}
                                defaultValue={props.cust.phone}
                            />
                        </div>

                        {errors?.phone?.type === "required" && <p>זהו שדה חובה</p>}

                        <br />
                        <div>
                            <i className="pi pi-phone"></i>
                            <InputText placeholder=" טלפון נוסף"
                                {...register("phone2", {
                                    required: true
                                })}
                                defaultValue={props.cust.phone2}
                            />
                        </div>
                        <br />

                        {errors?.phone2?.type === "required" && <p>זהו שדה חובה</p>}

                        <div>
                            <i className="pi pi-at"></i>
                            <InputText placeholder="מייל"
                                {...register("email", {
                                })}
                                defaultValue={props.cust.email}
                            />
                        </div>
                        <div className="card flex justify-content-center">
                            <i className="pi pi-check"></i>
                            <Dropdown value={selectedCity} options={cities} optionLabel="name"
                                placeholder="הרשאה" className="w-full md:w-16rem"   {...register("personType", {
                                })} onChange={(e) => setSelectedCity(e.value)}
                            />
                        </div>
                        <br />
                        
                        <div>
                            <Button type='submit' label="עדכן" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
                        </div>
                    </form>
                </p>
            </Dialog>
        </>
        </>
    )
}
