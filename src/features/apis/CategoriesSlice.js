import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";


const initialState = {
    isLoading: false,
    error: null,
    isAddCategory: false,
    isPost: false,
    isDeleted: false,
    isUpdated: false,
    categories: [],
};

const slice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload
        },
        getListcategoriesSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            state.categories = action.payload.categories;
        },
        addNewCategoriesSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            state.isPost = !state.isPost;
            state.isAddCategory = !state.isAddCategory;
        },
        deleteCategorySuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            state.isDeleted = !state.isDeleted;
        },
        updateCategorySuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            state.isUpdated = !state.isUpdated;
        },
    }
});

export default slice.reducer;

export const addNewCategories = (data) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.post(`/categories/add`, data);
        dispatch(slice.actions.addNewCategoriesSuccess(response.data));
        toast.success("Add new categories success!");
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const getListCategories = (key) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.get(`/categories/${key}`);
        dispatch(slice.actions.getListcategoriesSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.delete(`/categories/${id}`);
        dispatch(slice.actions.deleteCategorySuccess(response.data));
        toast.success("Delete category success!");
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const updateCategory = (id, data) => async (dispatch) => {
    console.log("id", id)
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.put(`/categories/${id}`, data);
        dispatch(slice.actions.updateCategorySuccess(response.data));
        toast.success("Update category success!");
    } catch (error) {
        dispatch(slice.hasError());
        toast.error(error.message);
    }
};