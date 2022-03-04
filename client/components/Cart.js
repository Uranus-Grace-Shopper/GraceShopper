import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import { Link } from "react-router-dom";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItemQty: 1,
      cartItemTotal: null,
      QtyError: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateQty = this.validateQty.bind(this);
  }

  componentDidMount() {
    this.props.getCart(this.props.match.params.id);
  }

  //needs an update
  handleChange(event) {
    if (this.validateQty()) {
      this.setState({
        [event.target.name]: event.target.value,
      });
      console.log(this.state);
    }
  }

  //needs an update
  validateQty() {
    let QtyError = "";
    if (this.state.cartItemQty > 20) {
      //needs an update so it can read each products stockQty
      QtyError = "Not enough bottles in stock.";
    }
    if (QtyError) {
      event.preventDefault();
      this.setState({ QtyError });
      return false;
    }
    return true;
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
              <input
                name="cartItemQty"
                onChange={this.handleChange}
                value={this.state.cartItemQty}
              />
              <button className="btn-cart-qty">-</button>
              <button className="btn-cart-delete">Delete</button>
              <ul>{cartItem.price}</ul>
              <ul>{cartItem.price * this.state.cartItemQty}</ul>
            </div>
          ))}
        </div>
        <button className="btn-large">CHECKOUT</button>
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
