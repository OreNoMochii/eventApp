//imports
import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,Button } from 'reactstrap';
// import Clock from "./Clock";
// import Date from "./Date";


export default class NavBar extends React.Component<{}, { 
  isMounted: boolean, 
  collapsed:boolean, 
  currentUser: string,
  loaded: boolean  
}> {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      isMounted: true,
      collapsed: true,
      currentUser: null,
      loaded: false
    };
  }



  componentDidMount() {
    this.setState({ isMounted: true });
    fetch( `/user/${localStorage.getItem('user_name')}` )
      .then(response => response.json())
        .then((response) => {
            if ( this.state.isMounted ) {
                this.setState( { currentUser:localStorage.getItem('user_email')} );
            }
        } ).catch( err => {
          console.log(err);
    });
  }
  
  componentWillUnmount() {
    this.setState({isMounted : false})
}


  toggleNavbar() {
    if (this.state.isMounted){
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  }
  render() {
    return (
      <div >
        <Navbar className= "navbar navbar-expand-lg bg-dark fixed-top" dark id="mainNav">
          <NavbarBrand href="/" className="mr-auto navbar-brand">Event Manager  </NavbarBrand>
          <NavbarToggler className="navbar-toggler navbar-toggler-right" onClick={this.toggleNavbar} className="mr-2" />
          <Collapse  isOpen={!this.state.collapsed} id="navbarResponsive" navbar>
            <Nav navbar className="navbar-nav ml-auto">

            <NavItem className="navbar-brand text-white">
               { (this.state.currentUser !== null || undefined) ?  `Welcome, ${localStorage.getItem('user_name')} Click on an event to signup for it` : `Loading.. ` }
              </NavItem>

              {/* <NavItem className="navbar-brand">
              <Date />
              </NavItem> */}
             
              <NavItem className="navbar-brand">
              <Button className=" text-white btn btn-primary" href="/signedup"> Check your signed events</Button>
              </NavItem>


              <NavItem className="navbar-brand">
              <Button className=" text-white btn btn-primary" href="/create"> Create new</Button>
              </NavItem>


              <NavItem className="navbar-brand">
              </NavItem>


            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}