import React from "react";

function MainBar() {
  const component = [
    {
      name: "products",
      icon: <i className="fa-solid fa-list"></i>,
      tag: "Products",
    },
    {
      name: "test",
      icon: <i className="fa-solid fa-list"></i>,
      tag: "Test",
    },
  ];

  return (
    <div className="main-layout">
      <div className="wrapper-main-layout">
        <div>Musike</div>
        <div className="wrapper-item">
          {component.map((item, index) => (
            <div style={{ color: "black" }} key={index}>
              <div>
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
