import React from "react";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";
import "../pages/home/styles/index.css";
import MainBar from "./MainBar";

function MainLayout() {
  return (
    <>
      <MainBar />
      <AlertMsg />
      <Outlet />
    </>
  );
}

export default MainLayout;
