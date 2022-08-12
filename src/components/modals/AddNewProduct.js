import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addNewProduct } from "../../features/apis/ProductSlice";
import ButtonPrimary from "../buttons/ButtonPrimary";

function AddNewProduct({ setOpenAddProduct }) {
  const [input, setInput] = useState({
    singer: "",
    song: "",
    time: "",
    image: "",
    categories: "",
    audio: "",
  });
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenAddProduct(false);
  };

  const handleChangeInput = (e, item) => {
    switch (item) {
      case "singer":
        setInput({ ...input, singer: e.target.value })
        break;
      case "song":
        setInput({ ...input, song: e.target.value })
        break;
      case "time":
        setInput({ ...input, time: e.target.value })
        break;
      case "image":
        setInput({ ...input, image: e.target.value })
        break;
      case "audio":
        setInput({ ...input, audio: e.target.value })
        break;
      default:
        setInput({ ...input, categories: e.target.value })
        break;
    }
  };

  const handleSubmit = () => {
    console.log("input", input)
    dispatch(addNewProduct(input)).then(() => {
      toast.success("Add new product success!");
      setOpenAddProduct(false);
    });
  }

  const button = {
    position: "absolute",
    right: "2rem",
    bottom: "2rem"
  }

  return (
    <div className="modal-add-new-product">
      <div className="inside-modal-add-product">
        <div style={{ color: "green", fontSize: "2rem", fontWeight: 600 }}>Add new product</div>
        <div onClick={handleClose} className="close-modal-add-product">
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="wrapper-input-add-product">
          <div className="wrapper-item-input">
            <label>Song</label>
            <input autoFocus value={input.song} onChange={(e) => handleChangeInput(e, "song")} />
          </div>
          <div className="wrapper-item-input">
            <label>Singer</label>
            <input value={input.singer} onChange={(e) => handleChangeInput(e, "singer")} />
          </div>
          <div className="wrapper-item-input">
            <label>Categories</label>
            <input value={input.categories} onChange={(e) => handleChangeInput(e, "categories")} />
          </div>
          <div className="wrapper-item-input">
            <label>Time</label>
            <input value={input.time} onChange={(e) => handleChangeInput(e, "time")} />
          </div>
        </div>
        <div>
          <div className="wrapper-item-input">
            <label>UploadImg</label>
            <input value={input.image} onChange={(e) => handleChangeInput(e, "image")} />
          </div>
          <div className="wrapper-item-input">
            <label>Upload</label>
            <input value={input.audio} onChange={(e) => handleChangeInput(e, "audio")} />
          </div>
        </div>
        <div onClick={handleSubmit}>
          <ButtonPrimary
            buttonStyle={button}
          >Add</ButtonPrimary>
        </div>
      </div>
    </div>
  );
}

export default AddNewProduct;
