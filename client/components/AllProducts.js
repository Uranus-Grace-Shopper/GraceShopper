import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import Winery from "./Winery";

class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      variety: "",
    };
    this.findOneWine = this.findOneWine.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // JOE CR: What if the user is logged in? What is the status of logged-in/logged-out cart?
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
        <label>Select wine type:</label>

        <select
          value={this.state.variety}
          name="variety"
          onChange={this.handleChange}
        >
          <option />
          <option>red</option>
          <option>white</option>
        </select>

        <div className="div-all-products">
          {products.map((product) => (
            <div key={product.id} className="div-each-product">
              {/* JOE CR: Although it works, nested ternaries are very difficult to read.
                  What can be done instead?
              */}
              {this.state.variety === product.variety ? (
                <div>
                  <img className="img-all-products" src={product.imageURL} />
                  <div className="txt-each-product">
                    <div>
                      {/* JOE CR: I like the use of nested components and passing props! An important strategy. */}
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
              ) : this.state.variety === "" ? (
                <div>
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
              ) : (
                <div></div>
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
