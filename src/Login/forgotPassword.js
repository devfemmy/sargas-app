import React, { Component } from 'react';
import {Input,Button, InputGroup,Alert} from 'reactstrap';
import Spinner from '../UI/Spinner/spinner.js';
import logo from '../assets/logo.png';
import '../Login/login.css';
import './signIn.css';
import axios from 'axios';

class ForgotPassword extends Component {
    state = { 
        loader: true,
        alertMessage: null,
        displayAlert: false
     }
    getPassword = () => {
        this.setState({loader: false});
        const data = { 
            email: document.querySelector('#email').value
        }
        axios.post('http://sargasoms.com/api/customer/?API_flag=forgot_pass', data)
        .then(res => {
            console.log(res)
            this.setState({loader: true})
            const response = res.data;
            if (response.status === 1001) {
                const alertMessage = response.message
                this.setState({alertMessage: alertMessage, displayAlert: true})
            }
            else if (response.status === 2001) {
                const alertMessage = response.message
                this.setState({alertMessage: alertMessage, displayAlert: true})
            } else if (response.status === 2010) {
                const alertMessage = response.message
                this.setState({alertMessage: alertMessage, displayAlert: true})
              }
        }).catch(
            err => {
                console.log(err)
            }
        )
    }
    render() { 
        let showAlert = null;
        if (this.state.displayAlert) {
          showAlert = 
            <Alert>
              {this.state.alertMessage}
            </Alert>
                setTimeout(() => {
                          this.setState({displayAlert: false})
                         
                }, 3000);
        }
        let showResult = <Spinner />
        if (this.state.loader) {
            showResult = (
                <div className = "Login-body">
                      {showAlert}
                <InputGroup>
                <Input id = "email" className = "login-input" type= "email" placeholder="Email" />
                </InputGroup>
                <br />
                <Button style= {{color: "white"}} outline
                onClick= {this.getPassword}
                 className = "Login-btn"  size="lg">SUBMIT</Button>
                </div>
            )
        }
        return (  
            <div>
        <div className= "Login">
        

        <header className= "Logo-header">
        <img src={logo} className="Special-logo" alt="logo" />   
        </header>
      
        <div className= "sign-up">
            
            {showResult}
         
        </div>
        </div>
    </div>
        );
    }
}
 
export default ForgotPassword;