import { RootState } from "../../App";
// Селекторые для получения данных из редакса с помощью хука useSelector
export const orderSelector = (state: RootState) => state.orderReducer.order