import React from 'react';
import './Form.css';

class form extends React.Component {
    state = {
        ticketTitle: '',
        unitNum: '',
        ticketBody: ''
    }
    render() {
        return (
            <form>
                <input className='ticketTitle' placeHolder='Ticket Title' value={this.state.ticketTitle} onChange={e => this.setState({ ticketTitle: e.target.value })} />
                <br />
                <input className='unitNumber' placeHolder='Unit Number' value={this.state.unitNum} onChange={e => this.setState({ unitNum: e.target.value })} />
                <br />
                <input className='ticketBody' placeHolder='Ticket Body' value={this.state.ticketBody} onChange={e => this.setState({ ticketBody: e.target.value })} />
            </form>
        );
    }
}

export default form;