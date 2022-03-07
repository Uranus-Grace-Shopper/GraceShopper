import React from "react";
import AllProducts from "./AllProducts";

export default class MainPage extends React.Component {
  render() {
    return (
      <div className="container-main-page">
        {/* <img className="img-main" src="/logo.png" /> */}
        <img
          className="img-main"
          src="https://altobone-electrikproject.s3.amazonaws.com/wp-content/uploads/2018/12/22133151/Planet-background-for-sleep-music-1.jpg"
        />
        <h1 id="welcome-text">Welcome to Planet Wine</h1>
        <AllProducts />
      </div>
    );
  }
}

//"https://www.visitcalifornia.com/sites/visitcalifornia.com/files/styles/welcome_image/public/VC_NapaSpotlight_Module7_WinesAndWineries_Stock_RM_BP68EG_1280x640.jpg"
