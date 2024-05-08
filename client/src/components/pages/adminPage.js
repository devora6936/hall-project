import AppBAr from "../appBar"
import { Link } from 'react-router-dom';
import '../../calendarCss.css'

const AdminPage = () => {
    return (
        <>
            <div className="home-container">
                <div className="home-inner">
                    <h1>ברוכים הבאים!</h1>
                    <h2> כאן תוכל לנהל את האירועים שלך בקלות ובנוחות</h2>

                    <ul>
                        <li>
                            <Link to="/events">לקבוע אירועים</Link>
                        </li>
                        <li>
                            <Link to="/register">להוסיף מזכירה</Link>
                        </li>
                        <li>
                            <Link to="/customers2">לצפות במשתמשים</Link>
                        </li>
                        <li>
                            <Link to="/weekEvents">לצפות באירועי השבוע</Link>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default AdminPage

