import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import './App.css';
import productsReducer from './logic/reducers/productsReducer';
import { ProductsSaga } from './logic/saga/productsSaga';
import MainPage from './pages/MainPage/MainPage';

const sagaMiddleware = createSagaMiddleware();


function* rootSaga() {
   yield all([
      ProductsSaga()
   ])
}

const reducer = combineReducers({
   productsReducer,
})


const store = configureStore({
   reducer,
   middleware: [sagaMiddleware] as const,

})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>

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
