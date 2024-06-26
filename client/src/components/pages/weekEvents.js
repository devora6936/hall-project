import React, { useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { useGetEventsByWeekQuery } from '../../slices/eventSlice';
import { Checkbox } from "primereact/checkbox";
import { useSelector } from 'react-redux';

export default function WeekEvents() {
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const { data: events, isLoading, isError, error } = useGetEventsByWeekQuery()
    const dt = useRef(null);
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
    const cols = [
        { field: 'date', header: 'יום' },
        { field: 'personId.personname', header: 'שם' },
        { field: 'speakers', header: 'הגברה' },
        { field: 'eventType', header: 'סוג אירוע' },
        { field: 'price', header: 'מחיר' },
        { field: 'payment', header: 'צורת תשלום' },
        { field: 'coments', header: 'הערות' }
    ];

    const exportCSV = (selectionOnly) => {
        console.log(dt);
        dt.current.exportCSV({ selectionOnly });
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
        </div>
    );

    const personnsameTemplate = (event) => {
        return days[new Date(event.date).getDay()]
    }

    const chekedTemplate = (event) => {
        return <Checkbox checked={event.speakers} disabled></Checkbox>
    }

    return (
        <>
            {isUserLoggedIn &&
                <div className="card">
                    <h1>אירועי השבוע</h1>
                    <Tooltip target=".export-buttons>button" position="bottom" />
                    <DataTable ref={dt} value={events} header={header} tableStyle={{ minWidth: '50rem' }} showGridlines >
                        {cols.map((col, index) => (
                            col.field == "date" ? <Column className='cul' field={col.field} key={index} body={personnsameTemplate} header={col.header} /> :
                                col.field == "speakers" ? <Column className='cul' field={col.field} key={index} body={chekedTemplate} header={col.header} />
                                    : <Column className='cul' key={index} field={col.field} header={col.header} />
                        ))}
                    </DataTable>
                </div>}
        </>
    );
}
