import React from "react";
import { connect } from "react-redux";
import { fetchCart, checkoutAll } from "../store/cart";
import { Link } from "react-router-dom";
import history from "../history";

import SingleWineCartQty from "./SingleWineCartQty";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItemQty: 1,
      cartItemTotal: null,
      content: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickCheckout = this.handleClickCheckout.bind(this);
  }

  componentDidMount() {
    this.props.getCart();
    console.log("this.props.cart", this.props.cart);
  }
  handleClick(id) {
    let storageCartItems = JSON.parse(localStorage.getItem("Cart"));
    let Cart = storageCartItems.filter((cartItem) => cartItem.id !== id);
    localStorage.setItem("Cart", JSON.stringify(Cart));
    const content = localStorage.getItem("Cart");
    this.setState({ content });
  }

  handleClickCheckout() {
    localStorage.removeItem("Cart");
    this.setState({ content: [] });
  }

  render() {
    //need to fix key unique...
    const userInfo = this.props.userInfo;

    let cartItems = this.state.content;
    console.log("cartItems", cartItems);
    Object.keys(userInfo).length === 0 && userInfo.constructor === Object
      ? (cartItems = JSON.parse(localStorage.getItem("Cart")))
      : (cartItems = this.props.cart);
    if (!cartItems || cartItems.length === 0) {
      return (
        <div>
          <h1 className="title">No items in the cart!</h1>
        </div>
      );
    }
    return (
      <div className="div-cart">
        <h1 className="title"> Your Cart</h1>
        {/* <div className="cart-headings">
          <ul>Product</ul>
          <ul>Quantity</ul>
          <ul>Unit Price</ul>
          <ul>Total Price</ul>
        </div> */}
        <div className="cart-container">
          {cartItems.map((cartItem) => (
            <div key={cartItem.id} className="cart-item-container">
              <img src={cartItem.imageURL} />
              <Link to={`/products/${cartItem.id}`}>
                <h4>
                  {cartItem.name} {cartItem.year}
                </h4>
              </Link>
              <SingleWineCartQty cartItem={cartItem} />

              <button
                className="btn-cart-delete"
                onClick={() => this.handleClick(cartItem.id)}
              >
                {/* need a if/else statement to delete items for loggedin user */}
                Delete
              </button>
            </div>
          ))}
        </div>

        <hr />
        <div className="cart-total-price">
          <p>CART TOTAL: </p>
        </div>

        <Link to={`/cart/checkout`}>
          <button
            className="btn-large"
            onClick={() => {
              Object.keys(userInfo).length === 0
                ? this.handleClickCheckout()
                : this.props.checkout(this.props.cart);
            }}
          >
            CHECKOUT
          </button>
        </Link>
      </div>
    );
  }
}

const mapState = (state) => {
  console.log(state, "THESE ARE THE STATES IN CART CP");
  return {
    cart: state.cart,
    userInfo: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: () => dispatch(fetchCart()),
    checkout: (cartItems) => dispatch(checkoutAll(cartItems)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
