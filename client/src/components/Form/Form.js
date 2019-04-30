import React from 'react';
import './Form.css';
import api from '../../utils/api';
import axios from 'axios';
import Jumbotron from "../Jumbotron";
// import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";


class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ticketTitle: '',
            unitNum: '',
            ticketBody: '',
            UserId: '',
            id:'',
            orders: [],
            header: 'Work Order List',
            listItems: [],

        }
    }
    // use for getting Closed worker tickets
    findAllOpenOrders() {
        api.getAllOpenOrders(this.props.id)

            .then(res => this.setState(
                {
                    orders: res.data,
                    header: 'All Open Work Orders',
                }))
            .catch(err => console.log(err,'You do not have permission to view these files. Contact your administrator to change your role.'));
    };

    // use for getting Closed worker tickets
    findAllClosedOrders() {
        api.getAllClosedOrders(this.props.id)
            .then(res => this.setState(
                {
                    orders: res.data,
                    header: 'All Closed Work Orders',
                }))
            .catch(err => console.log(err,'You do not have permission to view these files. Contact your administrator to change your role.'));
    };

    // use for getting Closed worker tickets
    findClosedOrder() {
        api.getClosedOrders(this.props.id)
            .then(res => this.setState(
                {
                    orders: res.data,
                    header: 'Closed Work Orders',
                }))
            .catch(err => console.log(err));
    };

    // use for getting Open worker tickets
    findOpenOrder() {
        api.getOpenOrders(this.props.id)
            .then(res => this.setState(
                {
                    orders: res.data,
                    header: 'Opened Work Orders',
                }))
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

        }).then(res => console.log('Created Order role any', res.data))
    };
    clearList() {
        this.setState({
            orders: []
        })
    };

    render() {
        const orders = this.state.orders;
        console.log(orders);
        const listItems = this.state.orders.map((d) => <li key={d.id}>
            <h5>Unit Num: {d.unit_num}</h5>

            <h5>Ticket Title:</h5>
            {d.ticket_title}
            <br />
            <br />
            <h5>Ticket Body:</h5>
            {d.ticket_body}
            <br />
            <br />
            <br />
        </li>
        );
        // const allOrders = this.state.allOrders;
        // console.log(allOrders);
        //  const allListItems = this.state.allOrders.map((d) => <li key={d.id}>
        //     <h5>Unit Num: {d.unit_num}</h5>

        //     <h5>Ticket Title:</h5>
        //     {d.WorkOrder.ticket_title}
        //     <br />
        //     <br />
        //     <h5>Ticket Body:</h5>
        //     {d.WorkOrder.ticket_body}
        //     <br />
        //     <br />
        //     <br />
        // </li>);

        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h4>Create or Search Work Orders </h4>
                        </Jumbotron>
                        <form>
                            <p>Create a Work Order</p>
                            <input className='unitNumber' placeholder='Unit Number' value={this.state.unitNum} onChange={e => this.setState({ unitNum: e.target.value })} />
                            <br />
                            <input className='ticketTitle' placeholder='Ticket Title' value={this.state.ticketTitle} onChange={e => this.setState({ ticketTitle: e.target.value })} />
                            <br />
                            <input className='ticketBody' placeholder='Ticket Body' value={this.state.ticketBody} onChange={e => this.setState({ ticketBody: e.target.value })} />
                            <br />
                            <div className="Submit">
                                <input type="submit" value="Submit" onClick={(e) => { e.preventDefault(); this.submitOrder() }} />
                            </div>
                            <br />
                            <br />
                            <p>Search Open Work Orders</p>

                            <div className="Submit">
                                <input type="submit" value="Submit" onClick={(e) => { e.preventDefault(); this.findOpenOrder() }} />
                            </div>
                            <br />
                            <br />
                            <p>Search Closed Work Orders</p>
                            <div className="Submit">
                                <input type="submit" value="Submit" onClick={(e) => { e.preventDefault(); this.findClosedOrder() }} />
                            </div>
                            <br />
                            <br />
                            <p>Search All Owners Open Work Orders</p>
                            <div className="Submit">
                                <input type="submit" value="Submit" onClick={(e) => { e.preventDefault(); this.findAllOpenOrders() }} />
                            </div>
                            <br />
                            <br />
                            <p>Search All Owners Closed Work Orders</p>
                            <div className="Submit">
                                <input type="submit" value="Submit" onClick={(e) => { e.preventDefault(); this.findAllClosedOrders() }} />
                            </div>
                            <br />
                        </form>
                    </Col>
                    <Col size="md-6 sm-12">
                        <Jumbotron>
                            <h4>{this.state.header}</h4>
                        </Jumbotron>

                        <List>
                            <ListItem>
                                <h6>
                                    {listItems}
                                </h6>
                            </ListItem>

                        </List>
                        <br/>
                        <h5>End of Records to Display!</h5>
                       
                            <div className="Submit">
                                <input type="submit" value="Clear List" onClick={(e) => { e.preventDefault(); this.clearList() }}/>
                            </div>
                            
                    </Col>
                </Row>
            </Container>

        )
    }
};

export default Form;