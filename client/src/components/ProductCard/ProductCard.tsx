import { FC } from 'react'
import MyButton from '../MyButton/MyButton'
import styles from './ProductCard.module.scss'


type ProductCardP = {
   name: string
   category: string
   price: number
   onBuyClick: () => void
}

const ProductCard: FC<ProductCardP> = ({ name, category, price,onBuyClick }) => {

   return (
      <div className={styles.container}>
         <div className={styles.category}>{category.toUpperCase()}</div>
         <div className={styles.name}>{name}</div>
         <div className={styles.priceAndButton}>
            <div className={styles.priceWrapper}>
               <div className={styles.currency}>$</div>
               <div className={styles.priceValue}>{price}</div>
            </div>
            <div className={styles.button}>
               <MyButton onClick={onBuyClick} text={`BUY`} />
            </div>
         </div>
      </div>
   )
}

export default ProductCard