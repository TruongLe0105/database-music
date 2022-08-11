import React from "react";

function AddNewProduct({ setOpenAddProduct }) {
  const handleClose = () => {
    setOpenAddProduct(false);
  };

  return (
    <div className="modal-add-new-product">
      <div className="inside-modal-add-product">
        <div style={{ color: "green", fontSize: "2rem", fontWeight: 600 }}>Add new product</div>
        <div onClick={handleClose} className="close-modal-add-product">
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="wrapper-input-add-product">
          <div className="wrapper-item">
            <label>Song</label>
            <input />
          </div>
          <div className="wrapper-item">
            <label>Singer</label>
            <input />
          </div>
          <div className="wrapper-item">
            <label>Categories</label>
            <input />
          </div>
          <div className="wrapper-item">
            <label>Time</label>
            <input />
          </div>
        </div>
        <div>
          <div>UploadImg</div>
          <div>Upload</div>
        </div>
        <div>Add</div>
      </div>
    </div>
  );
}

export default AddNewProduct;
