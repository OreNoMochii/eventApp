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


function Events() { 

    const [listEvents, setEvents] = useState([]);
    
    // this.state = {
    //   userFirstName: null,
    //   userMail: null,
    //   userLastName: null,
    //   userPassword : null,
    //   status:null
    // };

    useEffect(() => {
        getEvents()
    });

    const getEvents = () => {
      fetch('event/listAllEvents/')
        .then(response => response.json())
        .then(data =>
            
            setEvents(data.map((event) =>(
            {
                title: event.eventName,
                start: event.eventStartDate,
                end: event.eventEndDate,
                resource: event.eventCreator,
                id:event.eventId
            })
          )))
        .catch(err => console.error(err))
    }

    const signUpEvent = (event:any) => {
      console.log(JSON.stringify({userMail:localStorage.getItem('user_email'), eventId:event.id, eventName:event.title, eventStartDate:event.start,
      eventEndDate: event.end}), `/signup/${localStorage.getItem('user_name')}`)
      fetch(`/signup/${localStorage.getItem('user_name')}` , {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userMail:localStorage.getItem('user_email'), 
        eventId:event.id, 
        eventName:event.title,
        eventStartDate:event.start,
        eventEndDate: event.end })}).then(res =>{
          if (res.status===201){
            alert(`you just signed up for the event ${event.title} click on check list events in the upper right and go check the list of events`)

          }
          else if (res.status===409){
            alert(`you just signed up for the event ${event.title} click on check list events in the upper right and go check the list of events
            or it's connection issue to the api server`)

          }
          else {
            alert(`you have not been able to unsigned check if the api server is open ${res.status}`)
          }
        }
          )
    }
            
            
    
    return( 
    <div style={{ 
        height: 700,
        display: "block",
        padding:60
    }}>
    <BigCalendar
      events={listEvents}
      step={60}
      views={allViews}
      defaultDate={new Date(2020, 11, 20)}
      onSelectEvent={(event:any) => signUpEvent(event)}
    />
  </div>
      )
;
}
export default Events; 