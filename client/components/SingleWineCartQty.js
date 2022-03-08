import React from "react";
import { connect } from "react-redux";
import { fetchCart, checkoutAll } from "../store/cart";
import { Link } from "react-router-dom";

class SingleWineCartQty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemQty: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.createDropDown = this.createDropDown.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  createDropDown(stockQty) {
    let elements = [];
    for (let i = 1; i <= stockQty; i++) {
      elements.push(<option key={i}>{i}</option>);
    }
    return elements;
  }

  render() {
    const singleItemInCart = this.props.cartItem;
    // console.log("******************", singleItemInCart);
    return (
      <div className="cart-item-qty-price-container">
        <select
          className="qty-dropdown"
          name="cartItemQty"
          onChange={this.handleChange}
          value={this.state.cartItemQty}
        >
          {this.createDropDown(singleItemInCart.quantity)}
        </select>
        <ul className="price-unit">${singleItemInCart.price} /bottle </ul>
        <ul className="price-total-per-wine">
          ${singleItemInCart.price * this.state.cartItemQty}
        </ul>
      </div>
    );
  }
}

export default SingleWineCartQty;
