import React from "react";

export default class ConfirmationPage extends React.Component {
    render() {
      return (
        <div className="container-confirmation">
          <img
            className="img-confirmation"
            src="https://dtpmhvbsmffsz.cloudfront.net/posts/2017/09/24/59c871f4c2845645a905aeac/m_59d6e0599818293706007735.jpeg"
          />
          <h1 id='confirmation-text'>Thank you for your order!</h1>
        </div>
      );
    }
  }
