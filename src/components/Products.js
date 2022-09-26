import React, { useEffect, useState } from "react";
import ButtonPrimary from "./buttons/ButtonPrimary";
import ButtonSecondary from "./buttons/ButtonSecondary";
import AddNewProduct from "./modals/AddNewProduct";
import "../pages/home/styles/index.css";
import styled from "styled-components";
import { getListProduct, updateAudio } from "../features/apis/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import AddMultiProduct from "./modals/AddMultiProduct";
import audioFile from "../assets/audios/NgoiSaoCoDon.mp3";


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
export const ListProduct = ({ products, widthItem, custom, listStyle, update }) => {
  const dispatch = useDispatch();

  const handleUpdateAudio = (e, item) => {
    const id = item._id;
    console.log("e", e.target)
    const selectFile = e.target.files[0];
    if (selectFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectFile);
      reader.onload = (event) => {
        const audio = event.target?.result;
        console.log("length", event)
        const data = { id, audio }
        dispatch(updateAudio(data))
      }
    }
  };

  return (
    <div className="wrapper-content-products" style={listStyle}>
      {products.length > 0 &&
        products.map((item, index) => (
          <div key={index} className="item-product"
            style={{
              backgroundColor: custom && "red"
            }}>
            <div
              style={{
                width: widthItem,
                color: "green",
                textTransform: "capitalize"
              }}
            >
              {item.singer}
            </div>
            <div
              style={{
                width: widthItem,
                color: "green",
                textTransform: "capitalize"
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
                textTransform: "capitalize"
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
                display: !update && "none",
                overflow: "hidden"
              }}
            >
              <input
                className="custom-file-input"
                id="audio" name="audio"
                type="file"
                onChange={(e) => handleUpdateAudio(e, item)}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export const HeaderProduct = ({ widthItem, custom, header }) => {
  const HeaderArr = custom ? HEADER.slice(0, HEADER.length - 1) : HEADER || header;
  const endIndex = HeaderArr.length - 1;

  return (
    <div className="header-container-products">
      {HeaderArr.map((item, index) => (
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
  const { products, isAddProduct, isUpdate } = useSelector((state) => state.product);
  const widthItem = `calc(100% / ${HEADER.length})`;

  const OpenModalAddProduct = () => {
    setOpenAddProduct(true);
  };

  const handleFile = (e) => {
    e.preventDefault();
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
            image: item.image,
            categories: item.categories,
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
  }, [isAddProduct, isUpdate]);

  return (
    <div className="home">
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
          <HeaderProduct custom={false} widthItem={widthItem} />
          <div className="scroll-bar-products">
            <ListProduct update={true} products={products} widthItem={widthItem} />
          </div>
        </div>
        {
          openAddProduct && (
            <AddNewProduct setOpenAddProduct={setOpenAddProduct} />
          )
        }
        {
          openAddMultiProduct && (
            <AddMultiProduct
              data={excelData}
              setOpenAddMultiProduct={setOpenAddMultiProduct}
            />
          )
        }
      </div >
    </div>
  );
}

export default Products;
