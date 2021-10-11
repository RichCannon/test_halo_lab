import axios from "axios"
import { OrderPayloadT } from "../reducers/orderReducer"

const API_URL = '/api/products'

// Для обработки запросов используется библиотека axios

export const api = {
   // Асинхронный запрос за продуктами
   getProducts: async () => {
      return await axios.get(API_URL)
   },
   // Асинхронный запрос для отправления и получания данных об ордере
   postOrder: async (payload: OrderPayloadT) => {
      return await axios.post(API_URL, payload)
   }
}