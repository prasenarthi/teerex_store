import { Component } from "react";
import "../styles/pages/Products.css";
import { apiStatusConstants } from "../constants/apiConstants";
import Loader from "../components/common/Loader";
import Failure from "../components/common/Failure";
import ProductFilter from "../components/product/ProductFilter";
import Input from "../components/common/Input";
import ProductList from "../components/product/ProductList";
import { RiSearchLine } from "react-icons/ri";

class Products extends Component {
  state = {
    productsList: [],
    searchInput: "",
    colorChecked: [],
    genderChecked: [],
    clothTypeChecked: [],
    priceChecked: [],

    apiStatus: apiStatusConstants.initial,
  };

  handleSearchInput = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  handleSearchList = () => {
    const { searchInput, productsList } = this.state;
    if (searchInput.trim() === "") {
      return productsList;
    } else {
      const searchFilteredList = productsList.filter((each) =>
        each.name.toLowerCase().includes(searchInput.toLowerCase())
      );

      return searchFilteredList;
    }
  };

  handleColor = (colorTypeId) => {
    const { colorChecked } = this.state;
    let updatedList = colorChecked;
    if (updatedList.includes(colorTypeId)) {
      updatedList = updatedList.filter((color) => color !== colorTypeId);
    } else {
      updatedList.push(colorTypeId);
    }

    this.setState({ colorChecked: updatedList });
  };

  handleGender = (genderTypeId) => {
    const { genderChecked } = this.state;
    let updatedList = genderChecked;
    if (updatedList.includes(genderTypeId)) {
      updatedList = updatedList.filter((gender) => gender !== genderTypeId);
    } else {
      updatedList.push(genderTypeId);
    }
    this.setState({ genderChecked: updatedList });
  };

  handlePrice = (priceRange) => {
    const { priceChecked } = this.state;
    let updatedList = priceChecked;

    if (updatedList.includes(priceRange)) {
      updatedList = updatedList.filter((range) => range !== priceRange);
    } else {
      updatedList.push(priceRange);
    }

    this.setState({ priceChecked: updatedList });
  };

  handleClothType = (clothTypeId) => {
    const { clothTypeChecked } = this.state;
    let updatedList = clothTypeChecked;
    if (updatedList.includes(clothTypeId)) {
      updatedList = updatedList.filter((type) => type !== clothTypeId);
    } else {
      updatedList.push(clothTypeId);
    }
    this.setState({ clothTypeChecked: updatedList });
  };

  componentDidMount() {
    this.getAllProducts();
  }

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.setState({ searchInput: e.target.value }, () => {
        this.handleSearchList();
      });
    }
  };

  getAllProducts = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const url =
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok === true) {
      this.setState({
        productsList: data,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  renderAllProducts = () => {
    const { colorChecked, genderChecked, clothTypeChecked, priceChecked } =
      this.state;
    const searchFilterList = this.handleSearchList();
    const filteredList = searchFilterList.filter((product) => {
      const colorMatch =
        colorChecked.length === 0 || colorChecked.includes(product.color);
      const genderMatch =
        genderChecked.length === 0 || genderChecked.includes(product.gender);
      const clothMatch =
        clothTypeChecked.length === 0 ||
        clothTypeChecked.includes(product.type);
      const priceMatch =
        priceChecked.length === 0 ||
        priceChecked.some(
          ([min, max]) => product.price >= min && product.price <= max
        );
      return colorMatch && genderMatch && clothMatch && priceMatch;
    });

    return (
      <ul className="products-list-container">
        {filteredList.map((product) => (
          <ProductList key={product.id} product={product} />
        ))}
      </ul>
    );
  };

  renderProductsPage = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllProducts();
      case apiStatusConstants.failure:
        return <Failure />;
      case apiStatusConstants.inProgress:
        return <Loader />;
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="products-container">
        <div className="products-filter-page">
          <ProductFilter
            handleColor={this.handleColor}
            handleGender={this.handleGender}
            handleClothType={this.handleClothType}
            handlePrice={this.handlePrice}
          />
        </div>
        <div className="products-page">
          <div className="search-input-container">
            <Input
              type="search"
              className="search-input"
              placeholder="Search by product name"
              //onChange={this.handleSearchInput}
              onKeyDown={this.handleKeyDown}
            />

            <RiSearchLine size={20} className="search-button-container" />
          </div>
          <h1>Products</h1>
          {this.renderProductsPage()}
        </div>
      </div>
    );
  }
}

export default Products;
