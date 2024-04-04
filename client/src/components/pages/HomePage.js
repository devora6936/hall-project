import TitlebarImageList from "../Pictures"
import React from 'react';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate=useNavigate()
    return (
        <>
            <Button type='submit' icon="pi pi-user" onClick={()=>navigate('/login')}>  כניסה למערכת  </Button>            
            <br/>
            <h1>תמונות</h1>
            <TitlebarImageList />
        </>
    )
}

export default HomePage