import React, { useState } from "react";
import ButtonPrimary from "./buttons/ButtonPrimary";
import ButtonSecondary from "./buttons/ButtonSecondary";
import AddNewProduct from "./modals/AddNewProduct";

function Products() {
  const [openAddProduct, setOpenAddProduct] = useState(false);

  const OpenModalAddProduct = () => {
    setOpenAddProduct(true);
  };

  const OpenModalAddMulti = () => {
    console.log("OpenModalAddMulti");
  };

  const buttonNewStyle = {
    marginLeft: "1rem",
  };

  const HEADER = ["Singer", "Song", "Image", "Categories", "Time", "Audio"];

  return (
    <div className="container-page-products">
      <div className="title-header-products">Products</div>
      <div className="header-page-products">
        <div className="wrapper-item-left">
          <div onClick={OpenModalAddProduct}>
            <ButtonPrimary>Add Product</ButtonPrimary>
          </div>
          <div onClick={OpenModalAddMulti}>
            <ButtonSecondary buttonNewStyle={buttonNewStyle}>
              Add Multi Products
            </ButtonSecondary>
          </div>
        </div>
        <div className="wrapper-item-right">
          <div>Filter</div>
          <div>Search</div>
        </div>
      </div>
      <div className="container-products">
        <div className="header-container-products">
          {HEADER.map((item, index) => (
            <div className="header-product-list" key={index}>
              <div>{item}</div>
            </div>
          ))}
        </div>
        <div className="wrapper-content-products">Content</div>
        <div className="wrapper-footer-products">Footer</div>
      </div>
      {openAddProduct && (
        <AddNewProduct setOpenAddProduct={setOpenAddProduct} />
      )}
    </div>
  );
}

export default Products;
