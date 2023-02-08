import { combineReducers, configureStore } from "@reduxjs/toolkit";
import favAnimesSlice from "../modules/favAnimes/reducer";

const rootReducer = combineReducers({
    favouriteAnimes: favAnimesSlice.reducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store