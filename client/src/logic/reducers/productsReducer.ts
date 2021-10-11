import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export type ProductsReponseT = {
   name: string
   category: string
   price: number
}

const initialState = {
   products: {
      data: [] as ProductsReponseT[],
      fetching: false,
      error: null
   },
   cheapestProduct: {} as ProductsReponseT
}


// Логика как в orderReducer, но есть ещё cheapestProduct.
// Это самый дешёвые продукт которые определяется при успешном запросе прям в саге
const productsReducer = createSlice({
   name: "products",
   initialState,
   reducers: {
      requestProducts(state) {
         state.products.fetching = true
         state.products.error = null
      },
      successProducts(state, action: PayloadAction<ProductsReponseT[]>) {
         state.products.data = action.payload
         state.products.fetching = false
      },
      failureProducts(state, action: PayloadAction<any>) {
         state.products.error = action.payload
         state.products.fetching = false
      },
      cheapestProduct(state, action: PayloadAction<ProductsReponseT>) {
         state.cheapestProduct = action.payload
      }
   }
})

export const productsActions = productsReducer.actions
export default productsReducer.reducer