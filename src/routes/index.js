import React from "react";
import { Route, Routes } from "react-router-dom";
import Categories from "../components/Categories";
import Products from "../components/Products";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/LoginPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
