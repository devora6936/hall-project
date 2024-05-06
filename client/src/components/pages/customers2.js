import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Checkbox } from "primereact/checkbox";
import AppBAr from '../appBar';
import { useGetPersonsQuery, useUpdatePersonMutation } from '../../slices/personSlice';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import AddPersonDialog from '../addPersonDialog';
import UpdateDialog from '../updateDialog';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { useSelector } from 'react-redux';



export default function Customers2() {
    const [updateUser, { data, isLoadingUpdate, isErrorUpdate, errorUpdate, isSuccess }] = useUpdatePersonMutation()

    const [txt, setTxt] = useState("")
    const [statuses] = useState(['חבר', 'שותף', 'אורח']);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const {isUserLoggedIn} = useSelector((state)=>state.auth)


    const { data: events, isLoading, isError, error } = useGetPersonsQuery()
    const dt = useRef(null);
    const cols = [
        { field: 'personname', header: 'שם' },
        { field: 'personType', header: 'סוג' },
        { field: 'email', header: 'מייל' },
        { field: 'phone', header: ' טלפון' },
        { field: 'phone2', header: ' טלפון נוסף' }

    ];
    const getSeverity = (value) => {
        switch (value) {
            case 'שותף':
                return 'success';

            case 'חבר':
                return 'warning';

            case 'אורח':
                return 'info';

            default:
                return null;
        }
    };
    // const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

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
                    <AddPersonDialog />
                    <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
                </div>
            </>
        );
    };
    const header = renderHeader();
    const updateTemplate = (cust) => {

        return <UpdateDialog cust={cust} />
    }

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const onRowEditComplete = (e) => {
        let { newData, index } = e;
        updateUser(newData)
    };
    
    const allowEdit = (rowData) => {
        return rowData.personname !== undefined;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.personType} severity={getSeverity(rowData.personType)}></Tag>;
    };

    const statusEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="בחר סוג לקוח"
                itemTemplate={(option) => {
                    return <Tag value={option} severity={getSeverity(option)}></Tag>;
                }}
            />
        );
    };

    return (
        <>
        {isUserLoggedIn&&
            <div className="card">
                <h1>לקוחות </h1>
                <Tooltip target=".export-buttons>button" position="bottom" />
                <DataTable ref={dt} value={events} header={header}  dataKey="id" editMode="row" onRowEditComplete={onRowEditComplete} scrollable tableStyle={{ minWidth: '50rem' }} showGridlines filters={filters} filterDisplay="row" >
                    {cols.map((col, index) => (
                        col.field=="personType"?<Column className='cul' key={index} field={col.field} header={col.header}  body={statusBodyTemplate} editor={(options) => statusEditor(options)}/>:
                        <Column className='cul' key={index} field={col.field} header={col.header}  editor={(options) => textEditor(options)}/>
                    ))}
                     <Column rowEditor={allowEdit} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
            </div>}
        </>
    );
}
