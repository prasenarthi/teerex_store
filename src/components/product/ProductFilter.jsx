import "../../styles/components/productFilter.css";
import {
  colorType,
  genderType,
  clothType,
  priceType,
} from "../../constants/data";

const ProductFilter = (props) => {
  const { handleColor, handleGender, handleClothType, handlePrice } = props;
  return (
    <div className="product-filter-section">
      <p className="filter-title">Color</p>
      <ul className="filter-product">
        {colorType.map((each) => (
          <li key={each.colorTypeId} className="filter-list">
            <input
              type="checkbox"
              value={each.colorTypeId}
              id={each.colorTypeId}
              className="filter-checkbox"
              onChange={() => handleColor(each.colorTypeId)}
            />
            <label htmlFor={each.colorTypeId} className="filter-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <p className="filter-title">Gender</p>
      <ul className="filter-product">
        {genderType.map((each) => (
          <li key={each.genderTypeId} className="filter-list">
            <input
              type="checkbox"
              value={each.genderTypeId}
              id={each.genderTypeId}
              className="filter-checkbox"
              onChange={() => handleGender(each.genderTypeId)}
            />
            <label htmlFor={each.genderType} className="filter-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <p className="filter-title">Price</p>
      <ul className="filter-product">
        {priceType.map((each) => (
          <li key={each.priceRange} className="filter-list">
            <input
              type="checkbox"
              value={each.priceRange}
              id={each.priceRange}
              className="filter-checkbox"
              onChange={() => handlePrice(each.priceRange)}
            />
            <label htmlFor={each.priceRange} className="filter-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <p className="filter-title">Type</p>
      <ul className="filter-product">
        {clothType.map((each) => (
          <li key={each.clothTypeId} className="filter-list">
            <input
              type="checkbox"
              value={each.clothTypeId}
              id={each.clothTypeId}
              className="filter-checkbox"
              onChange={() => handleClothType(each.clothTypeId)}
            />
            <label htmlFor={each.clothTypeId} className="filter-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFilter;
