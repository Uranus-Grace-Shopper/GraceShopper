import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { addingProductsToCart } from "../store/cart";

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.findOneWine = this.findOneWine.bind(this);
  }
  findOneWine(wine) {
    //evt.preventDefault();
    //guest user
    const cart = this.props.cart
    const userInfo = this.props.userInfo;
    if (Object.keys(userInfo).length === 0 && userInfo.constructor === Object) {
      let wineInCart = JSON.parse(localStorage.getItem("Cart"));
      console.log("wine in the cart >>>>> ", wineInCart);
      if (!wineInCart) {
        localStorage.setItem("Cart", JSON.stringify([wine]));
      } else {
        let isWineAlreadyInCart = false;
        wineInCart.forEach((product) => {
          if (product.id === wine.id) {
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
      <div className="single-product">
        <div className="product-details">
          <img className="img-wine" src={product.imageURL} />
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{product.name}</td>
              </tr>
              <tr>
                <td>Vintage:</td>
                <td>{product.year}</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>${product.price}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{product.description}</td>
              </tr>
            </tbody>
          </table>
            <button className="btn-large" type="submit"
            onClick = {()=>this.findOneWine(product)}>
              ADD TO CART
            </button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  // console.log("state", state.auth);
  return {
    singleProduct: state.singleProduct,
    userInfo: state.auth,
    cart: state.cart
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addingProductsToCart: (id) => dispatch(addingProductsToCart(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
