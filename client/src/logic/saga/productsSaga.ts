import { Action } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { call, put, takeLeading } from 'redux-saga/effects';

import { api } from '../api/api';
import { productsActions, ProductsReponseT } from '../reducers/productsReducer';


// Логика в  orderSag
function* getProductsRequest(action: Action) {
   if (productsActions.requestProducts.match(action)) {
      try {
         const reponse: AxiosResponse<ProductsReponseT[]> = yield call(api.getProducts)
         yield put(productsActions.successProducts(reponse.data))
         // Логика для нахождения продукта с самой низкой ценой и помещение его в стейт
         const lowest = reponse.data.reduce((prev, current) => prev.price < current.price ? prev : current)
         yield put(productsActions.cheapestProduct(lowest))
      } catch (e) {
         yield put(productsActions.failureProducts(e))
      }
   }
}


export function* ProductsSaga() {
   yield* [
      takeLeading(productsActions.requestProducts.type, getProductsRequest),
   ];
}