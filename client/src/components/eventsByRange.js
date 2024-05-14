import React, { useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Checkbox } from "primereact/checkbox";
import { useSelector } from 'react-redux';
import { useGetEventsByRangeQuery } from '../slices/eventSlice';
const jewishDate = require('jewish-date');


export default function ShowEentsByRange(props) {
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const { data: events, isLoading, isError, error, isSuccess } = useGetEventsByRangeQuery(props.filter)
    const dt = useRef(null);
    const cols = [
        { field: 'date', header: 'יום' },
        { field: 'personId.personname', header: 'שם' },
        { field: 'eventType', header: 'סוג אירוע' },
        { field: 'price', header: 'מחיר' },
        { field: 'coments', header: 'הערות' }
    ];

    const exportCSV = (selectionOnly) => {
        console.log(dt);
        dt.current.exportCSV({ selectionOnly });
    };

    function gregorianToHebrew(gregorianDate) {
        const hebrewDate = jewishDate.toJewishDate(new Date(gregorianDate));
        return jewishDate.formatJewishDateInHebrew(hebrewDate);
    }

    const Incomealculation = ()=>{
        var sum = 0
        events.forEach(event => {
            sum+=Number(event.price)
        });
        return sum;
    }

    const header = (
        <div className="flex align-items-center">
            <div className="flex align-items-center justify-content-start gap-2">
                <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
            </div>

        </div>
    );

    const personnsameTemplate = (event) => {
        return gregorianToHebrew(event.date)
    }

    const chekedTemplate = (event) => {
        return <Checkbox checked={event.speakers} disabled></Checkbox>
    }

    return (
        <>
            {events &&
            <div className="flex align-items-center justify-content-center" id='rangeEvents'>
                <div className="card" style={{width:'70%'}} id='rangeEventsCard'>
                    <h2>{`אירועים מתאריך ${gregorianToHebrew(props.filter.startDate)} עד תאריך ${gregorianToHebrew(props.filter.endDate)}`}</h2>
                    <h3>{`הכנסות: ${Incomealculation()}`}</h3>
                    <Tooltip target=".export-buttons>button" position="bottom" />
                    <DataTable ref={dt} value={events} header={header} tableStyle={{ minWidth: '50rem'}} showGridlines >
                        {cols.map((col, index) => (
                            col.field == "date" ? <Column className='cul' field={col.field} key={index} body={personnsameTemplate} header={col.header} /> :
                                col.field == "speakers" ? <Column className='cul' field={col.field} key={index} body={chekedTemplate} header={col.header} />
                                    : <Column className='cul' key={index} field={col.field} header={col.header} />
                        ))}
                    </DataTable>
                </div>
             </div>}
                
        </>
        
    );
}
