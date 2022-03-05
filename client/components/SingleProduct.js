import React from "react";

import { connect } from "react-redux";

import { fetchSingleProduct } from "../store/singleProduct";

import { me } from "../store";

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    //guest user
   // if (this.props.isLoggedIn) {
      //if there is a cart
      if (localStorage.length > 0) {
        // let cart = [];
        if (localStorage.getItem("Cart")) {
          let content = JSON.parse(localStorage.getItem("Cart"));
          content.push(this.props.singleProduct);
          localStorage.setItem("Cart", JSON.stringify(content));
        }
        
      } else {
        const content = [];
        localStorage.setItem("Cart", content);
        content.push(this.props.singleProduct);
        localStorage.setItem("Cart", JSON.stringify(content));
      }
    
  }

  componentDidMount() {
    //this.props.loadInitialData();
    const productId = this.props.match.params.productId;
    this.props.fetchSingleProduct(productId);
  }
  render() {
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
              <button>Add to cart</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  console.log("state", state.auth);
  return {
    singleProduct: state.singleProduct,
   // isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    //loadInitialData:() => dispatch(me())
}
};

export default connect(mapState, mapDispatch)(SingleProduct)
