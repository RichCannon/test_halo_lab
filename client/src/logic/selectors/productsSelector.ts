import { RootState } from "../../App";

export const productsSelector = (state: RootState) => state.productsReducer.products
export const chepaestProductsSelector = (state: RootState) => state.productsReducer.cheapestProduct