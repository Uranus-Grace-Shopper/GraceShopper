import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";

class Cart extends React.Component {
  //   componentDidMount() {
  //     this.props.getProducts();
  //   }
  render() {
    const cartItems = [
      {
        id: 1,
        name: "Buena Vista",
        year: 2018,
        variety: "red",
        winery: "Buena Vista",
        description: "Blackberry,plum,dark chocolate",
        quantity: 1,
        price: 39.54,
        imageURL:
          "https://images.vivino.com/thumbs/f7tR4MRISRWWdrXFoGzG_w_pb_x600.png",
      },
      {
        id: 2,
        name: "Deerfield Ranch",
        year: 2016,
        variety: "red",
        winery: "Deerfield Ranch",
        description:
          "this boozy bold blend would benefit from a suitable food pairing. Rob reallllly liked",
        quantity: 20,
        price: 139.39,
        imageURL:
          "http://res.cloudinary.com/winecom/image/upload/pmdtpah3dqvmdrq8n6ik",
      },
    ];
    return (
      <div>
        <h1 className="title"> Your Cart</h1>
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
              <ul>{cartItem.quantity}</ul>
              <button className="btn-cart-qty">-</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

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

// export default connect(mapState, mapDispatch)(Cart);

export default Cart;
