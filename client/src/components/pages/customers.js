import AppBAr from "../appBar"
import { useGetPersonsQuery } from '../../slices/personSlice'
import PersonCard from "../Card"
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import AddPersonDialog from "../addPersonDialog";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import * as React from "react";


const Customers = () => {
    const [txt,setTxt]=useState("")
    const toast = useRef(null);

    const {
        data: customers,
        isLoading,
        isError,
        error
    } = useGetPersonsQuery()
    
    React.useEffect(()=>{
         if (isError) 
        toast.current.show({ severity: 'warn', summary:'הערה' , detail: 'אין משתמשים רשומים' });
    },[isError])

   if (isLoading) 
        return <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>


    return (
        <>
            <Toast ref={toast} />

            <AppBAr flag={true} setTxt={setTxt}/>
            <AddPersonDialog />
            {customers?.map(cust => cust.personname.includes(txt)&&<PersonCard cust={cust} />)}
        </>
    )
}

export default Customers