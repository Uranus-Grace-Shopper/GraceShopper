import React from "react";
import { connect } from "react-redux";
import {fetchProducts} from "../store/products";

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const products = this.props.allProducts;
    return (
      <div> 
        <div className="container">
          {products.map((product) => (
            <div key={product.id}>           
                <h4>Name: {product.productName}</h4>
              <ul>Vintage: {product.vintage}</ul>
              <ul>Description: {product.description}</ul>
              <img src={product.imageURL} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    allProducts: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
