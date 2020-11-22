import React, {Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('en-GB');
BigCalendar.momentLocalizer(moment);

const allViews = Object
  .keys(BigCalendar.Views)
  .map(k => BigCalendar.Views[k])


function SignedUp() { 

    const [listSignedUpEvents, setSignedUpEvents] = useState([]);
       

    useEffect(() => {
        getEvents()
    });

    const getEvents = () => {
      fetch(`/signedup/${localStorage.getItem('user_email')}`)
        .then(response => response.json())
        .then(data =>
            
          setSignedUpEvents(data.map((event) =>(
            {
                title: event.eventName,
                start: event.eventStartDate,
                end: event.eventEndDate,
                id:event.eventId
            })
          )))
        .catch(err => console.error(err))
    }

    const UnsignUpEvent = (event:any) => {
      console.log(JSON.stringify({userMail:localStorage.getItem('user_email'), eventId:event.id, eventName:event.title}))
      fetch(`/signup/unsign/${event.id}`, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userMail:localStorage.getItem('user_email')})
      }
          ).then(res =>{
            if (res.status===201){
              alert(`you just unsigned for the event ${event.title} click on check list events in the upper right and go check the list of events`)

            }
            else {
              alert(`you have not been able to unsigned check if the api server is open ${res.status}`)
            }
          })
    }
    
    return( 
    <div style={{ 
        height: 700,
        display: "block",
        padding:60
    }}>
    <BigCalendar
    
      events={listSignedUpEvents}
      step={60}
      views={allViews}
      defaultDate={new Date(2020, 11, 20)}
      onSelectEvent={(event:any) => {
        UnsignUpEvent(event);
      }}
    />
  </div>
      )
;
}
export default SignedUp; 