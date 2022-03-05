import React from "react";
import AllProducts from "./AllProducts";

export default class MainPage extends React.Component {
  render() {
    return (
      <div className="container-main">
        <img
          className="img-main"
          src="https://www.visitcalifornia.com/sites/visitcalifornia.com/files/styles/welcome_image/public/VC_NapaSpotlight_Module7_WinesAndWineries_Stock_RM_BP68EG_1280x640.jpg"
        />
        <h1 id='welcome-text'>Welcome to Uranus Wine</h1>
        <AllProducts />
      </div>
    );
  }
}
