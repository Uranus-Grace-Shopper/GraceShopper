import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import { Link } from "react-router-dom";
import history from "../history";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItemQty: 1,
      cartItemTotal: null,
      QtyError: "",
      content: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateQty = this.validateQty.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getCart(this.props.userInfo);
  }

  handleClick(id) {
    let storageCartItems = JSON.parse(localStorage.getItem("Cart"));
    let Cart = storageCartItems.filter((cartItem) => cartItem.id !== id);
    localStorage.setItem("Cart", JSON.stringify(Cart));
    const content = localStorage.getItem("Cart");
    this.setState({ content });
  }

  //needs an update
  handleChange(event) {
    if (this.validateQty()) {
      this.setState({
        [event.target.name]: event.target.value,
      });
      // console.log(this.state);
    }
  }

  handleClickCheckout() {
    localStorage.removeItem("Cart");
    this.setState({ content: [] });
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
    //console.log('localstorage',localStorage.getItem("Cart"))
    //need to fix key unique...

    //for guest user
    console.log(this.props.userInfo);
    const userInfo = this.props.userInfo;
    if (Object.keys(userInfo).length === 0 && userInfo.constructor === Object) {
      let storageCartItems = JSON.parse(localStorage.getItem("Cart"));
      if (storageCartItems) {
        // if (localStorage.length > 0) {
        const cartItems = storageCartItems;
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
                  <button
                    className="btn-cart-delete"
                    onClick={() => this.handleClick(cartItem.id)}
                  >
                    Delete
                  </button>
                  <ul>{cartItem.price}</ul>
                  <ul>{cartItem.price * this.state.cartItemQty}</ul>
                </div>
              ))}
            </div>
            <Link to={`/cart/checkout`}>
              <button
                className="btn-large"
                onClick={() => this.handleClickCheckout()}
              >
                CHECKOUT
              </button>
            </Link>
          </div>
        );
      }
    }

    //logged-in user:
    else {
      const cart = this.props.cart[0];
      if (cart) {
        const cartItems = cart.products;
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
      } else {
        return <div>nothing in the cart</div>;
      }
    }
  }
}

const mapState = (state) => {
  console.log(state);
  return {
    cart: state.cart,
    userInfo: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: (id) => dispatch(fetchCart(id)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
