import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainBar() {
  const [active, setActive] = useState(0);
  const component = [
    {
      name: "Products",
      icon: <i className="fa-solid fa-list"></i>,
      tag: "Products",
      path: "/"
    },
    {
      name: "Test",
      icon: <i className="fa-solid fa-list"></i>,
      tag: "Test",
      path: "/categories"
    },
  ];
  const navigate = useNavigate();

  const handleNavigate = (index, item) => {
    setActive(index)
    navigate(item.path)
  }

  return (
    <div className="main-layout">
      <div className="wrapper-main-layout">
        <div>Musike</div>
        <div className="wrapper-item">
          {component.map((item, index) => (
            <div onClick={() => handleNavigate(index, item)} style={{ color: "black", backgroundColor: active === index && "green" }} key={index}>
              <div className="wrapper-item-main-bar">
                <div>{item.icon}</div>
                <div>{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainBar;
