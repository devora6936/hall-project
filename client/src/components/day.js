import { useEffect, useState } from "react"
import axios from 'axios'
import { Button } from 'primereact/button';
import { useGetEventsByDAteQuery } from "../slices/eventSlice";
import AddEventDialog from './addEventDialog'
import SetEventDialog from './setEventDialog'


const Day = (props) => {
    let date = new Date(props.year, props.month, props.day)
    const hebDate = date.getDay()
    date = date.toISOString()   
    const comp=new Date(props.date.getFullYear(),props.date.getMonth(),props.date.getDate()+1).toISOString().split('T')[0]
    const [heb, setHeb] = useState()
    const { data: events, isLoading, isError, error } = useGetEventsByDAteQuery(date.split('T')[0])
    //הוספה
    const [morning,setMorning]=useState(false)
    const [night,setNight]=useState(false)
    const [shabbat,setShabbat]=useState(false)
    const [kidush,setKidush]=useState(false)
    const [day,setDay]=useState(false)

    //עדכון ומחיקה
    const [morningflag,setMorningFlag]=useState(false)
    const [nightflag,setNightFlag]=useState(false)
    const [shabbatFlag,setShabbatFlag]=useState(false)
    const [dayFlag,setDayFlag]=useState(false)
    const [kidushFlag,setKIdushFlag]=useState(false)

    useEffect(() => {
        axios.get(`https://www.hebcal.com/converter?cfg=json&date=${date}&g2h=1&strict=1`).then((response) => {
            setHeb(response.data);
        });
    }, [date]);

    const findEventInDay=(type)=>{
        return events?.filter((e)=>e.eventType==type)[0]
    }
    return (
        <>
            <div className="ourday" style={{ border:date.split('T')[0]==comp?'2px solid #8284f5':'1px solid #dcdfe1'}}>
                <div>
                    <h4>{heb && `${heb.heDateParts.d} ${heb.heDateParts.m} `}</h4>
                    {heb ? hebDate == 0 ? <div>{heb.events}</div> : <div>{heb.events.slice(0, heb.events.length - 1)}</div> : <></>}
                </div>
                <div className="footer">
                    {heb ? hebDate == 0 ?
                        <div>
                            <Button icon={(options) => <img alt="dropdown icon" src="./goblet.png" {...options.iconProps} />}tooltip="קידוש" tooltipOptions={{position:'top'}} disabled={findEventInDay('ערב')}rounded text aria-lael="Filter" style={{backgroundColor:findEventInDay('קידוש')&&'#a6b4ee'}} onClick={() => {!findEventInDay('קידוש')?setKidush(true):setKIdushFlag(true)}} />
                            <Button icon={(options) => <img alt="dropdown icon" src="./candles.png" {...options.iconProps} />}tooltip="שבת" tooltipOptions={{position:'top'}} disabled={findEventInDay('ערב')} rounded text aria-lael="Filter" style={{backgroundColor:findEventInDay('שבת')&&'#a6b4ee'}}onClick={() => {!findEventInDay('שבת')?setShabbat(true):setShabbatFlag(true)}} />
                            <Button icon="pi pi-moon" disabled={findEventInDay('קידוש')||findEventInDay('שבת')}rounded text tooltip="מוצ''ש" tooltipOptions={{position:'top'}} style={{backgroundColor:findEventInDay('ערב')&&'#a6b4ee'}}onClick={() => {!findEventInDay('ערב')?setNight(true):setNightFlag(true)}} />
                        </div> :
                        <div>
                            <Button icon="pi pi-sun"tooltip="בוקר" tooltipOptions={{position:'top'}} disabled={findEventInDay('יום שלם')}rounded text style={{backgroundColor:findEventInDay('בוקר')&&'#a6b4ee'}}onClick={() => {!findEventInDay('בוקר')?setMorning(true):setMorningFlag(true)}} />
                            <Button icon="pi pi-moon" tooltip="ערב" tooltipOptions={{position:'top'}} disabled={findEventInDay('יום שלם')}rounded text style={{backgroundColor:findEventInDay('ערב')&&'#a6b4ee'}}onClick={() => {!findEventInDay('ערב')?setNight(true):setNightFlag(true)}} />
                            <Button icon={(options) => <img alt="dropdown icon" src="./day-and-night.png" {...options.iconProps} />} tooltip="יום שלם" tooltipOptions={{position:'top'}} disabled={findEventInDay('ערב')||findEventInDay('בוקר')}rounded text aria-lael="Filter" style={{backgroundColor :findEventInDay('יום שלם')&&'#a6b4ee'}} onClick={() => {!findEventInDay('יום שלם')?setDay(true):setDayFlag(true)}} />
                        </div> : <></>
                    }
                </div>
            </div>
          
            {morning?<AddEventDialog eventType={'בוקר'} date={date} visible={true} setVisible={setMorning} />:<></>}
            {morningflag?<SetEventDialog eventType={'בוקר'} date={date} setVisible={setMorningFlag}visible={true}  event={events?.filter((e)=>e.eventType=='בוקר')[0]}/>:<></>}
            
            {night?<AddEventDialog eventType={'ערב'} date={date} visible={true} setVisible={setNight}/>:<></>}
            {nightflag?<SetEventDialog eventType={'ערב'} date={date} setVisible={setNightFlag}visible={true}  event={events?.filter((e)=>e.eventType=='ערב')[0]}/>:<></>}
            
            {shabbat?<AddEventDialog eventType={'שבת'} date={date} visible={true} setVisible={setShabbat}/>:<></>}
            {shabbatFlag?<SetEventDialog eventType={'שבת'} date={date} setVisible={setShabbatFlag}visible={true}  event={events?.filter((e)=>e.eventType=='שבת')[0]}/>:<></>}
            
            {kidush?<AddEventDialog eventType={'קידוש'} date={date} visible={true} setVisible={setKidush}/>:<></>}
            {kidushFlag?<SetEventDialog eventType={'קידוש'} date={date} setVisible={setKIdushFlag}visible={true}  event={events?.filter((e)=>e.eventType=='קידוש')[0]}/>:<></>}
           
            {day?<AddEventDialog eventType={'יום שלם'} date={date} visible={true} setVisible={setDay}/>:<></>}
            {dayFlag?<SetEventDialog eventType={'יום שלם'} date={date} setVisible={setDayFlag}visible={true}  event={events?.filter((e)=>e.eventType=='יום שלם')[0]}/>:<></>}

        </>
    )
}

export default Day
