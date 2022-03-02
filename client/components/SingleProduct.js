import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";

class SingleProduct extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchSingleProduct(productId);
  }
  render() {
    const product = this.props.singleProduct;
    return (
      <div id="single-product">
        <div id="product-details">
          <h4>Name: {product.productName}</h4>
          <ul>Vintage: {product.vintage}</ul>
          <ul>Description: {product.description}</ul>
          <img src={product.imageURL} />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
