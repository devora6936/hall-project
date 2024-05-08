import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Day from './day'


const Calendar = (props) => {

  const [month, setMonth] = useState()
  const [year, setYear] = useState()
  const [days, setDays] = useState([])
  var date = new Date(year, month, 1);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1148)

  const updateScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 1148);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  const renderDaysInRows = () => {
    const rows = [];
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    let currentRow = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      currentRow.push(null);
    }

    for (let i = 0; i < daysInMonth.length; i++) {
      currentRow.push(daysInMonth[i]);

      if (currentRow.length === 7) {
        rows.push(currentRow);
        currentRow = [];
      }
    }

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  }

  const getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    let count = 1
    while (date.getMonth() === month) {
      days.push(++count);
      date.setDate(date.getDate() + 1);
    }

    return days;
  }

  useEffect(() => {
    setDays(getDaysInMonth(month, year))

  }, []);

  useEffect(() => {
    setMonth(props.date.getMonth())
    setYear(props.date.getFullYear())
  }, [props.date])

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>ראשון</Th>
            <Th>שני</Th>
            <Th>שלישי</Th>
            <Th>רביעי</Th>
            <Th>חמישי</Th>
            <Th>שישי</Th>
            <Th>שבת</Th>
          </Tr>
        </Thead>
        <Tbody>
          {renderDaysInRows().map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {row.map((day, dayIndex) => (
                <Td key={dayIndex} className="td">
                  {day && <div className="day-cell">
                    <Day day={day} month={month} year={year} date={props.date} isSmallScreen={isSmallScreen} />
                  </div>}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>

    </>
  )
}

export default Calendar



