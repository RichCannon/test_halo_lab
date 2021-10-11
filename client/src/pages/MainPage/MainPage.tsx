import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Modal from '../../components/Modal/Modal'
import ModalContent, { SubmitData } from '../../components/ModalContent/ModalContent'
import MyButton from '../../components/MyButton/MyButton'
import Preloader from '../../components/Preloader/Preloader'
import ProductCard from '../../components/ProductCard/ProductCard'
import { orderActions, OrderPayloadT } from '../../logic/reducers/orderReducer'
import { productsActions } from '../../logic/reducers/productsReducer'
import { orderSelector } from '../../logic/selectors/orderSelector'
import { chepaestProductsSelector, productsSelector } from '../../logic/selectors/productsSelector'
import { CheapestButtonStyle, MainPageContainer, ProductsWrapper } from './MainPageStyles'



// Начальное значение в модалке
const initCurrentProduct = {
   "name": "",
   "category": "",
   "price": 0
}

export type ProductDataT = typeof initCurrentProduct


// Основная страница. где запускатся экшен с запросом за продуктами , а так же экше для отправки данных ордерв на сервер
const MainPage = () => {
   // Стэйт для контроля видимости модалки
   const [isVisible, setIsVisible] = useState(false)
   const dispatch = useDispatch()
   // Данные с редакса о продуктах
   const { data: productsData, fetching: productsFetching, error: productsError } = useSelector(productsSelector)
   // Данные с редакса об ордере (те которые отправлялись)
   const { data: orderData, fetching: orderFetching, error: orderError } = useSelector(orderSelector)
   // Самый дешёвые продукт
   const cheapestProduct = useSelector(chepaestProductsSelector)
   // Текущий продукт на которые нажали. Нужен для корректного отображения данных в модалке
   const [currentProduct, setCurrentProduct] = useState(initCurrentProduct)

   useEffect(() => {
      if(productsError) {
         console.error(productsError)
      }
      if(orderError) {
         console.error(orderError)
      }
     
   }, [productsError, orderError])

   // Обработка кнопки для покупки самого дешёвого продукта
   const onBuyCheapestClick = () => {
      setIsVisible(true)
      setCurrentProduct(cheapestProduct)
   }

   // Вывод данных  которые были отправлены на сервер и обратно получены
   useEffect(() => {
      console.log(`Data from server: `, orderData)
   }, [orderData])

   // Загрузка продуктов при первои заходе на страницу
   useEffect(() => {
      dispatch(productsActions.requestProducts())
   }, [])


   // Обработчка нажатия кнопки BUY на карточке с продукто
   const onBuyClick = (product: ProductDataT) => {
      setCurrentProduct(product)
      setIsVisible(true)
   }

   // Обработка скрытия модалки. Меняется состояние isVisible и удаляется текущий продукт
   const onDissmissClick = () => {
      setIsVisible(false)
      setCurrentProduct(initCurrentProduct)
   }


   // Обработка сабмита. Отправляется запрос с данным из модалки и закрывается модалка
   const handleSubmit = (d: SubmitData) => {
      dispatch(orderActions.requestOrder(d as OrderPayloadT))
      console.log(`Submit data: `, d)
      onDissmissClick()
   }

   return (
      <MainPageContainer>
         <ProductsWrapper >
            {productsFetching
               ? <Preloader />
               : productsData.map(d => (
                  <ProductCard key={d.name} onBuyClick={() => onBuyClick(d)} {...d} />
               ))
            }

         </ProductsWrapper>
         {productsFetching
            ? null
            : <CheapestButtonStyle>
               <MyButton
                  disabled={orderFetching}
                  buttonStyle={{ padding: `1em 2em` }}
                  buttonTextStyle={{ fontSize: `16px`, fontWeight: 400 }}
                  onClick={onBuyCheapestClick}
                  text={`Buy cheapest`} />
            </CheapestButtonStyle>
         }
         <Modal onDissmissClick={onDissmissClick} isVisible={isVisible}>
            <ModalContent
               isLoading={orderFetching}
               onCancelClick={onDissmissClick}
               currentProduct={currentProduct}
               handleSubmit={handleSubmit} />
         </Modal>
      </MainPageContainer>
   )
}

export default MainPage