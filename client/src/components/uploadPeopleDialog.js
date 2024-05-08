import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useLoadPersonsMutation } from "../slices/personSlice";
import { InputText } from "primereact/inputtext";

export default function UploadUsers() {

    const [visible, setVisible] = useState(false);
    const [loadPeople] = useLoadPersonsMutation()
    const [path, setPath] = useState('')

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">העלאת משתמשים מרובים</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button label="Ok" icon="pi pi-check" onClick={() => { loadPeople({ filePath: path }); setVisible(false) }} autoFocus />
        </div>
    );

    return (
        <div>
            <Button icon="pi pi-users" size="large" rounded outlined severity="Filter" onClick={() => setVisible(true)} />
            <Dialog visible={visible} modal header={headerElement} footer={footerContent} style={{ width: '50rem' }} onHide={() => setVisible(false)}>
                <p className="m-0">
                    <InputText
                        name="path"
                        onBlur={(e) => setPath(e.target.value)}
                    />
                    <label htmlFor="value">הכנס נתיב קובץ</label>
                </p>
            </Dialog>
        </div>
    )
}
