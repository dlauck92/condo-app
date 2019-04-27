import React from 'react';
import './Form.css';
import api from '../../utils/api';
// import axios from 'axios';

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ticketTitle: '',
            unitNum: '',
            ticketBody: '',
            id: '',
        }
    }
     // use for getting Closed worker tickets
     findAllOpenOrders() {
        api.getAllOpenOrders();
    };

    // use for getting Closed worker tickets
    findClosedOrder() {
        api.getClosedOrders(this.props.id);
    };

    // use for getting Open worker tickets
    findOpenOrder() {
        api.getOpenOrders(this.props.id)
        .then(res => console.log(res.data))
    };


    //Submit a work order ticket
    submitOrder() {
        api.saveWorkOrder(this.props.id, {
            id:this.props.id,
            ticket_title: this.state.ticketTitle,
            unit_num: this.state.unitNum,
            ticket_body: this.state.ticketBody,

        }).then(res => console.log(res))
        };
    

    render() {
        return (
            <form>
                <p>Create a Work Order</p>
                <input className='ticketTitle' placeholder='Ticket Title' value={this.state.ticketTitle} onChange={e => this.setState({ ticketTitle: e.target.value })} />
                <br />
                <input className='unitNumber' placeholder='Unit Number' value={this.state.unitNum} onChange={e => this.setState({ unitNum: e.target.value })} />
                <br />
                <input className='ticketBody' placeholder='Ticket Body' value={this.state.ticketBody} onChange={e => this.setState({ ticketBody: e.target.value })} />
                <br />
                <div className="Submit">
                    <input type="submit" value="Submit" onClick={(e) => { e.preventDefault(); this.submitOrder() }} />
                </div>
                <br />
                <p>Search Open Work Orders</p>
                {/* <input className='unitNumber' placeholder='Unit Number' value={this.state.unit_num} onChange={e => this.setState({ unit_num: e.target.value })} /> */}
                
                <div className="Submit">
                    <input type="submit" value="Submit" onClick={(e) => { e.preventDefault(); this.findOpenOrder()}} />
                </div>
                <br />
                <p>Search Closed Work Orders</p>
                {/* <input className='unitNumber' placeholder='Unit Number' value={this.state.unit_num} onChange={e => this.setState({ unit_num: e.target.value })} /> */}
                
                <div className="Submit">
                    <input type="submit" value="Submit" onClick={(e) => { e.preventDefault(); this.findClosedOrder()}} />
                </div>
                <p>Search All Owners Open Work Orders</p>
                {/* <input className='unitNumber' placeholder='Unit Number' value={this.state.unit_num} onChange={e => this.setState({ unit_num: e.target.value })} /> */}
                
                <div className="Submit">
                    <input type="submit" value="Submit" onClick={(e) => { e.preventDefault(); this.findAllOpenOrders() }} />
                </div>
                <br />
            </form>
        );
    }
}

export default Form;