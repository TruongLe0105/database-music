import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addNewProduct,
  getListProduct,
} from "../../features/apis/ProductSlice";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { HeaderProduct, ListProduct } from "../Products";

function AddMultiProduct({ data, setOpenAddMultiProduct }) {
  const [listInvalid, setlistInvalid] = useState([]);
  const [listValid, setListValid] = useState([]);
  const [continuePush, setContinuePush] = useState(true);
  const dispatch = useDispatch();

  const { products, isLoading } = useSelector(state => state.product);

  const widthItem = `calc(100% / ${Object.keys(data[0])?.length})`;
  const handleClose = () => {
    setOpenAddMultiProduct(false);
  };

  const handleSubmit = () => {
    listValid.forEach(item => {
      dispatch(addNewProduct(item));
      setOpenAddMultiProduct(false);
    })
  };

  const checkListValid = () => {
    const listSinger = products?.map(product => product?.singer?.toString().toLowerCase());
    const listSong = products?.map(product => product?.song?.toString().toLowerCase());
    const listValid = [];
    const listInvalid = [];
    data.forEach(item => {
      if (!item.singer || !item.song) {
        toast.error("Field singer or song are emptying!");
        return setContinuePush(false);
      }
      if (listSinger.includes(item?.singer?.toString().toLowerCase()) && listSong.includes(item?.song?.toString().toLowerCase())) {
        listInvalid.push(item);
      } else {
        listValid.push(item);
      }
    })
    setlistInvalid(listInvalid);
    setListValid(listValid);
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
    // continuePush && (
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
            <HeaderProduct custom={true} widthItem={widthItem} />
          </div>
          <div className="scroll-bar-addmulti">
            <ListProduct widthItem={widthItem} products={listValid} listStyle={{ marginBottom: 0 }} />
            <ListProduct widthItem={widthItem} products={listInvalid} custom={true} />
          </div>
        </div>
        <div style={button}>
          <ButtonPrimary handleSubmit={handleSubmit}>Add Multi</ButtonPrimary>
        </div>
      </div>
    </div>
    // )
  );
}

export default AddMultiProduct;
