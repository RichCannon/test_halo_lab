import { FC, InputHTMLAttributes } from 'react'
import { Field } from '../Field/Field'

import CrossIcon from '../ModalContent/assets/CrossIcon'
import styles from './MyInput.module.scss'

type MyInputP = {
   name: string
   containerClassname?: string
} & InputHTMLAttributes<HTMLInputElement>

const MyInput: FC<MyInputP> = ({ name, containerClassname = ``, ...inputProps }) => {

   return (
      <Field name={name}>
         {({ input, meta }) =>
            <div className={`${styles.container} ${containerClassname}`}>
               <div className={`${styles.inputContainer} ${meta.touched && (meta.error ? styles.inputContainerError : styles.inputContainerOk)}`}>
                  <input
                     className={styles.input}
                     {...inputProps}
                     {...input}
                  />
                  <div className={styles.crossContainer}>
                     {meta.error && meta.touched &&
                        <div className={`${styles.crossWrapper}`}>
                           <CrossIcon stroke={`#fff`} />
                        </div>
                     }
                  </div>
               </div>
               <div className={styles.errorText}>
                  {meta.touched && meta.error}
               </div>
            </div>
         }
      </Field>



   )
}



export default MyInput