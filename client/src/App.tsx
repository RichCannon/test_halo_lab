import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import productsReducer from './logic/reducers/productsReducer';
import orderReducer from './logic/reducers/orderReducer';
import { ProductsSaga } from './logic/saga/productsSaga';
import { OrderSaga } from './logic/saga/orderSaga';
import MainPage from './pages/MainPage/MainPage';


// Создаём прослойку для саги
const sagaMiddleware = createSagaMiddleware();
// Собиараем все саги в рут сагу
function* rootSaga() {
   yield all([
      ProductsSaga(),
      OrderSaga()
   ])
}

// Собираем все редюсеры
const reducer = combineReducers({
   productsReducer,
   orderReducer
})


// Помещаем прослойку и редюсеры в стэйт
const store = configureStore({
   reducer,
   middleware: [sagaMiddleware] as const,

})

// Динамически запускаем сагу
sagaMiddleware.run(rootSaga)

// Тип начального стэйта
export type RootState = ReturnType<typeof store.getState>

// Ипользуеи Provider для прокидывания глобального стейта
const App = () => {
   return (
      <Provider store={store}>
         <div>
            <MainPage />
         </div>
      </Provider >
   );
}

export default App;
