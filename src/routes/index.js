import React from "react";
import { Route, Routes } from "react-router-dom";
// import Categories from "../components/Categories";
import Products from "../components/Products";
import MainLayout from "../layouts/MainLayout";
import CategoryPage from "../pages/categories/CategoryPage";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/LoginPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Products />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
