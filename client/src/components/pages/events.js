import Calendar from "../calendar"
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import Datepicker from "./datePicker";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ReactJewishDatePicker } from "react-jewish-datepicker";


const Events = () => {
    const [date, setDate1] = useState(new Date());
    const { isUserLoggedIn } = useSelector((state) => state.auth)

    return (
        <>
            {isUserLoggedIn &&
                <div className="flex align-items-center">
                    <Card className="cal">
                        {/* <Datepicker date={date} setDate={setDate1} /> */}
                        <ReactJewishDatePicker
                            value={date}
                            isHebrew
                            onClick={(day) => {
                                setDate1(day.date);
                            }}
                        />
                        <Divider />
                        <Calendar date={date} />
                    </Card>
                </div>}
        </>
    )
}

export default Events