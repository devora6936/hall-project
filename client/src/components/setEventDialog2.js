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
import { useCreatePersonMutation, useGetPersonsQuery } from "../slices/personSlice";
import { useCreateEventMutation, useDeleteEventMutation, useUpdateEventMutation } from "../slices/eventSlice";
import { InputTextarea } from "primereact/inputtextarea";


export default function SetEventDialog(props) {
 
    const [visible, setVisible] = useState(props.visible);
    const [value,setValue]=useState()
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [deleteEvent, { data: res, isLoading, isError, error }] = useDeleteEventMutation()
    const [updateEvent, { data: updateres, updateisLoading, updateisError, updateerror }] = useUpdateEventMutation()
    const str = `עריכת אירוע ${props.eventType}`

    const onSubmit = (data1) => {
         let data2 = { ...data1,_id: props.event?._id, date: props.event?.date, eventType: props.event?.eventType }
         updateEvent(data2)
        props.setVisible(false)
    };

    return (
        <div >
            <Dialog header={str} visible={visible} style={{ width: '50vw' }} onHide={() => {setVisible(false);props.setVisible(false)}} >
                <p className="m-0">
                    <form onSubmit={handleSubmit(onSubmit)}>
                       <h3>שם לקוח:{props.event?.personId.personname}</h3>
                        <div>
                            <InputText className="md:w-19rem" placeholder="מחיר"
                                {...register("price", {
                                })}
                                defaultValue={props.event?.price}

                            />
                        </div>
                        <br />
                        <div className="card flex justify-content-center">
                            <InputTextarea className="md:w-19rem" autoResize value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} placeholder="הערות" {...register("coments", {
                                })}
                                defaultValue={props.event?.coments}
                                />
                        </div>
                        <div>
                            <Button type='submit' label="עדכון" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
                        </div>

                    </form>
                    <br/>
                    <Button label="מחיקה" icon="pi pi-trash" onClick={() => {deleteEvent(props.event._id);props.setVisible(false);setVisible(false)}} autoFocus />
                </p>
            </Dialog>
        </div>
    )
}