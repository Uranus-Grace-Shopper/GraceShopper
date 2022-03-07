import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { addingProductsToCart } from "../store/cartItems";

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(evt) {
    evt.preventDefault();
    //guest user
    const userInfo = this.props.userInfo;
    if (Object.keys(userInfo).length === 0 && userInfo.constructor === Object) {
      //if there is a cart
      let chosenWine = this.props.singleProduct;
      let chosenWineId = this.props.singleProduct.id;

      let wineInCart = JSON.parse(localStorage.getItem("Cart"));
      console.log("wine in the cart >>>>> ", wineInCart);
      if (!wineInCart) {
        localStorage.setItem("Cart", JSON.stringify([chosenWine]));
      } else {
        let isWineAlreadyInCart = false;
        wineInCart.forEach((wine) => {
          if (wine.id === chosenWineId) {
            alert(
              "This wine is already in the cart. \nUpdate the quantity in your cart page."
            );
            isWineAlreadyInCart = true;
          }
        });

        if (!isWineAlreadyInCart) {
          wineInCart.push(chosenWine);
          localStorage.setItem("Cart", JSON.stringify(wineInCart));
        }
      }
    } else {
      this.props.addingProductsToCart(this.props.singleProduct.id);
    }

    //
    // if (localStorage.length > 0) {
    //   // let cart = [];
    //   if (localStorage.getItem("Cart")) {
    //     let content = JSON.parse(localStorage.getItem("Cart"));
    //     console.log("content>>>>  ", content);
    //     content.push(this.props.singleProduct);
    //     localStorage.setItem("Cart", JSON.stringify(content));
    //   }
    // } else {
    //   const content = [];
    //   localStorage.setItem("Cart", content);
    //   content.push(this.props.singleProduct);
    //   console.log("content>>>>  ", content);

    //   localStorage.setItem("Cart", JSON.stringify(content));
    // }
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
        <form onSubmit={this.handleSubmit}>
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
            <button className="btn-large" type="submit">
              ADD TO CART
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  // console.log("state", state.auth);
  return {
    singleProduct: state.singleProduct,
    userInfo: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addingProductsToCart: (id) => dispatch(addingProductsToCart(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
