import { FC } from 'react'

import MyButton from '../MyButton/MyButton'
import { CategoryStyle, CurrencyStyle, CurrentPriceWrapper, NameStyle, PriceValueStyle, ProductCardContainer, ProductContentStyle } from './ProductCardStyles'


type ProductCardP = {
   name: string
   category: string
   price: number
   onBuyClick: () => void
}

const ProductCard: FC<ProductCardP> = ({ name, category, price, onBuyClick }) => {

   return (
      <ProductCardContainer>
         <CategoryStyle>{category.toUpperCase()}</CategoryStyle>
         <NameStyle>{name}</NameStyle>
         <ProductContentStyle>
            <CurrentPriceWrapper>
               <CurrencyStyle>{`$`}</CurrencyStyle>
               <PriceValueStyle>{price}</PriceValueStyle>
            </CurrentPriceWrapper>
            <div>
               <MyButton onClick={onBuyClick} text={`BUY`} />
            </div>
         </ProductContentStyle>
      </ProductCardContainer>
   )
}

export default ProductCard