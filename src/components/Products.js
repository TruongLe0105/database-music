import React, { useState } from "react";
import ButtonPrimary from "./buttons/ButtonPrimary";
import ButtonSecondary from "./buttons/ButtonSecondary";
import AddNewProduct from "./modals/AddNewProduct";
import "../pages/home/styles/index.css";
import styled from "styled-components";

const HEADER = ["Singer", "Song", "Image", "Categories", "Time", "Audio"];

const LIST = [
  {
    singer: "Truong",
    song: "ahihi",
    image: "https://tse1.mm.bing.net/th?id=OIP.5FSdxaElaoGckmdsqh5rXQAAAA&pid=Api&P=0",
    categories: "Pop",
    time: "03:05",
    audio: "ahihi"
  },
  {
    singer: "Truong",
    song: "ahihi",
    image: "https://tse1.mm.bing.net/th?id=OIP.5FSdxaElaoGckmdsqh5rXQAAAA&pid=Api&P=0",
    categories: "Pop",
    time: "03:05",
    audio: "ahihi"
  },
  {
    singer: "Truong",
    song: "ahihi",
    image: "https://tse1.mm.bing.net/th?id=OIP.5FSdxaElaoGckmdsqh5rXQAAAA&pid=Api&P=0",
    categories: "Pop",
    time: "03:05",
    audio: "ahihi"
  },
]

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

  // const getListProduct = 

  const HeaderProduct = () => {
    const endIndex = HEADER.length - 1;

    return (
      <div className="header-container-products">
        {HEADER.map((item, index) => (
          <div className="header-product-list"
            style={{
              width: `calc(100% / ${HEADER.length})`,
              borderRight: index === endIndex ? "" : "1px solid rgb(216, 211, 211)",
            }}
            key={index}
          >
            <div>{item}</div>
          </div>
        ))}
      </div>
    )
  };

  const ListProduct = () => {
    return (
      <div className="wrapper-content-products">
        {LIST.map((item, index) => (
          <div key={index} className="item-product">
            <div style={{
              width: `calc(100%/${Object.keys(item).length})`
            }}>{item.singer}</div>
            <div style={{
              width: `calc(100%/${Object.keys(item).length})`
            }}>{item.song}</div>
            <div style={{
              width: `calc(100%/${Object.keys(item).length})`
            }} className="wrapper-image-product">
              <img src={item.image} alt={item.song} />
            </div>
            <div style={{
              width: `calc(100%/${Object.keys(item).length})`
            }}>{item.categories}</div>
            <div style={{
              width: `calc(100%/${Object.keys(item).length})`
            }}>{item.time}</div>
            <div style={{
              width: `calc(100%/${Object.keys(item).length})`
            }}>{item.audio}</div>
          </div>
        ))}
      </div>
    )
  }

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
        <HeaderProduct />
        <ListProduct />
        {/* <div className="wrapper-footer-products">Footer</div> */}
      </div>
      {openAddProduct && (
        <AddNewProduct setOpenAddProduct={setOpenAddProduct} />
      )}
    </div>
  );
}

export default Products;
