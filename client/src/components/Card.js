import React from 'react';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import UpdateDialog from './updateDialog';
export default function PersonCard(props) {
    const header = (
        <img alt="Card" src="./user.jpg" style={{width:'50%'}}/>
    );
    const footer = (
        <>
           <UpdateDialog cust={props.cust}/>
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Card title={props.cust.personname} subTitle={props.cust.personType} footer={footer} header={header} className="md:w-20rem">
                <p className="m-0">
                   {props.cust.email}
                </p>
                <p className="m-0">
                   {props.cust.phone}
                </p>
            </Card>
        </div>
    )
}