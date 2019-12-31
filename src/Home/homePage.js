import React, { Component } from 'react';
import './homePage.css';
import trackImg from '../assets/track.png'
import SideDrawer from '../UI/SideDrawer/sideDrawer';
import menu from '../assets/menu.svg';
import {Button} from 'reactstrap'
import axios from 'axios';
import Spinner from '../UI/Spinner/spinner';

class HomePage extends Component {
    state = { 
        showSideDrawer : false,
        loader: false,
        home_details: []
     }
     sideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
     }
     componentDidMount() {
        // const home_details = this.props.location.state.home_details;
        const data = {
            token: localStorage.getItem('token')
        }
        axios.post('http://sargasoms.com/api/customer/?API_flag=fetchcusprofile', data)
        .then(res => {
            const home_details = res.data
            if (home_details.apartment === '' && home_details.firstname === '') {
        
                this.props.history.push({
                    pathname: 'profile'
                })
            }
            this.setState({home_details: home_details, loader: true});
        }).catch(err => {
            console.log(err)
        })
      
     }
     pushToNextPage = (home_details) => {
        // const address = home_details.apartment;
        // const street = home_details.street;
        // const state = home_details.state;
        const customer_address = localStorage.getItem('customer_address');
        if (customer_address === null) {
            alert('Please go to profile to fill in your address')
        }else {
            this.props.history.push({
                pathname: 'refil',
                search: '?query=refil',
                state: {home_details: home_details}
              })
        }
     }

     sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
        return {showSideDrawer: !prevState.showSideDrawer};
           });
     }
    render() { 
        const home_details = this.state.home_details
        const firstname = home_details.firstname;
        const lastname = home_details.lastname;
        localStorage.setItem('lastname', lastname)
        localStorage.setItem('firstname', firstname)
        // const name = firstname.toUpperCase()
        const apartment = home_details.apartment;
        localStorage.setItem('apartment', apartment)
        const street = home_details.street;
        localStorage.setItem('street', street)
        let showName = <Spinner />
        if (this.state.loader) {
            showName = (
                <div className = "home-content">
                <h2>Hi, {firstname.toUpperCase()}</h2>
                </div>
            )
        }
        let showButton = null;
        if (this.state.loader) {
            showButton = (
                <div className= "button-div">
                <Button 
                        outline color="secondary" 
                        className = "home-button" 
                        onClick= {()=> this.pushToNextPage(home_details)} 
                        size="lg">ORDER REFILL
                </Button>
              </div>
            )
        }

        return ( 
        <div>
               <SideDrawer 
                open = {this.state.showSideDrawer}
                closed = {this.sideDrawerToggleHandler}
                />
            <div className = "home">
            <img  src={menu} onClick= {this.sideDrawerToggleHandler} className="menu" alt="logo" />
                <div className= "counter2">
                <img src={trackImg} className="Track-Img" alt="img" />   
                </div>
                {showName}
            </div>
            {showButton}

        </div>
            
         );
    }
}
 
export default HomePage;