import AppBAr from "../appBar"
import Calendar from "../calendar"
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import Datepicker from "./datePicker";
import { useState } from "react";


const Events = () => {
    const [date, setDate1] = useState(new Date());
    // console.log(date.setDate(date.getDate()+1));
    console.log("kkkkkkkkkkkk");
    console.log(date.getFullYear());
    console.log(date.getMonth());

    console.log(date.getDate());

    return (
        <>
            <AppBAr />
            <div className="flex align-items-center">
                <Card className="cal">
                    <Datepicker date={date} setDate={setDate1}/>
                <Divider/>
                    <Calendar date={date}/>

                </Card>
            </div>


        </>
    )
}

export default Events