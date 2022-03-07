import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import Winery from "./Winery";

class AllProducts extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(evt) {
    evt.preventDefault();
    const products = this.props.allProducts;
    for (let i = 0; i < products.length; i++) {
      console.log(evt.target)
      let chosenWine = product[i];
      console.log("chosen wine >>>>>>>>", chosenWine);
      let chosenWineId = products[i].id;
      console.log("wine id >>>>>>", chosenWineId);

      let wineInCart = JSON.parse(localStorage.getItem("Cart"));
      if (chosenWine) {
        if (!wineInCart) {
          localStorage.setItem("Cart", JSON.stringify(chosenWine));
          console.log(products[i]);
        } else {
          if (!(chosenWineId in wineInCart)) {
            wineInCart.push(chosenWine);
            localStorage.setItem("Cart", JSON.stringify(wineInCart));
          }
        }
      }
    }
  }

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
              <form onSubmit={()=>this.handleSubmit(product.id)}>
                <button className="btn-large" type="submit">
                  ADD TO CART
                </button>
              </form>
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
