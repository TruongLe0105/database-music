import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";


const initialState = {
    isLoading: false,
    error: null,
    isAddProduct: false,
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
            // const newProduct = action.payload;
            // state.products = state.products.push(newProduct);
        },
        getListProductSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            state.products = action.payload.products;
        }
    }
})


export default slice.reducer;

export const addNewProduct = (newProduct) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.post(`/products/add`, newProduct);
        dispatch(slice.actions.addNewProductSuccess(response.data))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message)
    }
};

export const getListProduct = () => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.get(`/products`);
        console.log("res", response)
        dispatch(slice.actions.getListProductSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
}