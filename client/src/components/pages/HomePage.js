import React from 'react';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate()

    const handleButtonClick = (event) => {
        event.preventDefault(); // Prevent the default behavior
    };
    return (
        <div className="homepage-container">
            <div className="background-image">
                    <Button  className="home-page-text" onClick={handleButtonClick}> ברוכים הבאים למערכת ניהול אולמות האירועים - המקום שלך לתיאום וארגון אירועים בצורה מושלמת! </Button>
                <Button type='submit' icon="pi pi-user" onClick={() => navigate('/login')} className="home-page-button">כניסה למערכת</Button>
            </div>
        </div>
    )
}

export default HomePage