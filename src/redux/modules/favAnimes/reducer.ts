import { createSlice } from "@reduxjs/toolkit";
import { deleteFromFav, getFavAnimes, toggleFav } from "../../../helpers/FavAnimes";

const favAnimesSlice = createSlice({
    name: 'favAnimes',
    initialState: {
        currentFavAnimes: getFavAnimes()
    },
    reducers: {
        toggleAnimeFav(state, action){
            state.currentFavAnimes = toggleFav(action.payload)
        },
        deleteAnimeFav(state, action){
            state.currentFavAnimes = deleteFromFav(action.payload)
        },
        updateFavAnimes(state){
            state.currentFavAnimes = getFavAnimes()
        }
    }
})

export default favAnimesSlice
export const {toggleAnimeFav, deleteAnimeFav, updateFavAnimes} = favAnimesSlice.actions
