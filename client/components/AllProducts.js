import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import Winery from "./Winery";
import { addingProductsToCart } from "../store/cart";

class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      variety: "",
    };
    this.findOneWine = this.findOneWine.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  findOneWine(wine) {
    const cart = this.props.cart;
    const products = this.props.allProducts;
    const userInfo = this.props.userInfo;
    if (Object.keys(userInfo).length === 0 && userInfo.constructor === Object) {
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
    } else {
      let isWineAlreadyInCart = false;
      cart.forEach((product) => {
        if (product.id === wine.id) {
          alert(
            "This wine is already in the cart. \nUpdate the quantity in your cart page."
          );
          isWineAlreadyInCart = true;
        }
      });
      if (!isWineAlreadyInCart) {
        this.props.addingProductsToCart(wine.id);
      }
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });

    // if (evt.target.value === 'red') {
    //   this.setState({variety: evt.target.value})
    //   console.log(this.state.variety)
    // } else if (evt.target.value === 'white') {
    //   this.setState({variety: evt.target.value})
    // } else {
    //   this.setState({variety: ''})
    // }
    // return this.state.variety
  }

  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const products = this.props.allProducts;
    console.log("this is variety >>>>>>> ", this.state.variety);

    return (
      <div>
        <div className="wine-drop">
          <label className="select-wine-label">Select Wine Type: </label>

          <select
            className="dropdown-winetype"
            value={this.state.variety}
            name="variety"
            onChange={this.handleChange}
          >
            <option />
            <option>red</option>
            <option>white</option>
          </select>
        </div>

        <div className="div-all-products">
          {products.map((product) => (
            <div key={product.id} className="div-each-product">
              {this.state.variety === product.variety && (
                <div className="each-wine-div">
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
              )}
              {this.state.variety === "" && (
                <div className="each-wine-div">
                  {" "}
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
                  </button>{" "}
                </div>
              )}
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
    userInfo: state.auth,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    addingProductsToCart: (id) => dispatch(addingProductsToCart(id)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
