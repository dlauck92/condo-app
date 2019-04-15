import React from 'react';
import './Form.css';
// import api from '../../utils/api';

import axios from 'axios';
class form extends React.Component {
    constructor() {
        super()
        this.state = {
            ticketTitle: [],
            unitNum: [],
            ticketBody: []
        }

    }
    // use for getting Closed worker tickets
    findClosedOrder() {
        return axios.get("/ClosedWorkOrder/" + this.state.unitNum);
    }
    // use for getting Open worker tickets
    findOpenOrder() {
        return axios.get("/OpenWorkOrder/" + this.state.unitNum);
    }

    //create new work order ticket
    submitOrder() {
        return axios.post('/CreateWorkOrder', {
            ticket_title: this.state.ticketTitle,
            unit_num: this.state.unitNum,
            ticket_body: this.state.ticketBody
        }).then(res => {
            

        });
    }
    render() {
        return (
        <div className="container font-weight-bold">
            <form>
            <div className="List">
                <p>Create Work Order</p>
            </div>
                <input className='ticketTitle' placeholder='Ticket Title' value={this.state.ticketTitle} onChange={e => 
                    this.setState({ ticketTitle: e.target.value })} />
                <br />
                <input className='unitNumber' placeholder='Unit Number' value={this.state.unitNum} onChange={e => 
                    this.setState({ unitNum: e.target.value })} />
                <br />
                <input className='ticketBody' placeholder='Ticket Subject' value={this.state.ticketBody} onChange={e => 
                    this.setState({ ticketBody: e.target.value })} />
                <br />
                <input type="submit" value="Submit" className="font-weight-bold bg-dark" onClick={(e) => { e.preventDefault(); this.submitOrder() }} />
                <br />
            <div className="List">
                <p>Search Open Work Orders</p>
            </div>
                <input className='unitNumber' placeholder='Unit Number' value={this.state.unitNum} onChange={e => 
                    this.setState({ unitNum: e.target.value })} />
                <br />
                <input type="submit" value="Submit" className="font-weight-bold bg-dark" onClick={(e) => { e.preventDefault(); this.findOpenOrder() }} />
                <br />
            <div className="List">
                <p>Search Closed Work Orders</p>
            </div>
                <input className='unitNumber' placeholder='Unit Number' value={this.state.unitNum} onChange={e => 
                    this.setState({ unitNum: e.target.value })} />
                <br />
                <input type="submit" value="Submit" className="font-weight-bold bg-dark" onClick={(e) => { e.preventDefault(); this.findClosedOrder() }} />
             </form>
        </div>
        );
    }
}

export default form;