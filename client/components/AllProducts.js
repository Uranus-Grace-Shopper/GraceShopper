import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import Winery from "./Winery"

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    console.log("im in winery render");
    const products = this.props.allProducts;
    //console.log("products", products);
    return (
      <div>
        <div className="container">
          {products.map((product) => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <h4>Name: {product.name}</h4>
              </Link>
              <ul>Winery:<Winery winery = {product.winery}/></ul>
              <ul>Vintage: {product.year}</ul>
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
