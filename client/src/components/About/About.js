// import React from "react";
import React, { Component } from "react";
import '../About/About.css';
// import AboutCards from "../AboutUs/AboutUs";


class About extends Component {
  // function Available() {
  state = {
    items: ''
  };

  render() {
    return (
    <div className="container col-md-12">
      <div className="container col-md-5 card text-center shadow">
        <div className="col-1-md"></div>
        <div className="col-10-md"></div>


       <div>
         {/* <AboutCards /> */}
       </div>
       <h1 className="p-1">About CHAP</h1>
      


      <br>
      </br>
  
        <p className="about-chap">
        This is a Home Owner Association Application for Managers and Board members to communicate
         effectively with your fellow residents by posting your newsletters, meeting minutes, official
          documents and forms on your association website. The web application also includes a ticket 
          system for creating maintenance work orders. This will Help reduce your printing, mailing and 
          administrative costs plus provide residents 24/7 access to your neighborhood information.
      </p>

        <br>
        </br>
        {/* <div className="box2"> */}
          <h1 className="p-1">Admins</h1>
          
        {/* </div> */}

      <br>
      </br>
        <p className="about-creators">
          The creators of CHAP were Case Western students that participated in the Web Development BootCamp. CHAP's development 
          team consist of four developers Drew Lauck, Enrique Sandino, David Mclaughlin, and Matthew McGee. The UI/UX developers include
          Enrique Sandino and Matthew McGee. The backend development team consisted of Drew Lauck and David Mclaughlin. Enrique 
          enjoys outdoor activities and playing music. Matthew enjoys spending his time working on his business as well 
          spending time visiting new places. Drew is determined and dedicated with his work. David enjoys spending 
          time with his family and coding.
      </p>
        <div className="col-1-md"></div>
    </div>
  </div>

    );
  }
}



export default About;