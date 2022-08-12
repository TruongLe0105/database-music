import React, { useEffect, useState } from "react";
import ButtonPrimary from "./buttons/ButtonPrimary";
import ButtonSecondary from "./buttons/ButtonSecondary";
import AddNewProduct from "./modals/AddNewProduct";
import "../pages/home/styles/index.css";
import styled from "styled-components";
import { getListProduct } from "../features/apis/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import AddMultiProduct from "./modals/AddMultiProduct";

const HEADER = ["Singer", "Song", "Image", "Categories", "Time", "Audio"];

const LIST = [
  {
    singer: "Truong",
    song: "ahihi",
    image:
      "https://tse1.mm.bing.net/th?id=OIP.5FSdxaElaoGckmdsqh5rXQAAAA&pid=Api&P=0",
    categories: "Pop",
    time: "03:05",
    audio: "ahihi",
  },
  {
    singer: "Truong",
    song: "ahihi",
    image:
      "https://tse1.mm.bing.net/th?id=OIP.5FSdxaElaoGckmdsqh5rXQAAAA&pid=Api&P=0",
    categories: "Pop",
    time: "03:05",
    audio: "ahihi",
  },
  {
    singer: "Truong",
    song: "ahihi",
    image:
      "https://tse1.mm.bing.net/th?id=OIP.5FSdxaElaoGckmdsqh5rXQAAAA&pid=Api&P=0",
    categories: "Pop",
    time: "03:05",
    audio: "ahihi",
  },
];
export const ListProduct = ({ products, widthItem }) => {
  return (
    <div className="wrapper-content-products">
      {products.length > 0 &&
        products.map((item, index) => (
          <div key={index} className="item-product">
            <div
              style={{
                width: widthItem,
              }}
            >
              {item.singer}
            </div>
            <div
              style={{
                width: widthItem,
              }}
            >
              {item.song}
            </div>
            <div
              style={{
                width: widthItem,
              }}
              className="wrapper-image-product"
            >
              <img src={item.image} alt={item.song} />
            </div>
            <div
              style={{
                width: widthItem,
              }}
            >
              {item.categories}
            </div>
            <div
              style={{
                width: widthItem,
              }}
            >
              {item.time}
            </div>
            <div
              style={{
                width: widthItem,
              }}
            >
              {item.audio}
            </div>
          </div>
        ))}
    </div>
  );
};

export const HeaderProduct = ({ widthItem }) => {
  const endIndex = HEADER.length - 1;

  return (
    <div className="header-container-products">
      {HEADER.map((item, index) => (
        <div
          className="header-product-list"
          style={{
            width: widthItem,
            borderRight:
              index === endIndex ? "" : "1px solid rgb(216, 211, 211)",
          }}
          key={index}
        >
          <div>{item}</div>
        </div>
      ))}
    </div>
  );
};

function Products() {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openAddMultiProduct, setOpenAddMultiProduct] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const dispatch = useDispatch();
  const { products, isAddProduct } = useSelector((state) => state.product);
  const widthItem = `calc(100% / ${HEADER.length})`;

  const OpenModalAddProduct = () => {
    setOpenAddProduct(true);
  };

  const handleFile = (e) => {
    console.log("here", e.preventDefault());
    const fileType = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (event) => {
          const result = event.target?.result;
          const workBook = XLSX.read(result, { type: "binary" });
          const worksheetName = workBook.SheetNames[0];
          const worksheet = workBook.Sheets[worksheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);
          const newData = data.map((item) => ({
            singer: item.singer,
            song: item.song,
            image: item.imgUrl,
            categories: item.categories,
            audio: item.audio,
            time: item.time,
          }));

          setExcelData(newData);
        };
        reader.onloadend = () => setOpenAddMultiProduct(true);
      }
    } else {
      console.log("plz select your file");
    }
  };

  const buttonNewStyle = {
    marginLeft: "1rem",
  };

  useEffect(() => {
    dispatch(getListProduct());
  }, [isAddProduct]);

  return (
    <div className="container-page-products">
      <div className="title-header-products">Products</div>
      <div className="header-page-products">
        <div className="wrapper-item-left">
          <div onClick={OpenModalAddProduct}>
            <ButtonPrimary>Add Product</ButtonPrimary>
          </div>
          <form>
            <input
              style={{ display: "none" }}
              id="excel-files"
              type="file"
              onClick={(event) => {
                event.target.value = null;
              }}
              onChange={handleFile}
            />
            <label htmlFor="excel-files">
              <ButtonSecondary buttonNewStyle={buttonNewStyle}>
                Add Multi Products
              </ButtonSecondary>
            </label>
          </form>
        </div>
        <div className="wrapper-item-right">
          <div>Filter</div>
          <div>Search</div>
        </div>
      </div>
      <div className="container-products">
        <HeaderProduct widthItem={widthItem} />
        <ListProduct products={products} widthItem={widthItem} />
      </div>
      {openAddProduct && (
        <AddNewProduct setOpenAddProduct={setOpenAddProduct} />
      )}
      {openAddMultiProduct && (
        <AddMultiProduct
          data={excelData}
          setOpenAddMultiProduct={setOpenAddMultiProduct}
        />
      )}
    </div>
  );
}

export default Products;
