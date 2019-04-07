import React from 'react';
import './Form.css';
import api from '../../utils/api';


class form extends React.Component {
    state = {
        ticketTitle: '',
        unitNum: '',
        ticketBody: ''
    }
    submitOrder = () => {
        console.log("dmm1");
        api.saveWorkorder(
            {
                ticket_title: this.state.ticketTitle,  
                ticket_body: this.state.ticketBody,
                unit_num: this.state.unitNum
            }
        )
    }
    render() {
        return (
            <form>
                <input className='ticketTitle' placeholder='Ticket Title' value={this.state.ticketTitle} onChange={e => this.setState({ ticketTitle: e.target.value })} />
                <br />
                <input className='unitNumber' placeholder='Unit Number' value={this.state.unitNum} onChange={e => this.setState({ unitNum: e.target.value })} />
                <br />
                <input className='ticketBody' placeholder='Ticket Body' value={this.state.ticketBody} onChange={e => this.setState({ ticketBody: e.target.value })} />
                <br />
                <input type="submit" value="Submit" onClick={()=> this.submitOrder()}/>
            </form>
        );
    }
}

export default form;