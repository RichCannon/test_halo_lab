import { FC } from 'react'

import { ProductDataT } from '../../pages/MainPage/MainPage'
import { Form } from '../Form/Form'
import MyButton from '../MyButton/MyButton'
import MyInput from '../MyInput/MyInput'
import CrossIcon from './assets/CrossIcon'
import styles from './ModalContent.module.scss'

const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()


export type SubmitData = {
   name: string
   number: number | null
}

type ModalContentP = {
   handleSubmit: (values: SubmitData) => void
   currentProduct: ProductDataT
   onCancelClick: () => void
}

const initFormData: SubmitData = {
   name: ``,
   number: null
}

const ModalContent: FC<ModalContentP> = ({ handleSubmit, currentProduct, onCancelClick, }) => {

   return (
      <div className={styles.container} onClick={stopPropagation}>
         <div onClick={onCancelClick} className={styles.closeWrapper}>
            <CrossIcon />
         </div>
         <div className={styles.content}>
            <div className={styles.productData}>
               <div className={styles.category}>{currentProduct.category}</div>
               <div className={styles.name}>{currentProduct.name}</div>
               <div className={styles.priceWrapper}>
                  <div className={styles.currency}>$</div>
                  <div className={styles.priceValue}>{currentProduct.price}</div>
               </div>
            </div>
            <Form<SubmitData>
               onSubmit={handleSubmit}
               initialValues={initFormData}
               validate={(values) => {
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
               render={({ handleSubmit }) => (
                  <form onSubmitCapture={handleSubmit}>
                     <MyInput containerClassname={styles.inputWrapper} name={`name`} placeholder={`Name`} />
                     <MyInput containerClassname={styles.inputWrapper} name={`number`} placeholder={`Number`} />
                     <MyButton buttonClassname={styles.button} text={`ORDER`} />
                  </form>
               )}
            />
         </div>
      </div>
   )
}

export default ModalContent