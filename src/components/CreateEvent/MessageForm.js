import React, {Component} from "react";
import {Container, Form, Row, Col, FormGroup, Label, Input,Button,  } from "reactstrap";
import {Redirect} from "react-router-dom";
import Alert from "./Alert";

interface state { 
      isMounted: boolean,
      error: boolean,
      eventName: string,
      eventDescription: string,
      eventLocation: string,
      eventCreator : string,
      eventStartDate : string,
      eventEndDate: string,
      eventStartTime: string,
      eventEndTime: string,
      redirect: boolean,
      status:number,
      html :"no html",
      sent: boolean 
}

class EventInputData extends React.Component<{}, { 
  isMounted: boolean, 
  error:boolean, 
  eventName: string,
  eventDescription: string,
  eventLocation: string,
  eventCreator : string,
  eventStartDate : string,
  eventEndDate: string,
  eventStartTime: string,
  eventEndTime: string,
  redirect: boolean,
  status:number,
  html :string,
  sent: boolean  
}> {
  constructor(props:any) {
    super(props);


    this.state = {
      isMounted: true,
      error: false,
      eventName: null,
      eventDescription: null,
      eventLocation: null,
      eventCreator : null,
      eventStartDate : null,
      eventEndDate: null,
      eventStartTime: null,
      eventEndTime: null,
      redirect: false,
      status:null,
      html :"no html",
      sent: false
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
      }


  onSubmit = (e:any) => {
    e.preventDefault();
    console.log(JSON.stringify({...this.state}))
    fetch('/event/create/',{
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...this.state})
    }
        )
      .then(res => {
        if (this.state.isMounted){
          this.setState({
            status : res.status
          });
        }
      }) 
    .catch(err => console.log(err));
    
    if (this.state.status !== 201) {
      if (this.state.isMounted) {
        this.setState({
          error: true
        });
      }}
  }

     AlertPopUp = () => {
      if (this.state.error === true) {
        return  (<Alert />);
      }
    }

  render(){
    if (this.state.status === 201) {
      return  <Redirect push to="/events" />
      }
         return (
          <div>

      <form>
        <div className="form-row">
        {this.AlertPopUp()}
          <div className="form-group col-md-6">
            <label >Event name *</label>
            <input name="event" type="text" className="form-control" placeholder="Chill Bar in Tokyo"
            onChange={(event:any) => this.setState({
              eventName : event.target.value
            })}
             />
          </div>

          <div className="form-group col-md-6">
            <label >Event Location* </label>
            <input name="location" type="text" className="form-control"  placeholder="Paris" 
            onChange={(event:any) => this.setState({
              eventLocation  : event.target.value
            })}
            />
          </div>
        </div>
        <div className="form-row">
      <div className="form-group col-md-6">
        <label >Creater Email *</label>
        <input name="from" type="text" className="form-control" placeholder="123@Sender.com"
        onChange={(event:any) => this.setState({
          eventCreator : event.target.value
        })}
        />
      </div>

      <div className="form-group col-md-6">
        <label >Event Start Date * </label>
        <input name="startDate" type="text" className="form-control"  placeholder="2020/11/20" 
        onChange={(event:any) => this.setState({
          eventStartDate : event.target.value
        })}
        />
      </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-4">

          <label >Event Start Time *</label>
          <input name="startTime" type="text" className="form-control" placeholder="21:00"
          onChange={(event:any) => this.setState({
            eventStartTime : event.target.value
          })}
          />
        </div>

        <div className="form-group col-md-4">
          <label >Event End Date * </label>
          <input name="endSate" type="text" className="form-control"  placeholder="2020/11/21" 
          onChange={(event:any) => this.setState({
            eventEndDate : event.target.value
          })}
          />
        </div>
        <div className="form-group col-md-4">
        <label >Event End Time *</label>
        <input name="year" type="text" className="form-control" placeholder="21:00"
        onChange={(event:any) => this.setState({
          eventEndTime : event.target.value
        })}
        />
      </div>
        </div>

          <div className="form-group">
        <label >Enter Event Description *</label>
        <Input type="textarea" name="text" rows={3} placeholder="A chill networking event in Tokyo" 
        onChange={(event:any) => this.setState({
          eventDescription : event.target.value
        })} />
      </div>
        <button type="submit" onClick={this.onSubmit} className="btn btn-primary mt-5">Create Event</button>
      </form>
          </div>
        );
       }
    }


export default EventInputData;