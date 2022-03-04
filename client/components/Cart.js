import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import { Link } from "react-router-dom";

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.match.params.id);
  }
  render() {
    const cartItems = this.props.cart.products || [];
    console.log("cartItems >>>>>>>>>>>", cartItems);
    return (
      <div>
        <h1 className="title"> Your Cart</h1>
        <div className="cart-headings">
          <ul>Product</ul>
          <ul>Quantity</ul>
          <ul>Unit Price</ul>
          <ul>Total Price</ul>
        </div>

        <div className="cart-container">
          {cartItems.map((cartItem) => (
            <div key={cartItem.id} className="cart-item-container">
              <img src={cartItem.imageURL} />
              <Link to={`/products/${cartItem.id}`}>
                <h4>
                  {cartItem.name} {cartItem.year}
                </h4>
              </Link>
              <button className="btn-cart-qty">+</button>
              <ul>qty</ul>
              <button className="btn-cart-qty">-</button>
              <button className="btn-cart-delete">Delete</button>
              <ul>{cartItem.price}</ul>
              <ul>{cartItem.price * 3}</ul>
            </div>
          ))}
        </div>
        <button>checkout</button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: (id) => dispatch(fetchCart(id)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
