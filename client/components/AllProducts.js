import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import Winery from "./Winery";

class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      variety: '' 
    }
    this.findOneWine = this.findOneWine.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  findOneWine(wine) {
    const products = this.props.allProducts;
    let wineInCart = JSON.parse(localStorage.getItem("Cart"));
    if (!wineInCart) {
      products.forEach((product) => {
        if (product.id === wine.id) {
          localStorage.setItem("Cart", JSON.stringify([wine]));
        }
      });
    } else {
      let isWineAlreadyInCart = false;
      wineInCart.forEach((product) => {
        if (wine.id === product.id) {
          alert(
            "This wine is already in the cart. \nUpdate the quantity in your cart page."
          );
          isWineAlreadyInCart = true;
        }
      });

      if (!isWineAlreadyInCart) {
        wineInCart.push(wine);
        localStorage.setItem("Cart", JSON.stringify(wineInCart));
      }
    }
  }

  handleChange (evt) {
    if (evt.target.value === 'red') {
      this.setState({variety: evt.target.value})
      console.log(this.state.variety)
    } else if (evt.target.value === 'white') {
      this.setState({variety: evt.target.value})
    } else {
      this.setState({variety: ''})
    }
    return this.state.variety
  }

  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const products = this.props.allProducts;
    return (
      <div>
        <label>Select wine type:</label>
        <select>
          <option value="red" onClick={() => this.handleChange}>Red</option>
          <option value="white" onClick={() => this.handleChange}>White</option>
        </select>
        
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
                <button
                  onClick={() => this.findOneWine(product)}
                  className="btn-large"
                  type="submit"
                >
                  ADD TO CART
                </button>
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
