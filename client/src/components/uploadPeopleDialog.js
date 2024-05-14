import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';

export default function UploadUsers() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) 
            return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                
            });
            window.location.reload();
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    const [visible, setVisible] = useState(false);

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">העלאת משתמשים מרובים</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button label="Ok" icon="pi pi-check" onClick={() => {  setVisible(false) }} autoFocus />
        </div>
    );

    return (
        <div>
            <Button icon="pi pi-users" size="large" rounded outlined severity="Filter" onClick={() => setVisible(true)} />
            <Dialog visible={visible} modal header={headerElement} footer={footerContent} style={{ width: '50rem' }} onHide={() => setVisible(false)}>
                <div>
                    <input id='choose'type="file" onChange={handleFileChange} />
                    <button id='upload' onClick={handleUpload}>העלאה</button>
                </div>
            </Dialog>
        </div>
    )
}





