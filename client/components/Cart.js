import React from "react";
import { connect } from "react-redux";
import { fetchCart,checkoutAll } from "../store/cart";
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
    this.handleSubmit = this.handleSubmit.bind(this);
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
      console.log(this.state);
    }
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const storageCartItems = JSON.parse(localStorage.getItem("Cart"));
    console.log('handleSubmit',storageCartItems)
    this.props.checkOut(storageCartItems)
    //localStorage.removeItem("Cart")
    localStorage.clear()
    //this.setState({content:[]})
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
    //for guest user
    //need to fix key unique...
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        let cart = localStorage.key(i);
        let cartItems = JSON.parse(localStorage.getItem(cart));
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
            <form onSubmit={this.handleSubmit}> 
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
               <button className="btn-large" type='submit'>CHECKOUT</button>
               </form>
            </div>
          </div>
        );
      }
    }

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

const mapState = (state) => {
  return {
    cart: state.cart,
    userInfo: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: (id) => dispatch(fetchCart(id)),
    checkOut: (cartItems) => dispatch(checkoutAll(cartItems)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
