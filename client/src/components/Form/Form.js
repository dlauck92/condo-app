import React from 'react';
import './Form.css';
import api from '../../utils/api';
import axios from 'axios';
// import Jumbotron from "../Jumbotron";
// import DeleteBtn from "../components/DeleteBtn";
// import { Col, Row, Container } from "../Grid";
// import { List, ListItem } from "../List";


class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ticketTitle: '',
            unitNum: '',
            ticketBody: '',
            UserId: '',
        }
    }
    // use for getting Closed worker tickets
    findAllOpenOrders() {
        api.getAllOpenOrders(this.props.id)
            
        .then(res => console.log('All Opened Orders role Admin', res))
        // .then(res => this.setState({ AllOpenOrders: res.data }))
            .catch(err => console.log(err));
    };
    // use for getting Closed worker tickets
    findAllClosedOrders() {
        api.getAllClosedOrders(this.props.id)
            .then(res => console.log('All Closed Orders role Admin', res))
            .catch(err => console.log(err));
    };

    // use for getting Closed worker tickets
    findClosedOrder() {
        api.getClosedOrders(this.props.id)
            .then(res => console.log('Closed Orders role user', res))
            .catch(err => console.log(err));
    };

    // use for getting Open worker tickets
    findOpenOrder() {
        api.getOpenOrders(this.props.id)
        .then(res => console.log('Opened Orders role user', res))
            // .then(res => this.setState({ getOpenOrders: res.data }))
            .catch(err => console.log(err));
    };


    //Submit a work order ticket
    submitOrder() {
        const id = this.props.id
        console.log('line 35', id);
        return axios.post("/CreateWorkOrder/" + id, {
            UserId: this.props.id,
            ticket_title: this.state.ticketTitle,
            unit_num: this.state.unitNum,
            ticket_body: this.state.ticketBody,
            complete: false,

        }).then(res => console.log('Created Order role any', res))
    };



    render() {
        return (

            // <Container fluid>
            //     <Row>
            //         <Col size="md-6">
            //             <Jumbotron>
            //                 <h1>Create and Search for Work Orders </h1>
            //             </Jumbotron>
                        <form>
                            <p className="create-order-title">Create a Work Order</p>
                            <hr/>
                            <input className='unitNumber' placeholder='Unit Number' value={this.state.unitNum} onChange={e => this.setState({ unitNum: e.target.value })} />
                            <br />
                            <input className='ticketTitle' placeholder='Ticket Title' value={this.state.ticketTitle} onChange={e => this.setState({ ticketTitle: e.target.value })} />
                            <br />

                            <input className='ticketBody' placeholder='Ticket Body' value={this.state.ticketBody} onChange={e => this.setState({ ticketBody: e.target.value })} />
                            <br />
                            <div className="submit-btn">
                                <button className="button" type="button" value="Submit" onClick={(e) => { e.preventDefault(); this.submitOrder() }}>Submit</button>
                            </div>
                            <br />
                            <br />
                            <p className="search-open-title">Search Open Work Orders</p>
                            {/* <input className='unitNumber' placeholder='Unit Number' value={this.state.unit_num} onChange={e => this.setState({ unit_num: e.target.value })} /> */}

                            <div className="submit-btn">
                                <button className="button" type="button" value="Submit" onClick={(e) => { e.preventDefault(); this.findOpenOrder() }}>Submit</button>
                            </div>
                            <br />
                            <br />
                            <p className="search-closed-title">Search Closed Work Orders</p>
                            {/* <input className='unitNumber' placeholder='Unit Number' value={this.state.unit_num} onChange={e => this.setState({ unit_num: e.target.value })} /> */}

                            <div className="submit-btn">
                                <button className="button" type="button" value="Submit" onClick={(e) => { e.preventDefault(); this.findClosedOrder() }}>Submit</button>
                            </div>
                            <br />
                            <br />
                            <p className="search-all-open-title">Search All Owners Open Work Orders</p>
                            {/* <input className='unitNumber' placeholder='Unit Number' value={this.state.unit_num} onChange={e => this.setState({ unit_num: e.target.value })} /> */}

                            <div className="Submit">
                                <button className="button" type="button" value="Submit" onClick={(e) => { e.preventDefault(); this.findAllOpenOrders() }}>Submit</button>
                            </div>
                            <br />
                            <br />

                            <p className="search-all-closed-title">Search All Owners Closed Work Orders</p>
                            {/* <input className='unitNumber' placeholder='Unit Number' value={this.state.unit_num} onChange={e => this.setState({ unit_num: e.target.value })} /> */}

                            <div className="Submit">
                                <button className="button" type="button" value="Submit" onClick={(e) => { e.preventDefault(); this.findAllClosedOrders() }}>Submit</button>
                            </div>
                            <br />

                        </form>
            //          </Col>
            //         <Col size="md-6 sm-12">
            //             <Jumbotron>
            //                 <h1>Open Work Orders</h1>
            //             </Jumbotron>
            //             {this.state.getOpenOrders.length ? (
            //                 <List>
            //                     {this.state.getOpenOrders.map(order => (
            //                         <ListItem key={order._id}>
            //                             <a href={"/books/" + order._id}>
            //                                 <strong>
            //                                     {order.title} by {order.author}
            //                                 </strong>
            //                             </a>
            //                         </ListItem>
            //                     ))}
            //                 </List>
            //             ) : (
            //                     <h3>No Results to Display</h3>
            //                 )}
            //         </Col>
            //     </Row>
            // </Container> 

        )
    }
};

export default Form;