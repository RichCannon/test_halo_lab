import axios from "axios"

const API_URL = ' https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e'

export const api = {
   getProducts: async () => {
      return await axios.get(API_URL)
   }
}