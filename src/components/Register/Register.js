import React from 'react'
import './Register.css'
import {Redirect} from "react-router-dom";




class Register extends React.Component<{}, { 
    userFirstName: string,
    userMail: string,
    userLastName: string,
    userPassword : string,
    status:number
    
  }> {
    constructor(props) {
        super(props);
    
    
        this.state = {
          userFirstName: null,
          userMail: null,
          userLastName: null,
          userPassword : null,
          status:null
        };
      }
    
      componentDidMount() {
        this.setState({ isMounted: true });
          }
    
    
         handleSubmit = (e:any) => {
        e.preventDefault();
        console.log(JSON.stringify({...this.state}))
        fetch(`/user/register/${this.state.userMail}`,{
          method: 'POST', 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({...this.state})
        }
            ).then(res => { this.setState({
                status : res.status
              });
              res.json().then(data => {
                localStorage.setItem('user_email', data.userMail)
                localStorage.setItem('user_name', data.userFirstName ) })
              })
      };

      render() { 
        if (this.state.status === 201) {
            return  <Redirect push to="/events" />
            }
          return (
        <div>
             <form>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="firstname" className="form-control" placeholder="First name" onChange={(event:any) => this.setState({
              userFirstName  : event.target.value
            })} />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="lastname" className="form-control" placeholder="Last name" onChange={(event:any) => this.setState({
              userLastName  : event.target.value
            })} />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={(event:any) => this.setState({
              userMail  : event.target.value
            })} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={(event:any) => this.setState({
              userPassword  : event.target.value
            })} />
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/login">sign in?</a>
                </p>
            </form>
        </div>)

}
  }

export default Register;
