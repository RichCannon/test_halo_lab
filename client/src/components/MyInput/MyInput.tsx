import { FC, InputHTMLAttributes } from 'react'

import { Field } from '../Field/Field'
import CrossIcon from '../ModalContent/assets/CrossIcon'
import { CrossContainer, ErrorTextStyle, FieldContainer, InputContainer, InputStyle } from './MyInputStyles'

type MyInputP = {
   name: string
   containerClassname?: string
} & InputHTMLAttributes<HTMLInputElement>

const MyInput: FC<MyInputP> = ({ name, containerClassname = ``, ...inputProps }) => {
 // Создаём общий инпут в котором используем Field
 // Field получает данные из Form которые используются для обработки форм 
   return (
      <Field name={name}>
         {({ input, meta }) =>
            <FieldContainer >
               <InputContainer touched={meta.touched} error={meta.error}>
                  <InputStyle 
                     {...inputProps}
                     {...input}
                  />
                  <CrossContainer>
                     {meta.error && meta.touched &&
                        <div>
                           <CrossIcon stroke={`#fff`} />
                        </div>
                     }
                  </CrossContainer>
               </InputContainer>
               <ErrorTextStyle>
                  {meta.touched && meta.error}
               </ErrorTextStyle>
            </FieldContainer>
         }
      </Field>



   )
}



export default MyInput