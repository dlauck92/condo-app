import React, { Component } from 'react';
import Card from './CardsUI';
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';



class Cards extends Component {
    render() {
        return (
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                <a href="Form">
                    <div className="col-md-4">
                        <Card imgsrc={img1} title="Problems" />
                    </div> 
                </a>
                <a href="Contact">
                    <div className="col-md-4">
                        <Card imgsrc={img2} title="Contact Management"/>
                    </div>
                </a>
                <a href="TicketList">
                    <div className="col-md-4">
                        <Card imgsrc={img3} title="See Tickets"/>
                    </div>
                </a>
                </div>

            </div>
        );
    }
}

export default Cards;