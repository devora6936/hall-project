import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { useGetEventsByWeekQuery } from '../../slices/eventSlice';
import { Checkbox } from "primereact/checkbox";
import AppBAr from '../appBar';

export default function WeekEvents() {
    const { data: events, isLoading, isError, error } = useGetEventsByWeekQuery()
    const dt = useRef(null);
    const days=['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת']
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



    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
        </div>
    );

const personnsameTemplate=(event)=>{
    return  days[new Date(event.date).getDay()]
}

const chekedTemplate=(event)=>{
    return  <Checkbox checked={event.speakers} disabled></Checkbox>

}

    return (
        <>
        <AppBAr/>
        <div className="card">
            <h1>אירועי השבוע</h1>
            <Tooltip target=".export-buttons>button" position="bottom" />
             <DataTable ref={dt} value={events} header={header} tableStyle={{ minWidth: '50rem' }} showGridlines >
                    {cols.map((col, index) => (
                        col.field == "date" ? <Column className='cul'field={col.field} key={index} body={personnsameTemplate} header={col.header} /> :
                            col.field == "speakers" ? <Column className='cul'field={col.field} key={index} body={chekedTemplate} header={col.header} />
                            : <Column className='cul' key={index} field={col.field} header={col.header} />
                    ))}
                </DataTable>
        </div>
        </>
    );
}
        