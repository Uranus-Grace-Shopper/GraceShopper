import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import Winery from "./Winery"

class Confirmation extends React.Component {
//   componentDidMount() {
//     this.props.getProducts();
//   }
  render() {
    return (
      <div>
        <div className="container">
          <h2>Your order is complete!</h2>
            </div>
        </div>
    )
}
}

//if not logged in, get data from localstorage and send back to the database
//1. create a instance in the cart table
//2. isPurchased = true

// if logged in
//1. isPurchased = true
//2. isActive = false
// const mapState = (state) => {
//   return {
//     allProducts: state.products,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     getProducts: () => dispatch(fetchProducts()),
//   };
// };

export default Confirmation;