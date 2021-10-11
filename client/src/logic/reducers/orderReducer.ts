import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export type OrderResponseT = {
   name: string
   number: string | number
}

export type OrderPayloadT = OrderResponseT

// Начальные стэйт в редюсере для ордера
const initialState = {
   order: {
      data: {} as OrderResponseT,
      fetching: false,
      error: null
   },
}


// requestOrder - при диспатче переходит в состояние fetching и тригерит вызов саги
// которая отправляет запрос. При каждом новом запросе ошибка очищается
// successOrder - при успешном запросе, сага передает данные и мы их кладём в стэйт и меняем
// состояние fetching на false
// failureOrder - при неудачном запросе, ошибка с сервера кадётся в стэйт и меняем
// состояние fetching на false
const orderReducer = createSlice({
   name: "order",
   initialState,
   reducers: {
      requestOrder(state, action: PayloadAction<OrderPayloadT>) {
         state.order.fetching = true
         state.order.error = null
      },
      successOrder(state, action: PayloadAction<OrderResponseT>) {
         state.order.data = action.payload
         state.order.fetching = false
      },
      failureOrder(state, action: PayloadAction<any>) {
         state.order.error = action.payload
         state.order.fetching = false
      },
   }
})

export const orderActions = orderReducer.actions
export default orderReducer.reducer