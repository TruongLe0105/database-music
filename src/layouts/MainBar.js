import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const routes = [
  {
    title: "Tâm Trạng Và Hoạt Động",
    // banner: <i className="fa-solid fa-temperature-snow"></i>
  },
  {
    title: "Quốc Gia",
    // banner: <i className="fa-solid fa-flag"></i>
  },
  {
    title: "Trữ Tình Và Bolero",
    // banner: <i className="fa-regular fa-house-chimney-heart"></i>
  },
  {
    title: "EDM",
    // banner: <i className="fa-thin fa-temperature-snow"></i>
  },
  {
    title: "Remix",
    // banner: <i className="fa-thin fa-temperature-snow"></i>
  },
  {
    title: "HipHop",
    // banner: <i className="fa-thin fa-temperature-snow"></i>
  },
  {
    title: "R&B",
    // banner: <i className="fa-thin fa-temperature-snow"></i>
  },
  {
    title: "Nhạc Phim",
    // banner: <i className="fa-thin fa-temperature-snow"></i>
  },
  {
    title: "Indie",
    // banner: <i className="fa-thin fa-temperature-snow"></i>
  },
  {
    title: "Guitar",
    // banner: <i className="fa-thin fa-temperature-snow"></i>
  },
]

function MainBar() {
  const [active, setActive] = useState(0);
  const [isExpand, setIsExpand] = useState(false);
  const component = [
    {
      name: "Products",
      icon: <i className="fa-brands fa-product-hunt"></i>,
      tag: "Products",
      path: "/",
      has_child: false,
    },
    {
      name: "Categories",
      icon: <i className="fa-solid fa-list"></i>,
      tag: "Categories",
      path: "/categories",
      has_child: true,
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
        {/* <div>Musike</div> */}
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
                  <div>{item.name}</div>
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
