import React from 'react';
import './card-style.css';

const Card = props => {
    return(
        <div className="card text-center shadow">
            <div className="overflow">
                <img src={props.imgsrc} alt="Img1" className="card-img-top"/>
            </div>
            <div className="card-body text-dark">
            <h4 className="card-title">{props.title}</h4>
            <p className="card-text text-secondary">
                <a className="btn btn-outline-success">Ticket System</a>
            </p>
            {/* <a href="Form" className="btn btn-outline-success">Go Anywhere</a> */}
            </div>
        </div>
    );
}

export default Card;

