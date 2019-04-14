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
            <form>
                <p>Create a Work Order</p>
                <input className='ticketTitle' placeholder='Ticket Title' value={this.state.ticketTitle} onChange={e => this.setState({ ticketTitle: e.target.value })} />
                <br />
                <input className='unitNumber' placeholder='Unit Number' value={this.state.unitNum} onChange={e => this.setState({ unitNum: e.target.value })} />
                <br />
                <input className='ticketBody' placeholder='Ticket Body' value={this.state.ticketBody} onChange={e => this.setState({ ticketBody: e.target.value })} />
                <br />
                <input type="submit" value="Submit" onClick={(e) => { e.preventDefault(); this.submitOrder() }} />
                <br />
                <p>Search Open Work Orders</p>
                <input className='unitNumber' placeholder='Unit Number' value={this.state.unitNum} onChange={e => this.setState({ unitNum: e.target.value })} />
                <br />
                <input type="submit" value="Submit" onClick={(e) => { e.preventDefault(); this.findOpenOrder() }} />
                <br />
                <p>Search Closed Work Orders</p>
                <input className='unitNumber' placeholder='Unit Number' value={this.state.unitNum} onChange={e => this.setState({ unitNum: e.target.value })} />
                <br />
                <input type="submit" value="Submit" onClick={(e) => { e.preventDefault(); this.findClosedOrder() }} />
            </form>
        );
    }
}

export default form;