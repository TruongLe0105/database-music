import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainBar() {
  const [active, setActive] = useState(0);
  const component = [
    {
      tag: "Products",
      icon: <i className="fa-brands fa-product-hunt"></i>,
      path: "/",
    },
    {
      tag: "Categories",
      icon: <i className="fa-solid fa-list"></i>,
      path: "/categories",
    },
    {
      tag: "New Music",
      icon: <i className="fa-solid fa-calendar-plus"></i>,
      path: "/new-music",
    },
    {
      tag: "Hundred Top",
      icon: <i className="fa-solid fa-ranking-star"></i>,
      path: "/hundred-top",
    },
  ];
  const navigate = useNavigate();
  const handleNavigate = (index, item) => {
    setActive(index);
    navigate(item.path);
  };

  return (
    <div className="main-layout">
      <div className="wrapper-main-layout">
        <div className="wrapper-item">
          {component.map((item, index) => (
            <div onClick={() => handleNavigate(index, item)}
              key={index}
              style={{ color: "black" }}
            >
              <div className="btn-routes"
                style={{
                  backgroundColor: active === index && "red",
                }}
              >
                <div
                  className="wrapper-item-main-bar"
                  style={{
                    color: active === index && "white"
                  }}
                >
                  <div>{item.icon}</div>
                  <div>{item.tag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainBar;
