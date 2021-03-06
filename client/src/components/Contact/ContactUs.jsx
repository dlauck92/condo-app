import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from './ContactUsUI';
import img4 from '../img/img4.jpg';
import img5 from '../img/img5.jpg';
import img6 from '../img/image6.png';
import img7 from '../img/img7.jpg';


class ContactUs extends Component {
    render() {
        return (

            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                <Link to="https://github.com/PierreetMarie/Portfolio2">
                    <div className="col-md-4">
                        <Card imgsrc={img4} title="Enrique Sandino" />
                        {/* <Link to="Form" className="btn btn-outline-success">Submit to Form</Link> */}
                    </div> 
                </Link>
                <Link to="https://github.com/dlauck92">
                    <div className="col-md-4">
                        <Card imgsrc={img5} title="Drew Lauck" />
                        {/* <Link to="Contact" className="btn btn-outline-success">See all Tickets!</Link> */}
                    </div>
                </Link>
                <Link to="https://github.com/webdevmac">
                    <div className="col-md-4">
                        <Card imgsrc={img6} title="David Mclaughlin" />
                        {/* <Link to="TicketList" className="btn btn-outline-success">Contact Us!</Link> */}
                    </div>
                </Link>
                <Link to="https://github.com/thenuttyirishman">
                    <div className="col-md-4">
                        <Card imgsrc={img7} title="Matthew McGee" />
                        {/* <Link to="TicketList" className="btn btn-outline-success">Contact Us!</Link> */}
                    </div>
                </Link>
                </div>
            </div>



        );
    }
}

export default ContactUs;
