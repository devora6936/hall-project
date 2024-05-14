import { useEffect, useRef, useState } from "react";
import { useGetEventsByRangeQuery } from "../../slices/eventSlice";
import ShowEentsByRange from "../eventsByRange";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

export default function EentsByRange() {

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [show, setShow] = useState(false)
    const [filter, setFilter] = useState()
    const toast = useRef(null)

    useEffect(() => {
        if (filter) {
            console.log(filter);
            setShow(true);
        }
    }, [filter]);

    const handleSubmit = () => {
        if (startDate && endDate) {
            let start = new Date(startDate).toISOString().split('T')[0]
            let end = new Date(endDate).toISOString().split('T')[0]
            const obj={ startDate: start, endDate: end }
            setFilter(obj)
        }

        else {
            toast.current.show({ severity: 'error', summary: 'חסר שדה חובה', detail: 'חובה לבחור טווח תאריכים', life: 3000 })
        }
    }

    return (
        <>

            <Card title="סיכום אירועים" subTitle="יש לבחור טווח תאריכים" style={{ maxWidth: '70%', marginRight: '15%' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center" }}>
                    <div className="flex justify-content-center" style={{ width: '250px', fontSize: "20px", color: 'GrayText' }}>
                        <ReactJewishDatePicker
                            isHebrew
                            isRange={true}
                            canSelect={(day) => day.date <= new Date()}
                            onClick={(startDay, endDay) => { setStartDate(startDay.date); setEndDate(endDay.date) }}
                        />
                    </div>
                    <Button icon="pi pi-check" aria-label="Filter" onClick={handleSubmit} style={{ height: '2rem' }} label="סנן" />
                </div>
            </Card>
            {show && <ShowEentsByRange filter={filter} />}
        </>
    )
}

