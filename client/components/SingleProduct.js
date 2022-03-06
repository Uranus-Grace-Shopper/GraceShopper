import React from "react";

import { connect } from "react-redux";

import { fetchSingleProduct } from "../store/singleProduct";
import { addingProductsToCart} from "../store/cart"

import { me } from "../store";

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    //guest user
      const userInfo = this.props.userInfo;
      if (Object.keys(userInfo).length === 0 && userInfo.constructor === Object) {

    //if there is a cart
    let chosenWine = this.props.singleProduct;
    let chosenWineId = this.props.singleProduct.id;

    let wineInCart = JSON.parse(localStorage.getItem("Cart"));
    if (!wineInCart) {
      localStorage.setItem("Cart", JSON.stringify([chosenWine]));
    } else {
      if (!(chosenWineId in wineInCart)) {
        wineInCart.push(chosenWine);
        localStorage.setItem("Cart", JSON.stringify(wineInCart));
      }
    }
    

  }

  else {
    this.props.addingProductsToCart(this.props.singleProduct.id);
  }
  //  
 

    // if (localStorage.length > 0) {
    //   // let cart = [];
    //   if (localStorage.getItem("Cart")) {
    //     let content = JSON.parse(localStorage.getItem("Cart"));
    //     console.log("content>>>>  ", content);
    //     content.push(this.props.singleProduct);
    //     localStorage.setItem("Cart", JSON.stringify(content));
    //   }
    // } else {
    //   const content = [];
    //   localStorage.setItem("Cart", content);
    //   content.push(this.props.singleProduct);
    //   console.log("content>>>>  ", content);

    //   localStorage.setItem("Cart", JSON.stringify(content));
    // }
  }

  componentDidMount() {
    //this.props.loadInitialData();
    const productId = this.props.match.params.productId;
    this.props.fetchSingleProduct(productId);
  }
  render() {
    let content = JSON.parse(localStorage.getItem("Cart"));
    console.log("content>>>>  ", content);
    const product = this.props.singleProduct;
    return (
      <div id="single-product">
        <form onSubmit={this.handleSubmit}>
          <div id="product-details">
            <h4>Name: {product.name}</h4>
            <ul>Vintage: {product.year}</ul>
            <ul>Description: {product.description}</ul>
            <img src={product.imageURL} />
            <div>
              <button className="btn-large" type="submit">
                ADD TO CART
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  // console.log("state", state.auth);
  return {
    singleProduct: state.singleProduct,
    userInfo: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addingProductsToCart: (id) => dispatch(addingProductsToCart(id))
    //loadInitialData:() => dispatch(me())
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
