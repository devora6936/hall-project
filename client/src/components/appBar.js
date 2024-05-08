import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'primereact/menu'
import { useDispatch, useSelector } from 'react-redux';
import apiSlice from '../slices/apiSlice';
import { removeToken } from '../slices/authSlice';
import { Button } from '@mui/material';

export default function AppBAr(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userFullName = localStorage.getItem('username') || '?'
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const menuRight = useRef(null)

    const items2 = [
        {
            label: 'התנתקות ',
            icon: 'pi pi-sign-out',
            command: () => { logout() }
        },
    ]
    const items = [
        {
            label: 'דף הבית',
            icon: 'pi pi-home',
            command: () => {
                navigate('/adminPage');
            }
        },
        {
            label: 'לקוחות',
            icon: 'pi pi-users',
            command: () => {
                navigate('/customers2');
            }
        },
        {
            label: 'הוספת מזכירה',
            icon: 'pi pi-user-plus',
            command: () => {
                navigate('/register');
            }
        },
        {
            label: 'אירועים',
            icon: 'pi pi-calendar',
            items: [
                {
                    label: 'קביעת אירועים',
                    icon: 'pi pi-calendar-plus',
                    command: () => {
                        navigate('/events');
                    }
                },
                {
                    label: 'אירועי השבוע',
                    icon: 'pi pi-bars',
                    command: () => {
                        navigate('/weekEvents');
                    }
                },

            ]
        }

    ];


    const start = <Avatar size="medium" label={userFullName.charAt(0)} style={{ backgroundColor: '#8284f5', color: '#fff', fontSize: 18, cursor: 'pointer' }} shape="circle"
        onClick={(event) => menuRight.current.toggle(event)} aria-controls="popup_menu_right" aria-haspopup />

    const logout = () => {
        dispatch(apiSlice.util.resetApiState())
        dispatch(removeToken())
        navigate('/')
    }

    let end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" onChange={(e) => props.setTxt(e.target.value)} />
        </div>)

    if (!props.flag)
        end = undefined

    return (
        <div className="card">
            <Menubar model={isUserLoggedIn && items} end={end} start={start} />
            <Menu model={items2} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
            {!isUserLoggedIn && <h3>יש לבצע כניסה</h3>}
            {!isUserLoggedIn && <Button type='submit' icon="pi pi-user" onClick={() => navigate('/')}>  כניסה למערכת  </Button>
            }

        </div>
    )
}
