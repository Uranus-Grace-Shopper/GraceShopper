import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import Winery from "./Winery";

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const products = this.props.allProducts;
    return (
      <div>
        <div className="div-all-products">
          {products.map((product) => (
            <div key={product.id} className="div-each-product">
              <img className="img-all-products" src={product.imageURL} />
              <div className="txt-each-product">
                <div>
                  <Winery winery={product.winery} />
                </div>
                <Link to={`/products/${product.id}`}>
                  <p className="product-name">
                    {product.name} {product.year}
                  </p>
                </Link>
              </div>
              <button className="btn-large">ADD TO CART</button>
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
