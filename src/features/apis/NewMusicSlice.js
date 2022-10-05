import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";


const initialState = {
    isLoading: false,
    error: null,
    list: [],
    isAdd: false,
    isUpdated: false,
    isDeleted: false,
}

const slice = createSlice({
    name: "new music",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        getListNewMusicSuccess(state, action) {
            state.isLoading = false;
            state.list = action.payload.newList;
        },
        addInfoNewMusicSuccess(state) {
            state.isLoading = false;
            state.isAdd = !state.isAdd;
        },
        updateInfoNewMusicSuccess(state) {
            state.isLoading = false;
            state.isUpdated = !state.isUpdated;
        },
        deleteNewMusicSuccess(state) {
            state.isLoading = false;
            state.isDeleted = !state.isDeleted;
        }
    }
});

export default slice.reducer;

export const getListNewMusic = () => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.get(`/new-music`);
        dispatch(slice.actions.getListNewMusicSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const addInfoNewMusic = (body) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.post("/new-music/add", body);
        dispatch(slice.actions.addInfoNewMusicSuccess(response.data));
        toast.success("Add new music success!")
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const updateInfoNewMusic = (id, body) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.put(`/new-music/${id}`, body);
        dispatch(slice.actions.updateInfoNewMusicSuccess(response.data));
        toast.success("Update new music success!")
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
}

export const deleteInfoNewMusic = (id) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.delete(`/new-music/${id}`);
        dispatch(slice.actions.deleteNewMusicSuccess(response.data));
        toast.success("Delete new music success!")
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};