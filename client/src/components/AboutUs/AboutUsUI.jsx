import React from 'react';
// import { Link } from 'react-router-dom';
import '../AboutUs/AboutUs';

const AboutCards = props => {
    return (
        <div className="card text-center shadow">
            <div className="overflow">
                <img src={props.imgsrc} alt="Img1" className="card-img-top"/>
            </div>
            <div className="card-body text-dark">
            <h4 className="card-title">{props.title}</h4>
            <p className="card-text text-secondary">
                <div>
                    Click  here to learn more about us!!
                </div>
            <div>
                {/* <a className="btn btn-outline-success">Ticket System</a> */}
            </div>
            </p>
              {/* <Link to="Form" className="btn btn-outline-success">Go Anywhere</Link> */}
            </div>
        </div>
    );
}

export default AboutCards;
