import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addNewProduct,
  getListProduct,
} from "../../features/apis/ProductSlice";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { HeaderProduct, ListProduct } from "../Products";

function AddMultiProduct({ data, setOpenAddMultiProduct }) {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const widthItem = `calc(100% / ${data?.length})`;
  console.log("here", data);
  const handleClose = () => {
    setOpenAddMultiProduct(false);
  };
  const listInValid = [];

  const handleSubmit = () => {
    for (let item in data) {
      const inValidItem = Object.values(item).find((e) => e?.length === 0);
      if (inValidItem) {
        listInValid.push(inValidItem);
      } else {
        dispatch(addNewProduct(item)).then(() => {
          setOpenAddMultiProduct(false);
        });
      }
    }
  };

  const checkListValid = () => {
    console.log("products", products);
    data.filter(
      (item) =>
        products.includes(item) |
        Object.values(item).find((e) => e?.length === 0)
    );
    console.log("checkValid:", data);
  };

  useEffect(() => {
    checkListValid();
  }, []);

  const button = {
    marginRight: "2rem",
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  };

  return (
    <div className="modal-add-new-product">
      <div className="inside-modal-add-product" style={{ minWidth: "80%" }}>
        <div onClick={handleClose} className="close-modal-add-product">
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ marginRight: "2rem" }}>
            <HeaderProduct widthItem={widthItem} />
          </div>
          <div style={{ marginRight: "2rem" }}>
            <ListProduct widthItem={widthItem} products={data} />
          </div>
        </div>
        <div style={button} onClick={handleSubmit}>
          <ButtonPrimary>Add Multi</ButtonPrimary>
        </div>
      </div>
    </div>
  );
}

export default AddMultiProduct;
