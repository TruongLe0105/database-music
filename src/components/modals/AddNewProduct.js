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
    const value = e.target.value;

    switch (item) {
      case "singer":
        setInput({ ...input, singer: value });
        break;
      case "song":
        setInput({ ...input, song: value });
        break;
      case "time":
        setInput({ ...input, time: value });
        break;
      case "image":
        setInput({ ...input, image: value });
        break;
      case "audio":
        setInput({ ...input, audio: value });
        break;
      default:
        setInput({ ...input, categories: value });
        break;
    }
  };

  const handleSubmit = () => {
    console.log("input", Object.values(input));
    const isEmpty = Object.values(input).some((item) => item.length === 0);
    if (!isEmpty) {
      dispatch(addNewProduct(input)).then((result) =>
        console.log("result", result)
      );
      setOpenAddProduct(false);
    } else {
      toast.error("Fields can not empty!");
    }
  };

  const button = {
    marginRight: "2rem",
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  };

  return (
    <div className="modal-add-new-product">
      <div className="inside-modal-add-product">
        <div style={{ color: "green", fontSize: "2rem", fontWeight: 600 }}>
          Add new product
        </div>
        <div onClick={handleClose} className="close-modal-add-product">
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="wrapper-input-add-product">
          <div className="wrapper-item-input">
            <label htmlFor="song">Song*</label>
            <input
              autoFocus
              id="song"
              value={input.song}
              onChange={(e) => handleChangeInput(e, "song")}
            />
          </div>
          <div className="wrapper-item-input">
            <label htmlFor="singer">Singer*</label>
            <input
              id="singer"
              value={input.singer}
              onChange={(e) => handleChangeInput(e, "singer")}
            />
          </div>
          <div className="wrapper-item-input">
            <label htmlFor="categories">Categories*</label>
            <input
              id="categories"
              value={input.categories}
              onChange={(e) => handleChangeInput(e, "categories")}
            />
          </div>
          <div className="wrapper-item-input">
            <label htmlFor="time">Time*</label>
            <input
              id="time"
              value={input.time}
              onChange={(e) => handleChangeInput(e, "time")}
            />
          </div>
        </div>
        <div>
          <div className="wrapper-item-input">
            <label>UploadImg*</label>
            <input
              value={input.image}
              onChange={(e) => handleChangeInput(e, "image")}
            />
          </div>
          <div className="wrapper-item-input">
            <label>Upload*</label>
            <input
              value={input.audio}
              onChange={(e) => handleChangeInput(e, "audio")}
            />
          </div>
        </div>
        <div style={button} onClick={handleSubmit}>
          <ButtonPrimary>Add</ButtonPrimary>
        </div>
      </div>
    </div>
  );
}

export default AddNewProduct;
