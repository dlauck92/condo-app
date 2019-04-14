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
      <div className="container bg-light border">
        <div className="col-1-md"></div>
        <div className="col-10-md"></div>
        <div class="d-flex flex-column"></div>
        <h1 className="p-3 bg-dark text-white">Maintenance Page
        </h1>

        {/* {this.state.items.map((item, index) => (
          //  console.log("item.fname= ",item.fname)
          <p>
            {item.fname}
          </p>
        ))} */}
      
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

      <h2 className="p-3 bg-dark text-white">Conact Us</h2>
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