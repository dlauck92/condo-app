// import React from "react";
import React, { Component } from "react";
import './About.css';


class About extends Component {
  // function Available() {
  state = {
    items: ''
  };

  render() {
    return (
      <div className="container bg-light border-radius: 50px">
        <div className="col-1-md"></div>
        <div className="col-10-md"></div>
        <div class="box">
          <h1 className="p-3 text-white ">About CHAP</h1>
        </div>

        {/* {this.state.items.map((item, index) => (
          //  console.log("item.fname= ",item.fname)
          <p>
            {item.fname}
          </p>
        ))} */}

         {/* <div className="Admins">
          <div className="container-fluid d-flex justify-content-center">
            <div className="row">
              <div className="col-md-4">
                <About src="https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" title="Drew" />
              </div>
              <div className="col-md-4">
                <About src="" title="Enrique" />
              </div>
              <div className="col-md-4">
                <About src="" title="David" />
              </div>
              <div className="col-md-4">
                <About src="" title="Mat" />
              </div>
            </div>

          </div>
        </div>  */}


        <p>
        This is a Home Owner Association Application for Managers and Board members to communicate 
        effectively with your fellow residents by posting your newsletters, meeting minutes, official
         documents and forms on your association website. The web application also includes a ticket 
         system for creating maintenance work orders. This will Help reduce your printing, mailing and 
         administrative costs plus provide residents 24/7 access to your neighborhood information.
      </p>

        <div className="box2">
          <h2 className="p-3 text-white">Admins</h2>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque velit, lobortis ut magna
          varius, blandit rhoncus sem. Morbi lacinia nisi ac dui fermentum, sed luctus urna tincidunt.
          Etiam ut feugiat ex. Cras non risus mi. Curabitur mattis rutrum ipsum, ut aliquet urna
          imperdiet ac. Sed nec nulla aliquam, bibendum odio eget, vestibulum tortor. Cras rutrum
          ligula in tincidunt commodo. Morbi sit amet mollis orci, in tristique ex. Donec nec ornare
          elit. Donec blandit est sed risus feugiat porttitor. Vestibulum molestie hendrerit massa non
          consequat. Vestibulum vitae lorem tortor. In elementum ultricies tempus. Interdum et
          malesuada fames ac ante ipsum primis in faucibus.
      </p>
        <div className="col-1-md"></div>
      </div>


    );
  }
}



export default About;