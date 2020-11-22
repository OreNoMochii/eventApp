import React, {useState, useEffect } from 'react'; 
import {Redirect } from 'react-router-dom'; 
// import { useHistory } from "react-router-dom";


class Login extends React.Component<{}, { 
    userPassword: string,
    userMail: string,
    status:number,
    error: string
  }> {
    constructor(props) {
        super(props);
    
    
        this.state = {
        userPassword: null,
          userMail: null,
          error : null,
          status:null
        };
      }

      handleSubmit = (e:any) => {
        e.preventDefault();
        console.log(JSON.stringify({...this.state}))
        fetch(`/user/login/${this.state.userMail}`,{
          method: 'GET', 
          headers: {'Content-Type': 'application/json'}
        }
            ).then(res => { this.setState({
                status : res.status
              });
              res.json().then(data=>{
                localStorage.setItem('user_email', data.userMail)
                localStorage.setItem('user_name', data.userFirstName )
                  if (this.state.userMail===data.userMail && this.state.userPassword===data.userPassword) {
                return  <Redirect push to="/events" />
                }
            })
      })
    };

    render(){
      if (this.state.status === 201) {
        return  <Redirect push to="/events" />
        }

        
        return (
        <div >
                 <form>
                <h3>Login</h3>

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

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit} >Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="/#">password?</a>
                </p>
            </form>
        </div>
    )
}
  }

export default Login
