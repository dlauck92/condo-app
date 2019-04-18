import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from './CardsUI';
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';


class Cards extends Component {
    render() {
        return (
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                <Link to="Form">
                    <div className="col-md-4">
                        <Card imgsrc={img1} title="Submit Work Order" />
                        {/* <Link to="Form" className="btn btn-outline-success">Submit to Form</Link> */}
                    </div> 
                </Link>
                <Link to="TicketList">
                    <div className="col-md-4">
                        <Card imgsrc={img2} title="View Work Orders" />
                        {/* <Link to="Contact" className="btn btn-outline-success">See all Tickets!</Link> */}
                    </div>
                </Link>
                <Link to="Contact">
                    <div className="col-md-4">
                        <Card imgsrc={img3} title="Contact Management" />
                        {/* <Link to="TicketList" className="btn btn-outline-success">Contact Us!</Link> */}
                    </div>
                </Link>
                </div>
            </div>
        );
    }
}

export default Cards;
