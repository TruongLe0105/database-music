import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addNewProduct } from "../../features/apis/ProductSlice";
import { cloudinaryUpload } from "../../utils/cloudinary";
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

  const handleChangeInput = async (e, item) => {
    const value = e.target.value;

    if (item === "image") {
      const selectFile = e.target.files[0];
      if (selectFile) {
        const reader = new FileReader();
        reader.readAsDataURL(selectFile);
        reader.onload = (event) => {
          const result = event.target?.result;
          setInput({ ...input, image: result });
        }
      }
    } else if (item === "audio") {
      const selectFile = e.target.files[0];
      if (selectFile) {
        const reader = new FileReader();
        reader.readAsDataURL(selectFile);
        reader.onload = (event) => {
          const result = event.target?.result;
          setInput({ ...input, audio: result });
        }
      }
    } else {
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
        case "categories":
          setInput({ ...input, categories: value });
          break;
        // case "image":
        //   setInput({ ...input, image: file });
        //   break;
        // case "audio":
        //   setInput({ ...input, audio: value });
        //   break;
        default:
          break;
      }
    }
  };


  const handleSubmit = () => {
    const notEmpty = Object.values(input).some((item) => item);
    if (notEmpty) {
      dispatch(addNewProduct(input));
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
      <form action="#" className="inside-modal-add-product">
        <div style={{ color: "green", fontSize: "2rem", fontWeight: 600 }}>
          Add new product
        </div>
        <div onClick={handleClose} className="close-modal-add-product">
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="wrapper-input-add-product">
          <div className="wrapper-item-input">
            <label htmlFor="singer">Singer*</label>
            <input
              id="singer"
              name="singer"
              value={input.singer}
              onChange={(e) => handleChangeInput(e, "singer")}
            />
          </div>
          <div className="wrapper-item-input">
            <label htmlFor="song">Song*</label>
            <input
              id="song"
              name="song"
              value={input.song}
              onChange={(e) => handleChangeInput(e, "song")}
            />
          </div>
          <div className="wrapper-item-input">
            <label htmlFor="categories">Categories*</label>
            <input
              id="categories"
              name="categories"
              value={input.categories}
              onChange={(e) => handleChangeInput(e, "categories")}
            />
          </div>
          <div className="wrapper-item-input">
            <label htmlFor="time">Time*</label>
            <input
              id="time"
              name="time"
              value={input.time}
              onChange={(e) => handleChangeInput(e, "time")}
            />
          </div>
        </div>
        <div className="wrapper-input-file-add">
          <div className="wrapper-item-input">
            <div style={{ display: "flex" }}>
              <label htmlFor="audio">Audio*</label>
              <i style={{ fontSize: "2rem", color: "red" }} className="fa-solid fa-file-audio"></i>
            </div>
            <input
              type="file"
              id="audio"
              name="audio"
              onChange={(e) => handleChangeInput(e, "audio")}
            />
          </div>
          <div className="wrapper-item-input">
            <div style={{ display: "flex" }}>
              <label className="wrapper-item-input-file" htmlFor="image" style={{ marginLeft: "2rem" }}>
                <i style={{ fontSize: "5rem" }} className="fa-solid fa-camera"></i>
              </label>
              {input.image && <div className="wrapper-item-input-file" >
                <img src={input.image} alt="singer" style={{ width: "100%", height: "100%" }} />
              </div>}
              <input
                className="input-file"
                type="file"
                id="image"
                name="image"
                onChange={(e) => handleChangeInput(e, "image")}
              />
            </div>
          </div>
        </div>
        <div style={button}>
          <ButtonPrimary handleSubmit={handleSubmit}>Add</ButtonPrimary>
        </div>
      </form>
    </div >
  );
}

export default AddNewProduct;
