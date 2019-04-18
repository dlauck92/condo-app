import React, { Component } from 'react';
import Card from './CardsUI';
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';
import { Link } from 'react-router-dom';



class Cards extends Component {
    render() {
        return (
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-4">
                        <Card imgsrc={img1} title="Submit a Work Order"/>
                        <Link to="WorkOrder" className="btn btn-outline-success">Submit</Link>
                    </div> 
                    <div className="col-md-4">
                        <Card imgsrc={img2} title="Contact Management"/>
                        <Link to="Contact" className="btn btn-outline-success">Submit</Link>
                    </div>
                    <div className="col-md-4">
                        <Card imgsrc={img3} title="Just in Case"/>
                        <Link to="Form" className="btn btn-outline-success">Submit</Link>
                    </div>
                </div>

            </div>
        );
    }
}

export default Cards;