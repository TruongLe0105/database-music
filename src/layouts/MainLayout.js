import React from "react";
import { Outlet } from "react-router-dom";
import Products from "../components/Products";
import Test from "../components/Test";
import "../pages/home/styles/index.css";
import MainBar from "./MainBar";

function MainLayout() {
  return (
    <>
      <MainBar />
      <Outlet />
    </>
  );
}

export default MainLayout;
