import React from "react";
import { Route, Routes } from "react-router-dom";
// import Categories from "../components/Categories";
// import Products from "../components/Products";
import MainLayout from "../layouts/MainLayout";
import CategoryPage from "../pages/categories/CategoryPage";
import HomePage from "../pages/home/HomePage";
import HundredTopPage from "../pages/hundredTop/HundredTopPage";
import LoginPage from "../pages/LoginPage";
import NewMusicPage from "../pages/newMusic/NewMusicPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/new-music" element={<NewMusicPage />} />
        <Route path="/hundred-top" element={<HundredTopPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
