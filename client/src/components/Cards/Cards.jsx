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
                    <div className="col-md-4">
                        <Card imgsrc={img1} title="Submit a Work Order"/>
                    </div> 
                    <div className="col-md-4">
                        <Card imgsrc={img2} title="Contact Management"/>
                    </div>
                    <div className="col-md-4">
                        <Card imgsrc={img3} title="Just in Case"/>
                    </div>
                </div>

            </div>
        );
    }
}

export default Cards;