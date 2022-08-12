import React, { useEffect, useState } from "react";
import ButtonPrimary from "./buttons/ButtonPrimary";
import ButtonSecondary from "./buttons/ButtonSecondary";
import AddNewProduct from "./modals/AddNewProduct";
import "../pages/home/styles/index.css";
import styled from "styled-components";
import { getListProduct } from "../features/apis/ProductSlice";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const { products, isAddProduct } = useSelector(state => state.product);
  const [list, setList] = useState([]);
  const widthItem = `calc(100% / ${HEADER.length})`

  console.log("first", products);
  console.log("isAddProduct", isAddProduct);

  const OpenModalAddProduct = () => {
    setOpenAddProduct(true);
  };

  const OpenModalAddMulti = () => {
    console.log("OpenModalAddMulti");
  };

  const buttonNewStyle = {
    marginLeft: "1rem",
  };

  useEffect(() => {
    // products.length > 0 && setList(products)
    dispatch(getListProduct());
  }, [isAddProduct])


  const HeaderProduct = () => {
    const endIndex = HEADER.length - 1;

    return (
      <div className="header-container-products">
        {HEADER.map((item, index) => (
          <div className="header-product-list"
            style={{
              width: widthItem,
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
        {products.length > 0 && products.map((item, index) => (
          <div key={index} className="item-product">
            <div style={{
              width: widthItem
            }}>{item.singer}</div>
            <div style={{
              width: widthItem
            }}>{item.song}</div>
            <div style={{
              width: widthItem
            }} className="wrapper-image-product">
              <img src={item.image} alt={item.song} />
            </div>
            <div style={{
              width: widthItem
            }}>{item.categories}</div>
            <div style={{
              width: widthItem
            }}>{item.time}</div>
            <div style={{
              width: widthItem
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
