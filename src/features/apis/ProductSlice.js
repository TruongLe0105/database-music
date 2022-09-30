import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload, cloudinaryUploadMp3 } from "../../utils/cloudinary";


const initialState = {
    isLoading: false,
    error: null,
    isAddProduct: false,
    isUpdate: false,
    isDelete: false,
    products: [],
};

const slice = createSlice({
    name: "products",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload
        },
        addNewProductSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            state.isAddProduct = !state.isAddProduct;
        },
        getListProductSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            state.products = action.payload.products;
        },
        updateAudioSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            // state.isUpdate = !state.isUpdate;
        },
        updateProductSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            state.isUpdate = !state.isUpdate;
        },
        deleteProductSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            state.isDelete = !state.isDelete
        }
    }
})


export default slice.reducer;

export const addNewProduct = (newProduct) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        newProduct.image = await cloudinaryUpload(newProduct.image);
        newProduct.audio = await cloudinaryUploadMp3(newProduct.audio);
        const response = await apiService.post(`/products/add`, newProduct);
        dispatch(slice.actions.addNewProductSuccess(response.data));
        toast.success("Add new product success!");
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message)
    }
};

export const getListProduct = () => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.get(`/products`);
        dispatch(slice.actions.getListProductSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
}

export const updateAudio = (data) => async (dispatch) => {
    data.audio = await cloudinaryUploadMp3(data.audio)
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.put(`/products/update-audio`, data);
        dispatch(slice.actions.updateAudioSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const updateProduct = (id, body) => async (dispatch) => {
    body.image = await cloudinaryUpload(body.image);
    body.audio = await cloudinaryUploadMp3(body.audio);
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.put(`/products/${id}`, body);
        dispatch(slice.actions.updateProductSuccess(response.data));
        toast.success("Update product success")
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.delete(`/products/${id}`);
        dispatch(slice.actions.deleteProductSuccess(response.data));
        toast.success("Delete product success!")
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
}