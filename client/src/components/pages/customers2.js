import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Checkbox } from "primereact/checkbox";
import AppBAr from '../appBar';
import { useGetPersonsQuery } from '../../slices/personSlice';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import AddPersonDialog from '../addPersonDialog';
import UpdateDialog from '../updateDialog';

export default function Customers2() {
    const [txt,setTxt]=useState("")
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const { data: events, isLoading, isError, error } = useGetPersonsQuery()
    const dt = useRef(null);
    const cols = [
        { field: 'personname', header: 'שם' },
        { field: 'personType', header: 'סוג' },
        { field: 'email', header: 'מייל' },
        { field: 'phone', header: ' טלפון' },
        { field: 'phone2', header: ' טלפון נוסף' }

    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <>
            <div className="flex justify-content-start">
                <span className="p-input-icon-right">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="חיפוש לקוח" />
                </span>
            </div>
             <div className="flex align-items-center justify-content-end gap-2">
                <AddPersonDialog/>
             <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
         </div>
         </>
        );
    };
    const header = renderHeader();
const updateTemplate=(cust)=>{
    // console.log(cust);

return <UpdateDialog cust={cust}/>
}
    return (
        <>
            <AppBAr/>
            <div className="card">
                <h1>לקוחות </h1>
                <Tooltip target=".export-buttons>button" position="bottom" />
                <DataTable ref={dt} value={events} header={header} scrollable  tableStyle={{ minWidth: '50rem' }} showGridlines filters={filters} filterDisplay="row" >
                    {cols.map((col, index) => (
                        <Column className='cul' key={index} field={col.field} header={col.header} />
                    ))}
                    <Column className='cul'   body={updateTemplate} header='עריכה'/>
                </DataTable>
            </div>
        </>
    );
}
