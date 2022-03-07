import React from "react";
import { connect } from "react-redux";
import { fetchCart, checkoutAll } from "../store/cart";
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
    console.log(this.props.userInfo, "THIS PROPS INSIDE COMPON DID MOUNT");
    //this.props.userInfor returns an object, but this.props.getCart(id) asks for id as param
    // this.props.getCart(this.props.userInfo);
    this.props.getCart();
  }
  handleClick(id) {
    let storageCartItems = JSON.parse(localStorage.getItem("Cart"));
    let Cart = storageCartItems.filter((cartItem) => cartItem.id !== id);
    localStorage.setItem("Cart", JSON.stringify(Cart));
    const content = localStorage.getItem("Cart");
    this.setState({ content });
  }
  // //needs an update
  handleChange(event) {
    if (this.validateQty()) {
      this.setState({
        [event.target.name]: event.target.value,
      });
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

  createDropDown(stockQty) {
    let elements = [];
    for (let i = 1; i <= stockQty; i++) {
      elements.push(<option key={i}>{i}</option>);
    }
    return elements;
  }

  render() {
    //need to fix key unique...
    console.log(this.props.userInfo);
    const userInfo = this.props.userInfo;
    // <<<<<<< HEAD
    //     if (Object.keys(userInfo).length === 0 && userInfo.constructor === Object) {
    //       let storageCartItems = JSON.parse(localStorage.getItem("Cart"));
    //       if (storageCartItems) {
    //         // if (localStorage.length > 0) {
    //         const cartItems = storageCartItems;
    //         return (
    //           <div>
    //             <h1 className="title"> Your Cart</h1>
    //             <div className="cart-headings">
    //               <ul>Product</ul>
    //               <ul>Quantity</ul>
    //               <ul>Unit Price</ul>
    //               <ul>Total Price</ul>
    //             </div>

    //             <div className="cart-container">
    //               {cartItems.map((cartItem) => (
    //                 <div key={cartItem.id} className="cart-item-container">
    //                   <img src={cartItem.imageURL} />
    //                   <Link to={`/products/${cartItem.id}`}>
    //                     <h4>
    //                       {cartItem.name} {cartItem.year}
    //                     </h4>
    //                   </Link>
    //                   <button className="btn-cart-qty">+</button>
    //                   <input
    //                     name="cartItemQty"
    //                     onChange={this.handleChange}
    //                     value={this.state.cartItemQty}
    //                   />
    //                   <button className="btn-cart-qty">-</button>
    //                   <button
    //                     className="btn-cart-delete"
    //                     onClick={() => this.handleClick(cartItem.id)}
    //                   >
    //                     Delete
    //                   </button>
    //                   <ul>{cartItem.price}</ul>
    //                   <ul>{cartItem.price * this.state.cartItemQty}</ul>
    //                 </div>
    //               ))}
    //             </div>
    //             <Link to={`/cart/checkout`}>
    //               <button
    //                 className="btn-large"
    //                 onClick={() => this.handleClickCheckout()}
    //               >
    //                 CHECKOUT
    //               </button>
    //             </Link>
    //           </div>
    //         );
    //       }
    // =======
    let cartItems = this.state.content;
    Object.keys(userInfo).length === 0 && userInfo.constructor === Object
      ? (cartItems = JSON.parse(localStorage.getItem("Cart")))
      : (cartItems = this.props.cartItems);
    if (!cartItems) {
      return (
        <div>
          <p>no items in the cart</p>
        </div>
      );
      // >>>>>>> origin/AddButtonForLoggin
    }
    return (
      <div className="div-cart">
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
              <select
                className="qty-dropdown"
                name="cartItemQty"
                onChange={this.handleChange}
                value={this.state.cartItemQty}
              >
                {this.createDropDown(cartItem.quantity)}
              </select>

              <button
                className="btn-cart-delete"
                onClick={() => this.handleClick(cartItem.id)}
              >
                {/* need a if/else statement to delete items for loggedin user */}
                Delete
              </button>
              <ul>{cartItem.price}</ul>
              <ul>{cartItem.price * this.state.cartItemQty}</ul>
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
                : this.props.checkout({ ...this.state });
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
  console.log(state);
  return {
    cart: state.cart,
    userInfo: state.auth,
    cartItems: state.cartItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    //getCart: (id) => dispatch(fetchCart(id)),
    getCart: () => dispatch(fetchCart()),
    checkout: (cartItems) => dispatch(checkoutAll(cartItems)),
  };
};

export default connect(mapState, mapDispatch)(Cart);

// if (Object.keys(userInfo).length === 0 && userInfo.constructor === Object) {
//   let storageCartItems = JSON.parse(localStorage.getItem("Cart"));
//   if (storageCartItems) {
//     // if (localStorage.length > 0) {
//      let cartItems = storageCartItems;
//   }
//   }  else {
//     let cartItems = this.props.cartItems;
//     console.log(cartItems, "THIS IS CARTTTTTT");
//   }
