import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getListCategories } from "../../features/apis/CategoriesSlice";
import { addNewProduct, updateProduct } from "../../features/apis/ProductSlice";
import { cloudinaryUpload } from "../../utils/cloudinary";
import ButtonPrimary from "../buttons/ButtonPrimary";

function ModalProduct({
  setOpenModal,
  openModal,
  currentItem,
}) {
  const [input, setInput] = useState({
    singer: "",
    song: "",
    time: "",
    image: "",
    category: "",
    audio: "",
    orther: [],
  });
  const [genres, setGenres] = useState(null);
  const [ortherList, setOrtherList] = useState(null);

  const dispatch = useDispatch();
  const ortherRef = useRef();

  const handleClose = () => {
    setOpenModal(false);
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
          setInput({ ...input, category: value });
          break;
        case "orther":
          setGenres(value);
          break;
        default:
          break;
      }
    }
  };

  const handleAddInOrther = () => {
    if (genres) {
      input?.orther?.push(genres);
      ortherRef.current.value = "";
      setOrtherList(genres);
    }
  };

  const unchecked = (item) => {
    const newValue = input?.orther?.filter(e => e !== item);
    setInput({ ...input, orther: newValue });
  }

  const handleSubmit = () => {
    if (openModal === "UPDATE") {
      const id = currentItem?._id;
      dispatch(updateProduct(id, input)).then(() => {
        setOpenModal(false)
      })
    } else {
      const inValid = Object.values(input).some((item) => !item);
      if (!inValid && input?.orther.length !== 0) {
        dispatch(addNewProduct(input)).then(() => {
          setOpenModal(false);
        })
      } else {
        return toast.error("Fields can not empty!");
      }
    }
  };

  const button = {
    marginRight: "2rem",
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  };

  useEffect(() => {
  }, [ortherList]);

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
              placeholder={openModal === "ADD" ? "" : `${currentItem.singer}`}
              id="singer"
              name="singer"
              value={input.singer}
              onChange={(e) => handleChangeInput(e, "singer")}
            />
          </div>
          <div className="wrapper-item-input">
            <label htmlFor="song">Song*</label>
            <input
              placeholder={openModal === "ADD" ? "" : `${currentItem.song}`}
              id="song"
              name="song"
              value={input.song}
              onChange={(e) => handleChangeInput(e, "song")}
            />
          </div>
          <div className="wrapper-item-input">
            <label htmlFor="categories">Category*</label>
            <input
              placeholder={openModal === "ADD" ? "" : `${currentItem.category}`}
              id="categories"
              name="categories"
              value={input.category}
              onChange={(e) => handleChangeInput(e, "categories")}
            />
          </div>
          <div className="wrapper-item-input">
            <label htmlFor="time">Time*</label>
            <input
              placeholder={openModal === "ADD" ? "" : `${currentItem.time}`}
              id="time"
              name="time"
              value={input.time}
              onChange={(e) => handleChangeInput(e, "time")}
            />
          </div>
        </div>
        <div className="wrapper-item-input">
          <label htmlFor="orther">Genres Orther*</label>
          <div className="wrapper-orther">
            <input
              placeholder={openModal === "ADD" ? "" : `${currentItem.time}`}
              id="orther"
              name="orther"
              onChange={(e) => handleChangeInput(e, "orther")}
              ref={ortherRef}
            />
            {genres &&
              <i onClick={handleAddInOrther} className="fa-solid fa-check"></i>
            }
          </div>
        </div>
        <div className="wrapper-orther-icon">
          {input.orther?.map((item, index) => (
            <div key={index} className="orther-icon">
              {item}
              <i onClick={() => unchecked(item)} className="fa-solid fa-xmark"></i>
            </div>
          ))}
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
            <div className="border-img" style={{ display: "flex" }}>
              <label className="wrapper-item-input-file" htmlFor="image" style={{ marginLeft: "2rem" }}>
                <i style={{ fontSize: "5rem" }} className="fa-solid fa-image"></i>
              </label>
              {input.image &&
                <div className="wrapper-item-input-file" >
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
          <ButtonPrimary handleSubmit={handleSubmit}>{openModal === "ADD" ? "Add" : "Update"}</ButtonPrimary>
        </div>
      </form>
    </div >
  );
}

export default ModalProduct;
