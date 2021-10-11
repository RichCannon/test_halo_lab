import { Action } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { call, put, takeLeading } from 'redux-saga/effects';

import { api } from '../api/api';
import { orderActions, OrderResponseT } from '../reducers/orderReducer';


// Функция-генератор для обработки запроса через сагу
function* postOrderRequest(action: Action) {
   if (orderActions.requestOrder.match(action)) {
      try {
         // Делаем запрос через еффект call
         const reponse: AxiosResponse<OrderResponseT> = yield call(api.postOrder, action.payload)
         // При успешном запросе кладём данные в стейт
         yield put(orderActions.successOrder(reponse.data))
      
      } catch (e) {
         // При неудачном запросе кладём ошибку в стейт
         yield put(orderActions.failureOrder(e))
      }
   }
}

// Собираем все генератор-функции.
// Исползуется takeLeading чтоб не было много одинаковых запросов и выполнялся тот которые первый пришёл
// а остальные блочились
export function* OrderSaga() {
   yield* [
      takeLeading(orderActions.requestOrder.type, postOrderRequest),
   ];
}