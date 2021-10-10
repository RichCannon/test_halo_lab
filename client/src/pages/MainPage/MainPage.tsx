import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Modal from '../../components/Modal/Modal'
import ModalContent, { SubmitData } from '../../components/ModalContent/ModalContent'
import MyButton from '../../components/MyButton/MyButton'
import Preloader from '../../components/Preloader/Preloader'
import ProductCard from '../../components/ProductCard/ProductCard'
import { productsActions } from '../../logic/reducers/productsReducer'
import { chepaestProductsSelector, productsSelector } from '../../logic/selectors/productsSelector'
import styles from './MainPage.module.scss'

const mockData = [
   {
      "name": "orange Juice",
      "category": "Drinks",
      "price": 14.99
   },
   {
      "name": "Apples",
      "category": "fruits",
      "price": 4.99
   },
   {
      "name": "Tomatos",
      "category": "vegetables",
      "price": 6.39
   },
   {
      "name": "Coffee",
      "category": "Drinks",
      "price": 3.15
   },
   {
      "name": "Sweet Paper",
      "category": "Vegetables",
      "price": 12.15
   },
   {
      "name": "Grapes",
      "category": "FRUITS",
      "price": 20.49
   },
   // {
   //    "name": "Pears",
   //    "category": "Fruits",
   //    "price": 1.35
   // },
   // {
   //    "name": "Team",
   //    "category": "Drinks",
   //    "price": 0.4
   // }
]

const initCurrentProduct = {
   "name": "",
   "category": "",
   "price": 0
}

export type ProductDataT = typeof mockData[0]

const MainPage = () => {

   const [isVisible, setIsVisible] = useState(false)
   const dispatch = useDispatch()
   const { data: productsData, fetching: productsFetching } = useSelector(productsSelector)
   const cheapestProduct = useSelector(chepaestProductsSelector)


   const [currentProduct, setCurrentProduct] = useState(initCurrentProduct)

   const onBuyCheapestClick = () => {
      setIsVisible(true)
      setCurrentProduct(cheapestProduct)
   }

   useEffect(() => {
      dispatch(productsActions.requestProducts())
   }, [])


   const onBuyClick = (product: ProductDataT) => {
      setCurrentProduct(product)
      setIsVisible(true)
   }

   const onDissmissClick = () => {
      setIsVisible(false)
      setCurrentProduct(initCurrentProduct)
   }

   const handleSubmit = (d: SubmitData) => {
      onDissmissClick()
      console.log(`dasd`, d)
   }

   return (
      <div className={styles.container}>
         <div className={styles.cardsWrapper}>
            {productsFetching
               ? <Preloader />
               : productsData.map(d => (
                  <ProductCard key={d.name} onBuyClick={() => onBuyClick(d)} {...d} />
               ))
            }

         </div>
         <div className={styles.cheapestButton}>
            <MyButton onClick={onBuyCheapestClick} text={`Buy cheapest`} />
         </div>
         <Modal onDissmissClick={onDissmissClick} isVisible={isVisible}>
            <ModalContent
               onCancelClick={onDissmissClick}
               currentProduct={currentProduct}
               handleSubmit={handleSubmit} />
         </Modal>
      </div>
   )
}

export default MainPage