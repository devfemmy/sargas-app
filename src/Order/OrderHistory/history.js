import React, { Component } from 'react';
// import { Row } from 'reactstrap';
import './history.css';
import axios from 'axios';
import Spinners from '../../UI/Spinner/spinner';
import errorHandler from '../../ErrorHandler/errorHandler';
import backIcon from '../../assets/back.svg';

class History extends Component {
    state = { 
        loader: false,
        loader2: false,
        orders: [],
        noOrder: null,
        error: false
     }
    componentDidMount() {
        const data = {
            token: localStorage.getItem('token')
        }
        axios.post('http://sargasoms.com/api/customer/?API_flag=fetchcustomertransactions', data)
        .then(res => {
            const response = res.data;
                 if (response.status === 1001) {
                const orders = response.data;
                const reversedOrder = orders.reverse();
                this.setState({orders: reversedOrder, loader: true})
                // const firstOrder = reversedOrder[0].order_id;
                // localStorage.setItem('order_id', firstOrder)
               
            }
            if (response.status === 2001) {
                this.setState({loader: true, loader2: true, noOrder: 'No Order History'})
            }
        }).catch(  error => {
                   
            this.setState({error: true, loader: true})});
    }
    backToPrevPageHandler = () => {
        this.props.history.goBack();
    }

    render() { 
        let showOrder = <Spinners />
        let showNoOrder = null
        if (this.state.loader2) {
            showNoOrder = (
                <div>
                    <h6 className = "no-order">
                    {this.state.noOrder}
                    </h6>
                   
                </div>
            )
        }
        if(this.state.loader) {
            showOrder = (
                <div>
                {this.state.orders.map(
                    (order, index) => {
                        return (
                            <div key = {index}>
                            <h6> 
                                {order.apt} &nbsp; 
                                {order.street} &nbsp; 
                                {order.zone_id} &nbsp; 
                                {order.city} &nbsp; 
                            </h6>
                            <p className= "order-date">
                            
                                {order.date}
                            </p>
                        <p className= "status">{order.order_status.toUpperCase()}</p>
                            <hr />
                            </div>

                        )
                    }
                )}
              

            </div>
            )
        }
        return (  
            <div>
                <div id= "sticky_element" className= "payment-header2">
               <p style={{width: '500px',paddingTop: '5%', color: 'white', fontSize: '15px'}}>
                    <img onClick={this.backToPrevPageHandler} src={backIcon} style={{float: 'left'}} alt= "float" />
                   &nbsp; &nbsp; History
                </p> 
                   
                </div> 
                <div className= "order-history">
                    {showOrder}
                    {showNoOrder}
                </div>
            </div>
        );
    }
}
 
export default errorHandler (History, axios);