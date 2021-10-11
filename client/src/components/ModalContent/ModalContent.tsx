import { FC } from 'react'

import { ProductDataT } from '../../pages/MainPage/MainPage'
import { Form } from '../Form/Form'
import MyButton from '../MyButton/MyButton'
import MyInput from '../MyInput/MyInput'
import CrossIcon from './assets/CrossIcon'
import {
   CategoryStyle, CloseWrapper, ContentStyle, CurrencyStyle, FormStyle,
   ModalContentContainer, NameStyle, PriceValueStyle, PriceWrapper, ProductDataWrapper
} from './ModalContentStyles'

// Функция вынесена вне компоненты, чтоб не создавалась постоянно при изменении стейта
const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()


export type SubmitData = {
   name: string
   number: number | number | null
}

type ModalContentP = {
   handleSubmit: (values: SubmitData) => void
   currentProduct: ProductDataT
   onCancelClick: () => void
   isLoading: boolean
}

// Начальное состояние значений инпута
const initFormData: SubmitData = {
   name: ``,
   number: null
}

const ModalContent: FC<ModalContentP> = ({ handleSubmit, currentProduct, onCancelClick, isLoading }) => {

   return (
      <ModalContentContainer onClick={stopPropagation}>
         <CloseWrapper onClick={onCancelClick}>
            <CrossIcon />
         </CloseWrapper>
         <ContentStyle>
            <ProductDataWrapper >
               <CategoryStyle>{currentProduct.category}</CategoryStyle>
               <NameStyle>{currentProduct.name}</NameStyle>
               <PriceWrapper>
                  <CurrencyStyle>$</CurrencyStyle>
                  <PriceValueStyle>{currentProduct.price}</PriceValueStyle>
               </PriceWrapper>
            </ProductDataWrapper>
            <Form<SubmitData>
               onSubmit={handleSubmit}
               initialValues={initFormData}
               required={[`name`, `number`]}
               validate={(values) => {
                  // Для валидации, передаем функцию которая принимает в себя текущее значения инпута
                  // и проверяем их. Если условие не выполняется, то в объект добавляется ошибка которая привязана
                  // к инпута по названию свойства
                  // Это значние потом можно получить в Field и вывести юзеру
                  const errors: { [key in keyof SubmitData]?: string } = {}

                  if (!values.name) {
                     errors.name = "This field is required"
                  }
                  else if (!RegExp(/^\p{L}/, 'u').test(values.name)) {
                     errors.name = "Only letters allowed"
                  }
                  if (!values.number) {
                     errors.number = "This field is required"
                  }
                  else if (values.number && isNaN(values.number)) {
                     errors.number = "Only numbers allowed"
                  }
                  else if (values.number && values.number.toString().length > 12) {
                     errors.number = "Should contain 12 characters"
                  }
                  return errors
               }}
               render={({ handleSubmit, isError }) => (
                  <FormStyle onSubmitCapture={handleSubmit}>
                     <MyInput name={`name`} placeholder={`Name`} />
                     <MyInput name={`number`} placeholder={`Number`} />
                     <MyButton buttonStyle={{ margin: `1em 0 0 0` }} disabled={isError || isLoading} type={`submit`} text={`ORDER`} />
                  </FormStyle>
               )}
            />
         </ContentStyle>
      </ModalContentContainer>
   )
}

export default ModalContent